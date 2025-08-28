// components/ChatHistory.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { ChatHistoryItem, ChatSession, ChatMessage } from '@/types/chat';

interface ChatHistoryProps {
  userId: string;
  onChatSelect: (chatSession: ChatSession) => void;
  currentChatId?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  userId, 
  onChatSelect, 
  currentChatId 
}) => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat history when component mounts or userId changes
  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  const fetchChatHistory = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8000/chat-history/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      
      const data = await response.json();
      setChatHistory(data.chat_history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching chat history:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadChatSession = async (chatId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/chat-session/${chatId}?user_id=${userId}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to load chat session');
      }
      
      const data = await response.json();
      onChatSelect(data.chat_session);
    } catch (err) {
      console.error('Error loading chat session:', err);
      setError(err instanceof Error ? err.message : 'Failed to load chat');
    }
  };

  const deleteChatSession = async (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering chat selection
    
    if (!confirm('Are you sure you want to delete this chat?')) {
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:8000/chat-session/${chatId}?user_id=${userId}`,
        { method: 'DELETE' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }
      
      // Refresh chat history after deletion
      fetchChatHistory();
    } catch (err) {
      console.error('Error deleting chat:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete chat');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getRiskColor = (contractType: string) => {
    const colors = {
      'employment': 'bg-blue-100 text-blue-800',
      'lease': 'bg-green-100 text-green-800',
      'nda': 'bg-purple-100 text-purple-800',
      'general': 'bg-gray-100 text-gray-800',
    };
    return colors[contractType as keyof typeof colors] || colors.general;
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-16"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Chat History</h2>
        <button
          onClick={fetchChatHistory}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">No chat history yet</p>
            <p className="text-xs mt-1">Upload a contract to start chatting</p>
          </div>
        ) : (
          chatHistory.map((chat) => (
            <div
              key={chat.chat_id}
              className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 ${
                currentChatId === chat.chat_id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => loadChatSession(chat.chat_id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(chat.contract_type)}`}>
                      {chat.contract_type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {chat.message_count} messages
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                    {chat.contract_filename}
                  </h3>
                  
                  <p className="text-xs text-gray-500">
                    {formatDate(chat.last_message_at)}
                  </p>
                </div>
                
                <button
                  onClick={(e) => deleteChatSession(chat.chat_id, e)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  title="Delete chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHistory;