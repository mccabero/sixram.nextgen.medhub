"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

function Sheet({ ...props }: ComponentPropsWithoutRef<typeof Dialog.Root>) {
  return <Dialog.Root {...props} />;
}

function SheetTrigger({
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />;
}

function SheetClose({
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Close>) {
  return <Dialog.Close {...props} />;
}

function SheetContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-[rgba(10,27,48,0.42)] backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <Dialog.Content
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[color:var(--border)] bg-[color:var(--surface)] shadow-2xl data-[state=closed]:animate-slide-out data-[state=open]:animate-slide-in sm:rounded-l-[2rem]",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-5 top-5 rounded-full p-2 text-[color:var(--muted-ink)] transition hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--ink)]">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function SheetHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("space-y-2 border-b border-[color:var(--border)] p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("text-xl font-semibold text-[color:var(--ink)]", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      className={cn("text-sm text-[color:var(--muted-ink)]", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
