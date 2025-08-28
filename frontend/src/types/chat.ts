// utils/types.ts - Updated with chat history types

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface RiskyClause {
  clause_text: string;
  risk_level: 'high' | 'medium' | 'low';
  explanation: string;
  suggestion: string;
}

export interface AnalysisResult {
  overall_risk_score: number;
  risky_clauses: RiskyClause[];
  summary: string;
  negotiation_points: string[];
  filename?: string;
  contract_type: string;
  user_id: string;
  user_name?: string;
  contract_text: string;
  chat_id?: string; // Important: for tracking chat sessions
}

// New types for chat history functionality
export interface ChatHistoryItem {
  chat_id: string;
  user_id: string;
  contract_filename: string;
  contract_type: string;
  created_at: string;
  last_message_at: string;
  message_count: number;
}

export interface ChatSession {
  chat_id: string;
  messages: ChatMessage[];
  contract_info: {
    filename: string;
    contract_type: string;
    contract_text: string;
    analysis_result: AnalysisResult;
  };
}

export interface ChatHistoryResponse {
  chat_history: ChatHistoryItem[];
  status: string;
  message?: string;
}

export interface ChatSessionResponse {
  chat_session: ChatSession;
  status: string;
}