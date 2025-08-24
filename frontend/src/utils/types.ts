export type RiskLevel = 'high' | 'medium' | 'low';

export interface RiskyClause {
  risk_level: RiskLevel;
  clause_text: string;
  explanation: string;
  suggestion: string;
}

export interface AnalysisResult {
  overall_risk_score: number;
  summary: string;
  risky_clauses: RiskyClause[];
  negotiation_points: string[];
  contract_text: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
