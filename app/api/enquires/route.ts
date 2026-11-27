import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { enquirySchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "PixelCraft Enquiry API is running.",
  });
}

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your form details." },
        { status: 400 }
      );
    }

    const supabase = createClient(url, key);

    const { error } = await supabase
      .from("enquiries")
      .insert(parsed.data);

    if (error) {
      console.error("Supabase enquiry error:", error.message);

      return NextResponse.json(
        { error: "Could not save your enquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Enquiry submitted successfully.",
    });

  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
