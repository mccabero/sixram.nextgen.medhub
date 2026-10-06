import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobileNumber: z.string().min(7).max(20),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    contactSchema.parse(json);

    return NextResponse.json({
      message:
        "Thanks for reaching out. MedHub received your inquiry and a team member will respond soon.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "We couldn't submit your inquiry right now.",
      },
      { status: 400 },
    );
  }
}
