"use server";

import { openai } from "@/lib/openai";

export async function getSuggestion() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user. The answer should be a single sentence and do not wrap the answer in quotation marks",
        },
        {
          role: "user",
          content:
            "Write a random text prompt for DALL-E to generate an image. Do not wrap the answer in quotation marks",
        },
      ],
      max_tokens: 45,
      temperature: 1.5,
    });

    console.log("Get suggestion from gpt-3.5-turbo");

    return response.choices[0].message.content;
  } catch (error) {
    console.log("Get suggestion error: ", error);
  }
}
