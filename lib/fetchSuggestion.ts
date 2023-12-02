export const fetchSuggestion = async () => {
  const response = await fetch("/api/suggestion", {
    cache: "no-store",
  });
  return await response.json();
};
