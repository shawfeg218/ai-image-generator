export async function GET(request: Request) {
  const response = await fetch(`${process.env.CLOUD_FUNC_URL}/api/getSuggestion`, {
    cache: "no-store",
  });

  const textData = await response.text();
  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
