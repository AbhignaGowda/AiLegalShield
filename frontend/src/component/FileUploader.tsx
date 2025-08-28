"use client";
import React from "react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  onUpload: () => void;
  selectedFile: File | null;
  uploading: boolean;
  uploadStatus: string;
  contractType: string;
  onContractTypeChange: (type: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onUpload,
  selectedFile,
  uploading,
  uploadStatus,
  contractType,
  onContractTypeChange
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(event.target.files?.[0] || null);
  };

  const handleContractTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onContractTypeChange(event.target.value);
  };

  const contractTypes = [
    { value: "general", label: "General Contract" },
    { value: "lease", label: "Lease Agreement" },
    { value: "employment", label: "Employment Contract" },
    { value: "nda", label: "Non-Disclosure Agreement" }
  ];

  return (
    <div className="rounded-lg shadow-md p-6 mb-6 border">
      <h2 className="text-lg font-semibold mb-4">Upload Contract for Analysis</h2>
      
      {/* Contract Type Selector */}
      <div className="mb-4">
        <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-2">
          Contract Type
        </label>
        <select
          id="contractType"
          value={contractType}
          onChange={handleContractTypeChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {contractTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* File Input */}
      <div className="mb-4">
        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
          Select Contract File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".txt,.pdf,.docx,.doc"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Selected File Display */}
      {selectedFile && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md border">
            <strong>Selected File:</strong> {selectedFile.name}
            <br />
            <strong>Contract Type:</strong> {contractTypes.find(type => type.value === contractType)?.label}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={!selectedFile || uploading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
      >
        {uploading ? 'Analyzing Contract...' : 'Analyze Contract'}
      </button>

      {/* Status Message */}
      {uploadStatus && (
        <div className="mt-4">
          <p className={`text-sm ${uploadStatus.includes('failed') || uploadStatus.includes('Error') ? 'text-red-600' : uploadStatus.includes('successfully') ? 'text-green-600' : 'text-blue-600'}`}>
            {uploadStatus}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;