/* The two calls the board makes. The shapes follow antre-api's openapi.json. */

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface QueueState {
  day: string;
  current: number | null;
  waiting: number;
  next: number[];
}

export interface Ticket {
  id: number;
  number: number;
  day: string;
  status: "waiting" | "called";
  createdAt: string;
}

/* A reply that is not 2xx is a failure, the same as no reply at all. */
async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(`antre-api answered ${response.status}`);
  return (await response.json()) as T;
}

export async function readState(): Promise<QueueState> {
  return readJson(await fetch(`${API_URL}/state`, { cache: "no-store" }));
}

export async function takeNumber(): Promise<Ticket> {
  return readJson(await fetch(`${API_URL}/tickets`, { method: "POST" }));
}
