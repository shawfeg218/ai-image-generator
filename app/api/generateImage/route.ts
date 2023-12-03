import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const prompt = req.prompt;

  try {
    const response = await fetch(`${process.env.CLOUD_FUNC_URL}/api/generateImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const textData = await response.text();

    return NextResponse.json(textData);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
