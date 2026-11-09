const ALLOWED_HOSTNAMES = new Set(["fayyazzadeh.ir", "www.fayyazzadeh.ir"]);

export async function readJsonBody(request, maxBytes) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, status: 415, error: "نوع محتوای درخواست معتبر نیست." };
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, error: "حجم درخواست بیش از حد مجاز است." };
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "بدنه درخواست خالی است." };
  }

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, error: "حجم درخواست بیش از حد مجاز است." };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, error: "خواندن درخواست ناموفق بود." };
  }

  try {
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { ok: true, data: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { ok: false, status: 400, error: "ساختار JSON درخواست معتبر نیست." };
  }
}

export async function verifyTurnstile(token, expectedAction, fetchImpl = fetch) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || typeof token !== "string" || !token.trim()) return false;

  const form = new URLSearchParams({ secret, response: token });
  let response;
  try {
    response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
  } catch {
    return false;
  }

  if (!response.ok) return false;

  try {
    const result = await response.json();
    return result?.success === true
      && ALLOWED_HOSTNAMES.has(result.hostname)
      && result.action === expectedAction;
  } catch {
    return false;
  }
}
