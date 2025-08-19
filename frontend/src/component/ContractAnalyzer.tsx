import React, { useState, useCallback } from 'react';

const ContractAnalyzer = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [contractText, setContractText] = useState('');
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'text'

  // Mock analysis data
  const mockAnalysis = {
    riskLevel: 'medium',
    overallScore: 7.5,
    keyFindings: [
      {
        type: 'warning',
        title: 'Automatic Renewal Clause',
        description: 'Contract automatically renews for another year unless cancelled 60 days in advance.',
        suggestion: 'Negotiate a shorter renewal notice period (30 days) or opt for manual renewal.'
      },
      {
        type: 'caution',
        title: 'Rent Escalation',
        description: 'Annual rent increase capped at 5% or CPI, whichever is higher.',
        suggestion: 'Request a fixed percentage cap (e.g., 3%) instead of CPI-based increases.'
      },
      {
        type: 'positive',
        title: 'Early Termination Rights',
        description: 'You have the right to terminate with 30 days notice for job relocation.',
        suggestion: 'This is favorable - no action needed.'
      }
    ],
    contractType: 'Residential Lease Agreement',
    estimatedValue: '$24,000',
    negotiationPoints: [
      'Request security deposit reduction',
      'Add maintenance responsibility clarifications',
      'Include parking space guarantee'
    ]
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeContract = async () => {
    setAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'warning':
        return (
          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'caution':
        return (
          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'positive':
        return (
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Contract Analyzer</h1>
          <p className="text-gray-400">Upload your contract for instant AI-powered analysis</p>
        </div>

        {!analysis ? (
          <div className="space-y-6">
            {/* Upload Method Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gray-800/50 rounded-lg p-1 flex">
                <button
                  onClick={() => setUploadMethod('file')}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    uploadMethod === 'file'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setUploadMethod('text')}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    uploadMethod === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {uploadMethod === 'file' ? (
              /* File Upload */
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-blue-400 bg-blue-500/5'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-xl mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  {file ? (
                    <div>
                      <p className="text-green-400 font-medium">{file.name}</p>
                      <p className="text-gray-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl text-white mb-2">Drop your contract here</p>
                      <p className="text-gray-400 mb-4">or click to browse files</p>
                      <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, TXT files up to 10MB</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              /* Text Input */
              <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-lg font-medium text-white">Paste Contract Text</h3>
                  <p className="text-gray-400 text-sm">Copy and paste your contract content below</p>
                </div>
                <textarea
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="Paste your contract text here..."
                  className="w-full h-64 p-4 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
                />
              </div>
            )}

            {/* Analyze Button */}
            {((uploadMethod === 'file' && file) || (uploadMethod === 'text' && contractText.trim())) && (
              <div className="text-center">
                <button
                  onClick={analyzeContract}
                  disabled={analyzing}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
                >
                  {analyzing ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing Contract...
                    </div>
                  ) : (
                    'Analyze Contract'
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Analysis Header */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{analysis.contractType}</h2>
                  <p className="text-gray-400">Contract Value: {analysis.estimatedValue}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">Risk Level:</span>
                    <span className={`font-semibold ${getRiskColor(analysis.riskLevel)}`}>
                      {analysis.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Score:</span>
                    <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}/10
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    analysis.overallScore >= 8 ? 'bg-green-500' :
                    analysis.overallScore >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(analysis.overallScore / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Key Findings */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Findings</h3>
              <div className="space-y-4">
                {analysis.keyFindings.map((finding, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-700/30 rounded-lg">
                    {getTypeIcon(finding.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{finding.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{finding.description}</p>
                      <p className="text-blue-400 text-sm font-medium">💡 {finding.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation Points */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recommended Negotiation Points</h3>
              <div className="space-y-3">
                {analysis.negotiationPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <p className="text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setAnalysis(null);
                  setFile(null);
                  setContractText('');
                }}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Analyze Another Contract
              </button>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Download Report (PDF)
              </button>
              <button className="px-6 py-3 border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-400 font-medium rounded-lg transition-all">
                Share Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractAnalyzer;