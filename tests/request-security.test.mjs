import test from "node:test";
import assert from "node:assert/strict";
import { readJsonBody, verifyTurnstile } from "../lib/request-security.js";

test("readJsonBody accepts bounded JSON requests", async () => {
  const request = new Request("https://example.test/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "hello" }),
  });
  const result = await readJsonBody(request, 1024);
  assert.equal(result.ok, true);
  assert.deepEqual(result.data, { message: "hello" });
});

test("readJsonBody rejects oversized requests before parsing", async () => {
  const request = new Request("https://example.test/api", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": "4096" },
    body: "{}",
  });
  const result = await readJsonBody(request, 100);
  assert.equal(result.ok, false);
  assert.equal(result.status, 413);
});

test("readJsonBody rejects malformed JSON with a client error", async () => {
  const request = new Request("https://example.test/api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  });
  const result = await readJsonBody(request, 1024);
  assert.equal(result.ok, false);
  assert.equal(result.status, 400);
});

test("verifyTurnstile requires success, expected hostname, and expected action", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  const fetchImpl = async (_url, options) => {
    assert.match(String(options.body), /secret=test-secret/);
    return new Response(JSON.stringify({
      success: true,
      hostname: "fayyazzadeh.ir",
      action: "wiki_support",
    }), { status: 200, headers: { "content-type": "application/json" } });
  };
  assert.equal(await verifyTurnstile("token", "wiki_support", fetchImpl), true);
  assert.equal(await verifyTurnstile("token", "contact", fetchImpl), false);
});

test("verifyTurnstile rejects unsuccessful or foreign-host responses", async () => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  const failed = async () => new Response(JSON.stringify({ success: false }), { status: 200 });
  const foreignHost = async () => new Response(JSON.stringify({
    success: true, hostname: "attacker.test", action: "contact",
  }), { status: 200 });
  assert.equal(await verifyTurnstile("token", "contact", failed), false);
  assert.equal(await verifyTurnstile("token", "contact", foreignHost), false);
});


import { checkRateLimit } from "../lib/rate-limit.js";

test("checkRateLimit allows requests under the configured limit", async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  const fetchImpl = async (url, options) => {
    assert.equal(url, "https://example.upstash.io");
    assert.equal(options.headers.Authorization, "Bearer test-token");
    const command = JSON.parse(options.body);
    assert.equal(command[0], "EVAL");
    assert.equal(command[2], "1");
    assert.match(command[3], /^rate-limit:v1:contact:/);
    assert.equal(command[4], "60000");
    assert.equal(command[3].includes("203.0.113.8"), false);
    return new Response(JSON.stringify({ result: [3, 42000] }), { status: 200 });
  };
  const request = new Request("https://example.test/api/contact", {
    headers: { "x-real-ip": "203.0.113.8" },
  });
  assert.deepEqual(
    await checkRateLimit(request, { identifier: "contact", limit: 5, windowMs: 60000 }, fetchImpl),
    { status: "allowed", remaining: 2 },
  );
});

test("checkRateLimit returns a retry delay when the limit is exceeded", async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  const fetchImpl = async () => new Response(JSON.stringify({ result: [6, 12500] }), { status: 200 });
  const request = new Request("https://example.test/api/contact", {
    headers: { "x-forwarded-for": "203.0.113.9, 10.0.0.1" },
  });
  assert.deepEqual(
    await checkRateLimit(request, { identifier: "contact", limit: 5, windowMs: 60000 }, fetchImpl),
    { status: "limited", retryAfter: 13 },
  );
});

test("checkRateLimit fails closed when Upstash is not configured or unavailable", async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  const request = new Request("https://example.test/api/contact", {
    headers: { "x-real-ip": "203.0.113.10" },
  });
  assert.deepEqual(
    await checkRateLimit(request, { identifier: "contact", limit: 5, windowMs: 60000 }),
    { status: "unavailable" },
  );

  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  const failedFetch = async () => new Response("unavailable", { status: 503 });
  assert.deepEqual(
    await checkRateLimit(request, { identifier: "contact", limit: 5, windowMs: 60000 }, failedFetch),
    { status: "unavailable" },
  );
});

test("checkRateLimit fails closed when no client IP is available", async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  const request = new Request("https://example.test/api/contact");
  assert.deepEqual(
    await checkRateLimit(request, { identifier: "contact", limit: 5, windowMs: 60000 }),
    { status: "unavailable" },
  );
});
