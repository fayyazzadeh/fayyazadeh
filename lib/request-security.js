export async function readJsonBody(request, maxBytes) {
  return { ok: false, status: 501, error: "Not implemented" };
}

export async function verifyTurnstile(token, expectedAction, fetchImpl = fetch) {
  return false;
}
