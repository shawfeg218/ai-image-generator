"use client";
import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Textarea } from "./ui/textarea";
import { fetchSuggestion } from "@/lib/fetchSuggestion";
import { fetchImage } from "@/lib/fetchImage";
import toast from "react-hot-toast";
import { getSuggestion } from "@/actions/getSuggestion";

export default function PromptInput() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const fetchSuggestion = async () => {
    try {
      setLoading(true);
      const res = await getSuggestion();
      if (res) {
        setSuggestion(res);
      }
    } catch (error) {
      console.log("Error fetching suggestion");
    } finally {
      setLoading(false);
    }
  };

  const { mutate: updateImages } = useSWR("images", fetchImage, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    const prompt = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = prompt.slice(0, 20);

    const notification = toast.loading(`DALL-E is creating: ${notificationPrompt}...`);

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error("Error creating image.", { id: notification });
    } else {
      toast.success("Your AI Art has been Generated!", { id: notification });
    }

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        onSubmit={handleSubmit}
      >
        <Textarea
          placeholder={
            (loading && "Thinking the suggestion...") || suggestion || "Enter a prompt..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          className={`p-4 font-bold ${
            input
              ? "bg-slate-950 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!input}
        >
          Generate
        </button>
        <button
          type="button"
          onClick={() => submitPrompt(true)}
          className="p-4 bg-violet-500 text-white transition-colors duration-200 font-bold disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          onClick={fetchSuggestion}
          className="p-4 bg-white text-violet-500 transition-colors duration-200 font-bold border-none 
        md:rounded-r-md md:rounded-bl-none"
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">{loading ? "Thinking..." : suggestion}</span>
        </p>
      )}
    </div>
  );
}
