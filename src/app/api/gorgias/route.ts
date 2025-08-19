import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const address = formData.get("address") as string;

    const gorgiasRes = await fetch(
      `https://${process.env.GORGIAS_DOMAIN}.gorgias.com/api/tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.GORGIAS_EMAIL}:${process.env.GORGIAS_API_KEY}`
            ).toString("base64"),
        },
        body: JSON.stringify({
          channel: "email",
          via: "contact-form",
          subject,
          from_agent: false,
          messages: [
            {
              sender: {
                email,
              },
              source: {
                to: [],
                from: {
                  address: email,
                },
              },
              from_agent: false,
              channel: "email",
              via: "api",
              body_text: `New Support Ticket Submitted:
                            Name: ${name}
                            Email: ${email}
                            Phone: ${phoneNumber}
                            Address: ${address}
                            Subject: ${subject}
                            Message: ${message}`,
            },
          ],
          customer: {
            email,
          },
        }),
      }
    );

    if (!gorgiasRes.ok) {
      const errorText = await gorgiasRes.text();
      console.error("Gorgias API error:", errorText);

      return NextResponse.json(
        { error: "Failed to create ticket", details: errorText },
        { status: gorgiasRes.status }
      );
    }

    const data = await gorgiasRes.json();
    return NextResponse.json({ success: true, ticket: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
