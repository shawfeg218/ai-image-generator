"use client";
import { useState } from "react";
import useSWR from "swr";
import { Textarea } from "./ui/textarea";
import { fetchSuggestion } from "@/lib/fetchSuggestion";

export default function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    isValidating,
    // for fetching new suggestions
    mutate,
  } = useSWR("/api/suggestion", fetchSuggestion, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        action=""
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
          className="p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          onClick={mutate}
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
