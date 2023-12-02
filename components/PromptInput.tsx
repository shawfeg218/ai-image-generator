"use client";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export default function PromptInput() {
  const [input, setInput] = useState("");
  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        action=""
      >
        <Textarea
          placeholder="Enter a prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none"
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
          className="p-4 bg-white text-violet-500 transition-colors duration-200 font-bold border-none 
        md:rounded-r-md md:rounded-bl-none"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}
