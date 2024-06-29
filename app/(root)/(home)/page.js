"use client";

import AddQuote from "@/components/add-quote/Add-quote";
import QuoteList from "@/components/quote-list/quote-list";
import { useState,  } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  async function handleSaveChanges(e) {
    console.log({ quote, author });
    setQuote("");
    setAuthor("");
    const quoteData = { quote, author };

    const response = await fetch("http://localhost:3000/api/add-quote", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(quoteData),
    });
    if (response.ok) {
      console.log("succesfully parsed data");
      window.location.reload()
    } else {
      console.log(quoteData);
      console.log("unable to parse data");
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-slate-400 flex flex-col h-screen w-full">
      <p className="text-4xl font-bold border-text text-white mt-4 ml-4">
        Welcome to add Quote
      </p>
      <AddQuote
        quote={quote}
        author={author}
        setQuote={setQuote}
        setAuthor={setAuthor}
        handleSaveChanges={handleSaveChanges}
      />
      <div className="">
        <QuoteList />
      </div>
    </div>
  );
}
