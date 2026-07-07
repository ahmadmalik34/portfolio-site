"use client";

import { useTransition } from "react";
import { LogOutIcon, TrashIcon } from "@/components/ui/icons";
import { logoutAction } from "@/lib/actions/auth";
import { cx } from "@/lib/utils";

type DeleteButtonProps = {
  /** Bound server action, e.g. deleteProjectAction.bind(null, id). */
  action: () => Promise<void>;
  confirmMessage: string;
  disabled?: boolean;
  label?: string;
};

export function DeleteButton({
  action,
  confirmMessage,
  disabled,
  label = "Delete",
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={disabled || isPending}
      className="btn btn-danger btn-sm"
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(async () => {
            await action();
          });
        }
      }}
    >
      <TrashIcon size={13} />
      {isPending ? "Deleting…" : label}
    </button>
  );
}

export function LogoutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(async () => logoutAction())}
      className={cx(
        "flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-paper hover:text-accent disabled:opacity-50",
        className,
      )}
    >
      <LogOutIcon size={16} />
      {isPending ? "Signing out…" : "Sign Out"}
    </button>
  );
}
