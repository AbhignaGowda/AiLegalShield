"use client";
import React from "react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  onUpload: () => void;
  selectedFile: File | null;
  uploading: boolean;
  uploadStatus: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onUpload,
  selectedFile,
  uploading,
  uploadStatus
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(event.target.files?.[0] || null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <input
        type="file"
        accept=".txt,.pdf,.docx,.doc"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {selectedFile && (
        <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
          <strong>Selected:</strong> {selectedFile.name}
        </div>
      )}
      <button
        onClick={onUpload}
        disabled={!selectedFile || uploading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium mt-4"
      >
        {uploading ? 'Analyzing...' : 'Analyze Contract'}
      </button>
      {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
    </div>
  );
};

export default FileUploader;
