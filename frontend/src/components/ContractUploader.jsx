import React, { useState } from 'react';
import { uploadContract, healthCheck } from '../services/api';

const ContractUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Test backend connection
  const testConnection = async () => {
    try {
      const result = await healthCheck();
      setStatus(`Connected! Status: ${result.status}`);
    } catch (error) {
      setStatus('Connection failed!');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const result = await uploadContract(file);
      setStatus(`Upload successful: ${result.message}`);
    } catch (error) {
      setStatus(`Upload failed: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Legal Shield</h2>
      
      {/* Connection test */}
      <button 
        onClick={testConnection}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Backend Connection
      </button>
      
      {/* File upload */}
      <form onSubmit={handleFileUpload} className="space-y-4">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {loading ? 'Uploading...' : 'Upload Contract'}
        </button>
      </form>
      
      {/* Status display */}
      {status && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm">{status}</p>
        </div>
      )}
    </div>
  );
};

export default ContractUploader;