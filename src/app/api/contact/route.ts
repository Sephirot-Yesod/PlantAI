import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, company, reason, message } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reasonLabels: Record<string, string> = {
      // Contact page reasons
      demo: "Request a Demo",
      enterprise: "Enterprise Inquiry",
      support: "Technical Support",
      partnership: "Partnership Opportunity",
      press: "Press & Media",
      other: "Other",
      // CES landing page reasons
      preorder: "Preorder Question",
      investor: "Invest in Us",
      distributor: "Become Distributor",
    };

    const finalMessage = message || "No message provided";

    const { data, error } = await resend.emails.send({
      from: "PlantTalk AI <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@planttalk.ai",
      replyTo: email,
      subject: `[PlantTalk AI] ${reasonLabels[reason] || reason || "Inquiry"} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">New Contact Form Submission</h2>
          
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Reason:</strong> ${reasonLabels[reason] || reason || "Not specified"}</p>
          </div>
          
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-left: 4px solid #22c55e;">${finalMessage}</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 12px;">
            This email was sent from the PlantTalk AI contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

