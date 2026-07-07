"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p
          role="alert"
          className="border border-accent bg-paper px-3 py-2.5 text-sm text-accent-deep"
        >
          {state.error}
        </p>
      )}
      <div>
        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          autoFocus
          autoComplete="current-password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="btn btn-ink w-full"
      >
        {isPending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
