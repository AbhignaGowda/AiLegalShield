"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import FileUploader from "@/component/FileUploader";
import AnalysisResultView from "@/component/AnalysisResult";
import ChatSection from "@/component/ChatSection";
import { AnalysisResult, ChatMessage } from "@/utils/types";

const Page = () => {
  const { user, isLoaded } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [contractText, setContractText] = useState("");
  const [contractType, setContractType] = useState("general");

  if (!isLoaded) return <div>Loading...</div>;

  // Handle file upload & call API
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadStatus("Analyzing contract...");
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("userId", user?.id || "");
      formData.append("userName", user?.firstName || "Unknown");
      formData.append("contract_type", contractType);

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus("File analyzed successfully!");
        setAnalysisResult(result);
        setContractText(result.contract_text || "");
        setChatMessages([]);
      } else {
        const errorData = await response.json();
        setUploadStatus(`Analysis failed: ${errorData.detail || "Unknown error"}`);
      }
    } catch (error: any) {
      setUploadStatus(`Analysis failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Handle chat submission
  const handleChatSubmit = async () => {
    if (!chatInput.trim() || !analysisResult || chatLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          message: userMessage.content,
          contract_text: contractText,
          analysis_result: analysisResult,
          chat_history: chatMessages,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: result.response, timestamp: new Date().toISOString() },
        ]);
      } else {
        const errorData = await response.json();
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${errorData.detail || "Unknown error"}`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error: any) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${error.message}`, timestamp: new Date().toISOString() },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Handle Enter key for chat
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hello {user?.firstName || "Guest"}!</h1>

      <FileUploader
        onFileSelect={setSelectedFile}
        onUpload={handleFileUpload}
        selectedFile={selectedFile}
        uploading={uploading}
        uploadStatus={uploadStatus}
        contractType={contractType}
        onContractTypeChange={setContractType}
      />

      {analysisResult && <AnalysisResultView analysisResult={analysisResult} />}

      {/* Chat Section */}
      {analysisResult && (
        <ChatSection
          chatMessages={chatMessages}
          chatInput={chatInput}
          chatLoading={chatLoading}
          onInputChange={setChatInput}
          onSend={handleChatSubmit}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
};

export default Page;