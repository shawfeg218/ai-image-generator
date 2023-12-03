const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

app.http("getSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user. The answer should be a single sentence and do not wrap the answer in quotes.",
        },
        {
          role: "user",
          content: "Write a random text prompt for DALL-E to generate an image.",
        },
      ],
      max_tokens: 45,
      temperature: 0.9,
    });

    context.log(`Http function processed request for url "${request.url}"`);
    const responseText = response.choices[0].message.content;

    return { body: responseText };
  },
});
