"use client";
import React from "react";
import { AnalysisResult } from "@/utils/types";
import { getRiskColor, getRiskScoreColor } from "../utils/riskColors";

interface Props {
  analysisResult: AnalysisResult;
}

const AnalysisResultView: React.FC<Props> = ({ analysisResult }) => (
  <div className="rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4">Contract Analysis Results</h2>

    {/* Overall Risk Score */}
    <div className="mb-6">
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskScoreColor(
          analysisResult.overall_risk_score
        )}`}
      >
        {analysisResult.overall_risk_score}/10
      </span>
    </div>

    {/* Summary */}
    <p className="text-white mb-6">{analysisResult.summary}</p>

    {/* Risky Clauses */}
    {analysisResult.risky_clauses?.length > 0 && (
      <div>
        <h3 className="text-lg font-semibold mb-2">Risky Clauses</h3>
        {analysisResult.risky_clauses.map((clause, idx) => (
          <div key={idx} className="border p-4 mt-3 rounded">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${getRiskColor(
                clause.risk_level
              )}`}
            >
              {clause.risk_level.toUpperCase()} RISK
            </span>
            <p className="mt-2 text-sm italic">{clause.clause_text}</p>
            <p className="mt-2 text-sm">{clause.explanation}</p>
            <p className="mt-2 text-sm font-medium">
              Suggestion: {clause.suggestion}
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Negotiation Points */}
    {analysisResult.negotiation_points?.length > 0 && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Key Negotiation Points</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
          {analysisResult.negotiation_points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default AnalysisResultView;
