"use client";
import React from "react";
import Hero from "@/component/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Your Free AI Lawyer
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl">
          Upload any lease, employment contract, or NDA. 
          Our AI will highlight risky clauses, explain in plain English, 
          and suggest negotiation points.
        </p>

        <Link href="/upload">
          <button className="mt-8 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-500 transition">
            Upload a Contract
          </button>
        </Link>
      </div>
    </div>
  );
}
