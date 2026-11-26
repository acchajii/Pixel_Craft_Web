"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { services } from "@/lib/site";

const field = "mt-1 w-full rounded-lg border border-white/15 bg-slate2 px-4 py-3";

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema), defaultValues: { preferred_contact: "email" } });

  async function onSubmit(data: EnquiryInput) {
    setStatus(null);
    try {
      const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStatus({ ok: true, msg: "Thanks. Your enquiry is in and we will get back to you." });
      reset();
    } catch (e) {
      setStatus({ ok: false, msg: e instanceof Error ? e.message : "Something went wrong. Please try again." });
    }
  }
  const err = (m?: string) => m && <p role="alert" className="mt-1 text-sm text-red-400">{m}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <label className="block">Name<input className={field} {...register("name")} />{err(errors.name?.message)}</label>
      <label className="block">Email<input type="email" className={field} {...register("email")} />{err(errors.email?.message)}</label>
      <label className="block">Business name (optional)<input className={field} {...register("business_name")} /></label>
      <label className="block">Service needed
        <select className={field} defaultValue="" {...register("service")}>
          <option value="" disabled>Choose a service</option>
          {services.map((s) => <option key={s.title}>{s.title}</option>)}
        </select>{err(errors.service?.message)}
      </label>
      <label className="block">Estimated budget (optional)<input className={field} placeholder="e.g. ₹30,000" {...register("budget")} /></label>
      <label className="block">Project description<textarea rows={5} className={field} {...register("message")} />{err(errors.message?.message)}</label>
      <label className="block">Preferred contact method
        <select className={field} {...register("preferred_contact")}>
          <option value="email">Email</option><option value="whatsapp">WhatsApp</option><option value="instagram">Instagram</option>
        </select>
      </label>
      <button disabled={isSubmitting} className="rounded-full bg-volt px-8 py-3 font-medium disabled:opacity-60">
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
      {status && <p role="status" className={status.ok ? "text-emerald-400" : "text-red-400"}>{status.msg}</p>}
    </form>
  );
}
