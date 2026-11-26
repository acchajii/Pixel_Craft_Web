import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { enquirySchema } from "@/lib/validation";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Enquiries are not configured yet." }, { status: 503 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const supabase = createClient(url, key);
  const { error } = await supabase.from("enquiries").insert(parsed.data);
  if (error) return NextResponse.json({ error: "Could not save your enquiry. Please try again." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
