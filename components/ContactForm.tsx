
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { services } from "@/lib/site";

const field = "mt-1 w-full rounded-lg border border-white/15 bg-slate2 px-4 py-3";

export default function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { preferred_contact: "email" },
  });

  async function onSubmit(data: EnquiryInput) {
    setStatus(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type") || "";
      const responseText = await res.text();

      if (!contentType.includes("application/json")) {
        throw new Error(
          `Server returned an unexpected response (HTTP ${res.status}). Please check the API deployment.`
        );
      }

      let json;

      try {
        json = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid server response. Please try again later.");
      }

      if (!res.ok) {
        throw new Error(json.error || `Request failed (${res.status}).`);
      }

      setStatus({
        ok: true,
        msg: "Thank you! Your enquiry has been submitted successfully.",
      });

      reset();
    } catch (error) {
      setStatus({
        ok: false,
        msg: error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      });
    }
  }

  const err = (message?: string) =>
    message && (
      <p role="alert" className="mt-1 text-sm text-red-400">
        {message}
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      <label className="block">
        Name
        <input className={field} {...register("name")} />
        {err(errors.name?.message)}
      </label>

      <label className="block">
        Email
        <input type="email" className={field} {...register("email")} />
        {err(errors.email?.message)}
      </label>

      <label className="block">
        Business name (optional)
        <input className={field} {...register("business_name")} />
      </label>

      <label className="block">
        Service needed
        <select className={field} defaultValue="" {...register("service")}>
          <option value="" disabled>Choose a service</option>
          {services.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
        {err(errors.service?.message)}
      </label>

      <label className="block">
        Estimated budget (optional)
        <input
          className={field}
          placeholder="e.g. ₹30,000"
          {...register("budget")}
        />
      </label>

      <label className="block">
        Project description
        <textarea rows={5} className={field} {...register("message")} />
        {err(errors.message?.message)}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-volt px-8 py-3 font-medium disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>

      {status && (
        <p
          role="status"
          className={status.ok ? "text-emerald-400" : "text-red-400"}
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
