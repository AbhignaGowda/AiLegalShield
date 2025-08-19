"use client";
import { useState } from "react";

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  downloads: number;
  rating: number;
  riskLevel: "low" | "medium" | "high";
}

const Templates = () => {
  const templates: Template[] = [
    { id: 1, title: "Residential Lease Agreement", description: "Standard template for apartment and house rentals", category: "Real Estate", downloads: 1250, rating: 4.8, riskLevel: "low" },
    { id: 2, title: "Employment Contract", description: "Comprehensive employment agreement template", category: "Employment", downloads: 890, rating: 4.6, riskLevel: "medium" },
    { id: 3, title: "Non-Disclosure Agreement", description: "Protect confidential information and trade secrets", category: "Legal", downloads: 2100, rating: 4.9, riskLevel: "low" },
    { id: 4, title: "Service Agreement", description: "Professional services contract template", category: "Business", downloads: 650, rating: 4.7, riskLevel: "medium" },
    { id: 5, title: "Freelancer Contract", description: "Independent contractor agreement", category: "Freelance", downloads: 1800, rating: 4.5, riskLevel: "medium" },
    { id: 6, title: "Partnership Agreement", description: "Business partnership contract template", category: "Business", downloads: 420, rating: 4.4, riskLevel: "high" },
  ];

  const categories = ["All", "Real Estate", "Employment", "Legal", "Business", "Freelance"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates =
    selectedCategory === "All" ? templates : templates.filter((t) => t.category === selectedCategory);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-400 bg-red-900/20 border-red-800";
      case "medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
      case "low":
        return "text-green-400 bg-green-900/20 border-green-800";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Contract Templates</h1>
          <p className="text-gray-400">Pre-analyzed contract templates to get you started</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    {/* Document Icon */}
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{template.title}</h2>
                    <p className="text-sm text-gray-400">{template.category}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-lg border ${getRiskColor(
                    template.riskLevel
                  )}`}
                >
                  {template.riskLevel.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4">{template.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>⭐ {template.rating}</span>
                <span>{template.downloads.toLocaleString()} downloads</span>
              </div>

              <button className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
