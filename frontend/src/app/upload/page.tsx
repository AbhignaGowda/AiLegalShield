"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

export default function UploadPage() {
  const [chats, setChats] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = () => {
    if (!message) return;
    setChats([...chats, message]);
    setMessage("");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 p-4 flex flex-col transform transition-transform duration-300 z-20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat History</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.length === 0 && (
            <p className="text-gray-400 text-sm">No chats yet.</p>
          )}
          {chats.map((chat, i) => (
            <div
              key={i}
              className="p-2 rounded-md bg-gray-700 text-sm truncate"
            >
              {chat}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-0">
        {/* Top Bar */}
        <div className="p-4 border-b border-gray-700 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 mr-2"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Upload Your Contract</h1>
        </div>

        {/* Upload Area */}
        <div className="p-6 border-b border-gray-700">
          <input
            type="file"
            className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                       file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4">
            {chats.map((chat, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-gray-700 max-w-lg text-sm"
              >
                {chat}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="mt-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your contract..."
              className="flex-1 p-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-6 bg-indigo-600 rounded-r-lg hover:bg-indigo-500 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
