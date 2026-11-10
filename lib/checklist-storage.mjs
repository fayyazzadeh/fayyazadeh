const PREFIX = "fayyazadeh:checklist:";

export function loadChecklist(storage, checklistId) {
  try {
    const raw = storage.getItem(PREFIX + checklistId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveChecklist(storage, checklistId, progress) {
  storage.setItem(PREFIX + checklistId, JSON.stringify(progress));
}

export function clearChecklist(storage, checklistId) {
  storage.removeItem(PREFIX + checklistId);
}
