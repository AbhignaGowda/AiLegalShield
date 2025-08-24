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
  chatMessages, chatInput, chatLoading, onInputChange, onSend, onKeyPress
}) => (
  <div className=" rounded-lg shadow-md p-6 mt-6">
    <h2 className="text-xl font-bold mb-4">Ask Questions About Your Contract</h2>
    <div className="border rounded-lg p-4 mb-4 max-h-96 overflow-y-auto ">
      {chatMessages.length === 0 ? (
        <p className="text-gray-500 text-center">Ask me anything about your contract!</p>
      ) : (
        chatMessages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span>{msg.content}</span>
          </div>
        ))
      )}
    </div>
    <textarea
      value={chatInput}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder="Type a question..."
      className="w-full border p-3 rounded mb-2"
    />
    <button
      onClick={onSend}
      disabled={!chatInput.trim() || chatLoading}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
    >
      {chatLoading ? 'Sending...' : 'Send'}
    </button>
  </div>
);

export default ChatSection;
