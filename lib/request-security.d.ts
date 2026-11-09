export type JsonBodyResult =
  | { ok: true; data: unknown }
  | { ok: false; status: 400 | 413 | 415; error: string };

export function readJsonBody(request: Request, maxBytes: number): Promise<JsonBodyResult>;
export function verifyTurnstile(token: string, expectedAction: string): Promise<boolean>;
