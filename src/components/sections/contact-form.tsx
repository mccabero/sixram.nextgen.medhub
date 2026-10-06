"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  mobileNumber: z
    .string()
    .min(7, "Please enter a valid mobile number.")
    .max(20, "Mobile number is too long."),
  message: z.string().min(10, "Tell us a little more about your inquiry."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setSuccessMessage(null);
    setSubmitError(null);

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const payload = (await response.json()) as { message: string };

        if (!response.ok) {
          setSubmitError(payload.message);
          return;
        }

        setSuccessMessage(payload.message);
        reset();
      })();
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[color:var(--ink)]" htmlFor="name">
            Name
          </label>
          <Input id="name" placeholder="Maria Santos" {...register("name")} />
          {errors.name ? (
            <p className="text-sm text-[color:var(--danger-ink)]">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[color:var(--ink)]" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="maria@example.com" {...register("email")} />
          {errors.email ? (
            <p className="text-sm text-[color:var(--danger-ink)]">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-semibold text-[color:var(--ink)]"
          htmlFor="mobileNumber"
        >
          Mobile number
        </label>
        <Input
          id="mobileNumber"
          placeholder="+63 917 555 0123"
          {...register("mobileNumber")}
        />
        {errors.mobileNumber ? (
          <p className="text-sm text-[color:var(--danger-ink)]">
            {errors.mobileNumber.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[color:var(--ink)]" htmlFor="message">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell us what supplies, quantities, or assistance you need."
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-[color:var(--danger-ink)]">{errors.message.message}</p>
        ) : null}
      </div>

      {submitError ? (
        <p className="rounded-2xl bg-[color:var(--danger-soft)] px-4 py-3 text-sm text-[color:var(--danger-ink)]">
          {submitError}
        </p>
      ) : null}
      {successMessage ? (
        <p className="rounded-2xl bg-[color:var(--success-soft)] px-4 py-3 text-sm text-[color:var(--success-ink)]">
          {successMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Sending inquiry
          </>
        ) : (
          "Send inquiry"
        )}
      </Button>
    </form>
  );
}
