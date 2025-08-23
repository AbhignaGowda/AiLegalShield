"use client"
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';

const Page = () => {
  const { user, isLoaded } = useUser()
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [contractType, setContractType] = useState('general')
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [contractText, setContractText] = useState('')

  // Show loading state while user data is being fetched
  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-700 bg-red-100'
      case 'medium': return 'text-yellow-700 bg-yellow-100'
      case 'low': return 'text-green-700 bg-green-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || !analysisResult || chatLoading) return

    const userMessage = {
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date().toISOString()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setChatLoading(true)

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          message: userMessage.content,
          contract_text: contractText,
          analysis_result: analysisResult,
          chat_history: chatMessages
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const assistantMessage = {
          role: 'assistant',
          content: result.response,
          timestamp: new Date().toISOString()
        }
        setChatMessages(prev => [...prev, assistantMessage])
      } else {
        const errorData = await response.json()
        const errorMessage = {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${errorData.detail || 'Unknown error'}`,
          timestamp: new Date().toISOString()
        }
        setChatMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}`,
        timestamp: new Date().toISOString()
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setChatLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSubmit()
    }
  }

  const getRiskScoreColor = (score) => {
    if (score >= 8) return 'text-red-700 bg-red-100'
    if (score >= 6) return 'text-yellow-700 bg-yellow-100'
    if (score >= 4) return 'text-blue-700 bg-blue-100'
    return 'text-green-700 bg-green-100'
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check file type
      const allowedTypes = [
        'text/plain',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ]
      
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file)
        setUploadStatus('')
        setAnalysisResult(null) // Clear previous results
      } else {
        setUploadStatus('Please select a .txt, .pdf, or .docx file')
        setSelectedFile(null)
      }
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first')
      return
    }

    setUploading(true)
    setUploadStatus('Analyzing contract...')
    setAnalysisResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('userId', user.id)
      formData.append('userName', user.firstName || 'Unknown')
      formData.append('contract_type', contractType)

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setUploadStatus('File analyzed successfully!')
        setAnalysisResult(result)
        setContractText(result.contract_text || '') // Store contract text for chat
        setChatMessages([]) // Reset chat when new file is analyzed
        console.log('Analysis result:', result)
      } else {
        const errorData = await response.json()
        setUploadStatus(`Analysis failed: ${errorData.detail || 'Unknown error'}`)
        setAnalysisResult(null)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus(`Analysis failed: ${error.message}`)
      setAnalysisResult(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-900">Hello {user.firstName}!</div>
        <p className="text-gray-600 mt-2">
          Upload your contract for AI-powered legal analysis. Get insights on risky clauses and negotiation points.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-2">
              Contract Type
            </label>
            <select
              id="contractType"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="general">General Contract</option>
              <option value="lease">Lease Agreement</option>
              <option value="employment">Employment Contract</option>
              <option value="nda">Non-Disclosure Agreement</option>
            </select>
          </div>

          <div>
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
              Select a file (.txt, .pdf, .docx)
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".txt,.pdf,.docx,.doc"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {selectedFile && (
            <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
              <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </div>
          )}

          <button
            onClick={handleFileUpload}
            disabled={!selectedFile || uploading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            {uploading ? 'Analyzing Contract...' : 'Analyze Contract'}
          </button>

          {uploadStatus && (
            <div className={`text-sm p-3 rounded-md ${
              uploadStatus.includes('success') 
                ? 'text-green-700 bg-green-100' 
                : uploadStatus.includes('failed') || uploadStatus.includes('Please select')
                ? 'text-red-700 bg-red-100'
                : 'text-blue-700 bg-blue-100'
            }`}>
              {uploadStatus}
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contract Analysis Results</h2>
          
          {/* Overall Risk Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskScoreColor(analysisResult.overall_risk_score)}`}>
                {analysisResult.overall_risk_score}/10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  analysisResult.overall_risk_score >= 8 ? 'bg-red-500' :
                  analysisResult.overall_risk_score >= 6 ? 'bg-yellow-500' :
                  analysisResult.overall_risk_score >= 4 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${(analysisResult.overall_risk_score / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700">{analysisResult.summary}</p>
          </div>

          {/* Risky Clauses */}
          {analysisResult.risky_clauses && analysisResult.risky_clauses.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Risky Clauses Found</h3>
              <div className="space-y-4">
                {analysisResult.risky_clauses.map((clause, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getRiskColor(clause.risk_level)}`}>
                        {clause.risk_level.toUpperCase()} RISK
                      </span>
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 mb-1">Clause Text:</h4>
                      <p className="text-gray-700 text-sm italic bg-white p-2 rounded border">
                        "{clause.clause_text}"
                      </p>
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 mb-1">Why This Is Risky:</h4>
                      <p className="text-gray-700 text-sm">{clause.explanation}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Suggestion:</h4>
                      <p className="text-gray-700 text-sm">{clause.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Negotiation Points */}
          {analysisResult.negotiation_points && analysisResult.negotiation_points.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Negotiation Points</h3>
              <ul className="list-disc list-inside space-y-2">
                {analysisResult.negotiation_points.map((point, index) => (
                  <li key={index} className="text-gray-700 text-sm">{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Chat Section */}
      {analysisResult && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ask Questions About Your Contract</h2>
          
          {/* Chat Messages */}
          <div className="border rounded-lg p-4 mb-4 max-h-96 overflow-y-auto bg-gray-50">
            {chatMessages.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                <p className="mb-2">💬 Ask me anything about your contract analysis!</p>
                <p className="text-sm">Examples:</p>
                <ul className="text-sm text-left mt-2 space-y-1">
                  <li>• "What should I negotiate on the termination clause?"</li>
                  <li>• "Is the payment schedule fair?"</li>
                  <li>• "What are the biggest red flags in this contract?"</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className={`text-sm ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'} mb-1`}>
                        {message.role === 'user' ? 'You' : 'AI Legal Assistant'}
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="text-sm text-gray-500 mb-1">AI Legal Assistant</div>
                      <div className="flex items-center space-x-2">
                        <div className="animate-pulse">Thinking...</div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex space-x-2">
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your contract..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              disabled={chatLoading}
            />
            <button
              onClick={handleChatSubmit}
              disabled={!chatInput.trim() || chatLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium self-end"
            >
              {chatLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            💡 I can only answer questions about the contract you uploaded and its analysis. Press Enter to send.
          </div>
        </div>
      )}
    </div>
  )
}

export default Page