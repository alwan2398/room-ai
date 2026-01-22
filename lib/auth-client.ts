import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  sessionOptions: {
    // Disable refetching on window focus to prevent Chrome's local network permission popup
    refetchOnWindowFocus: false,
    // Disable refetching when network comes back online
    refetchWhenOffline: false,
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
