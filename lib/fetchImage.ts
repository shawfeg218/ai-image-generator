export const fetchImage = async () => {
  const response = await fetch("/api/getImages", {
    cache: "no-store",
  });

  return await response.json();
};
