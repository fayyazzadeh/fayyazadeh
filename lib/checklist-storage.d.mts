export type ChecklistProgress = {
  checked: Record<string, boolean>;
  details: Record<string, string>;
};
export function loadChecklist(storage: Storage, checklistId: string): ChecklistProgress | null;
export function saveChecklist(storage: Storage, checklistId: string, progress: ChecklistProgress): void;
export function clearChecklist(storage: Storage, checklistId: string): void;
