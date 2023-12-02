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
            "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user, include a details such as the genre and what type of painting it should be. For example: 'oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
        },
        {
          role: "user",
          content: "Write a random text prompt for DALL-E to generate an image.",
        },
      ],
      max_tokens: 64,
      temperature: 0.9,
    });

    context.log(`Http function processed request for url "${request.url}"`);
    const responseText = response.choices[0].message.content;

    return { body: responseText };
  },
});
