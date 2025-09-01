"use client";
import React from "react";
import { AnalysisResult } from "@/utils/types";
import { getRiskColor, getRiskScoreColor } from "../utils/riskColors";

interface Props {
  analysisResult: AnalysisResult;
}

const AnalysisResultView: React.FC<Props> = ({ analysisResult }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
      <h2 className="text-2xl font-bold text-white mb-3">Contract Analysis Results</h2>
      
      {/* Overall Risk Score */}
      <div className="flex items-center space-x-3">
        <span className="text-white/90 font-medium">Overall Risk Score:</span>
        <span
          className={`px-4 py-2 rounded-lg text-lg font-bold shadow-md ${getRiskScoreColor(
            analysisResult.overall_risk_score
          )}`}
        >
          {analysisResult.overall_risk_score}/10
        </span>
      </div>
    </div>

    <div className="p-8">
      {/* Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
          Executive Summary
        </h3>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
          {analysisResult.summary}
        </p>
      </div>

      {/* Risky Clauses */}
      {analysisResult.risky_clauses?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-1 h-6 bg-red-500 rounded-full mr-3"></div>
            Risky Clauses
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {analysisResult.risky_clauses.length}
            </span>
          </h3>
          
          <div className="space-y-4">
            {analysisResult.risky_clauses.map((clause, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getRiskColor(
                      clause.risk_level
                    )}`}
                  >
                    {clause.risk_level.toUpperCase()} RISK
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Clause Text:</h4>
                    <p className="text-sm text-gray-800 italic bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                      "{clause.clause_text}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Risk Explanation:</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {clause.explanation}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border-l-2 border-blue-400">
                    <h4 className="text-sm font-medium text-blue-900 mb-1">💡 Suggestion:</h4>
                    <p className="text-sm text-blue-800">
                      {clause.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Negotiation Points */}
      {analysisResult.negotiation_points?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
            Key Negotiation Points
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {analysisResult.negotiation_points.length}
            </span>
          </h3>
          
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <ul className="space-y-3">
              {analysisResult.negotiation_points.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-green-900 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default AnalysisResultView;