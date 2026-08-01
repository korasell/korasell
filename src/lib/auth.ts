import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export function hasRole(role: string | undefined, allowed: string[]) {
  return !!role && allowed.includes(role);
}
