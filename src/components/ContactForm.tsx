import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().nonempty({ message: "Please add your name" }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Tell us a little about your order" })
    .max(1000),
});

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <section id="contact" className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Get in touch
          </span>
          <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Let&apos;s talk
            <span className="block text-pink-deep">bundles</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Custom lengths, textures or a full install set — send us a note and we&apos;ll reply
            with pricing and availability.
          </p>
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
              <span className="grid size-10 place-items-center rounded-full bg-pink-soft text-accent-foreground">
                <Mail className="size-5" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">hello@thebundlesociety.com</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
              <span className="grid size-10 place-items-center rounded-full bg-primary/15 text-foreground">
                <MessageCircle className="size-5" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">Replies within 24 hours</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = contactSchema.safeParse(values);
            if (!parsed.success) {
              toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
              return;
            }
            toast.success("Message sent — we'll be in touch soon.");
            setValues({ name: "", email: "", message: "" });
          }}
          className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Name
              </span>
              <input
                value={values.name}
                onChange={set("name")}
                maxLength={100}
                placeholder="Your name"
                className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Email
              </span>
              <input
                type="email"
                value={values.email}
                onChange={set("email")}
                maxLength={255}
                placeholder="you@email.com"
                className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </span>
            <textarea
              value={values.message}
              onChange={set("message")}
              maxLength={1000}
              rows={5}
              placeholder="Lengths, texture, install date…"
              className="mt-2 w-full resize-none rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-base font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Send message
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
