import test from "node:test";
import assert from "node:assert/strict";
import { loadChecklist, saveChecklist, clearChecklist } from "../lib/checklist-storage.mjs";

test("checklist progress survives reload through the provided storage", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const progress = { checked: { "os-0": true }, details: { computerName: "OFFICE-01" } };
  saveChecklist(storage, "office-computer-setup", progress);
  assert.deepEqual(loadChecklist(storage, "office-computer-setup"), progress);
  clearChecklist(storage, "office-computer-setup");
  assert.equal(loadChecklist(storage, "office-computer-setup"), null);
});
