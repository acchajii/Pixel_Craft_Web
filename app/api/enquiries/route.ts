
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { enquirySchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "PixelCraft Enquiry API is running.",
  });
}

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase configuration is missing." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form details." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("enquiries")
      .insert(result.data);

    if (error) {
  console.error("SUPABASE ERROR:", error);

  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
