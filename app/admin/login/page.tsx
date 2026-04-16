"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login, type LoginResult } from "@/lib/auth/actions";

const initialState: LoginResult = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
      <div className="bg-muted border-border w-full max-w-md rounded-2xl border p-8 shadow-lg shadow-black/40">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Image
            src="/assets/logo.png"
            alt=""
            width={48}
            height={48}
            quality={80}
            sizes="48px"
            className="h-12 w-12"
          />
          <h1 className="font-display text-gold text-2xl font-semibold tracking-wide">
            Admin-Login
          </h1>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="font-body text-foreground/80 text-sm" htmlFor="password">
            Passwort
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="Passwort eingeben"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-gold rounded-lg border p-3 text-base focus-visible:ring-2 focus-visible:outline-none"
          />

          <button
            type="submit"
            disabled={pending}
            className="bg-gold text-background hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60 font-display mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-bright"
          >
            {pending ? "Wird geprüft …" : "Anmelden"}
          </button>

          {state.error && (
            <p role="alert" className="text-sm text-red-500">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
