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
