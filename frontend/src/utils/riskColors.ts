import { RiskLevel } from "./types";

export const getRiskColor = (level: RiskLevel): string => {
  switch (level) {
    case 'high': return 'text-red-700 bg-red-100';
    case 'medium': return 'text-yellow-700 bg-yellow-100';
    case 'low': return 'text-green-700 bg-green-100';
    default: return 'text-gray-700 bg-gray-100';
  }
};

export const getRiskScoreColor = (score: number): string => {
  if (score >= 8) return 'text-red-700 bg-red-100';
  if (score >= 6) return 'text-yellow-700 bg-yellow-100';
  if (score >= 4) return 'text-blue-700 bg-blue-100';
  return 'text-green-700 bg-green-100';
};
