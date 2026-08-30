import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { createInquiry } from "@/lib/shop.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Custom Bundle Requests — The Bundle Society" },
      {
        name: "description",
        content:
          "Ask about custom hair bundle orders, lengths, textures and availability. We reply within one business day.",
      },
      { property: "og:title", content: "Custom Bundle Requests — The Bundle Society" },
      {
        property: "og:description",
        content: "Tell us what you're looking for and we'll build a custom bundle set.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40),
  message: z.string().trim().min(1, "Tell us what you're looking for").max(1000),
});

function Contact() {
  const submit = useServerFn(createInquiry);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") ?? "",
      message: form.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      await submit({ data: parsed.data });
      setSent(true);
      toast.success("Message sent — we'll be in touch soon.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-5xl font-semibold">
        Custom <span className="text-pink-deep">orders</span>
      </h1>
      <p className="mt-2 text-muted-foreground">
        Looking for a specific texture, length or a mixed set? Tell us what you want and we'll put
        it together.
      </p>

      {sent ? (
        <div className="mt-8 rounded-3xl bg-card p-10 text-center shadow-pop">
          <p className="font-display text-2xl font-semibold text-primary">Message received</p>
          <p className="mt-2 text-muted-foreground">
            We'll reply to your email within one business day.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-3xl bg-card p-6 shadow-pop sm:p-8">
          <Field label="Your name" name="name" error={errors["name"]} />
          <Field label="Email" name="email" type="email" error={errors["email"]} />
          <Field label="Phone (optional)" name="phone" error={errors["phone"]} />
          <div>
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              What are you looking for?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
            {errors["message"] && <p className="mt-1 text-sm text-destructive">{errors["message"]}</p>}
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-2xl bg-primary px-6 py-4 font-display text-lg font-semibold text-primary-foreground disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={255}
        className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
