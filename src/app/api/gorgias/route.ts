import { NextResponse } from "next/server";
import { buffer } from "stream/consumers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const address = formData.get("address") as string;
    const uploadFiles = formData.getAll("uploadImage") as File[];

    const files = await Promise.all(
      uploadFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });
        const formDataImage = new FormData();
        formDataImage.append("file", blob, file.name);

        const uploadRes = await fetch(
          `https://${process.env.GORGIAS_DOMAIN}.gorgias.com/api/upload`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  `${process.env.GORGIAS_EMAIL}:${process.env.GORGIAS_API_KEY}`
                ).toString("base64"),
            },
            body: formDataImage as any,
          }
        );
        const uploadData = await uploadRes.json();
        if (!uploadData[0].url) return null;
        return {
          url: uploadData[0].url,
          name: uploadData[0].name,
          content_type: uploadData[0].content_type,
        };
      })
    );
    console.log("files", files);
    console.log("uploadFiles", uploadFiles);
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
          via: "api",
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
              attachments: files.filter(Boolean),
              body_text: `New Support Ticket Submitted:
                            Name: ${name}
                            Email: ${email}
                            Phone: ${phoneNumber}
                            Address: ${address}
                            Subject: ${subject}
                            Message: ${message}
                            `,
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
