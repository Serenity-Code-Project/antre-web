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

export async function readState(): Promise<QueueState> {
  const response = await fetch(`${API_URL}/state`, { cache: "no-store" });
  return (await response.json()) as QueueState;
}

export async function takeNumber(): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets`, { method: "POST" });
  return (await response.json()) as Ticket;
}
