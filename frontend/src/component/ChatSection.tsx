"use client";
import React from "react";
import { ChatMessage } from "@/utils/types";

interface Props {
  chatMessages: ChatMessage[];
  chatInput: string;
  chatLoading: boolean;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatSection: React.FC<Props> = ({
  chatMessages,
  chatInput,
  chatLoading,
  onInputChange,
  onSend,
  onKeyPress,
}) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-6">
    {/* Header */}
    <div className="flex items-center mb-6">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Contract Assistant</h2>
        <p className="text-sm text-gray-500">Ask questions about your contract analysis</p>
      </div>
    </div>

    {/* Chat Messages */}
    <div className="bg-gray-50 rounded-lg p-4 mb-6 h-96 overflow-y-auto border">
      {chatMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium mb-2">Ready to help!</p>
          <p className="text-gray-400 text-sm max-w-xs">
            Ask me anything about your contract - clauses, risks, terms, or get clarification on the analysis.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-500">Assistant</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {chatLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Input Section */}
    <div className="relative">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={chatInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Ask about contract terms, clauses, risks, or get clarification..."
            className="w-full border border-gray-300 rounded-xl p-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            rows={1}
            style={{ minHeight: '52px', maxHeight: '120px' }}
          />
          <div className="absolute bottom-3 right-3">
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              Enter
            </kbd>
          </div>
        </div>
        
        <button
          onClick={onSend}
          disabled={!chatInput.trim() || chatLoading}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg disabled:shadow-none disabled:cursor-not-allowed group"
        >
          {chatLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>
      
      {/* Character count or helper text */}
      <div className="flex justify-between items-center mt-2 px-1">
        <p className="text-xs text-gray-400">
          💡 Tip: Be specific about which clauses or terms you'd like to discuss
        </p>
        <span className="text-xs text-gray-400">
          {chatInput.length}/1000
        </span>
      </div>
    </div>
  </div>
);

export default ChatSection;