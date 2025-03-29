import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChainageData = () => {
  const [chainage, setChainage] = useState('');
  const [pdfFiles, setPdfFiles] = useState([]); // Store multiple file objects (name and URL)
  const [selectedBridgeType, setSelectedBridgeType] = useState('');
  const navigate = useNavigate();

  const handleBridgeTypeChange = (event) => {
    setSelectedBridgeType(event.target.value);
  };

  const handleChainageChange = (event) => {
    const value = event.target.value;
    const decimalPattern = /^\d*\.?\d*$/;

    if (decimalPattern.test(value)) {
      setChainage(value);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Get the selected files as an array

    const validFiles = files.filter(file => file.type === 'application/pdf');

    // Generate URLs for valid PDF files and add them to the list
    const newPdfFiles = validFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    // Update the state by adding the new files to the existing ones
    setPdfFiles(prevFiles => [...prevFiles, ...newPdfFiles]);
  };

  const removeFile = (indexToRemove) => {
    setPdfFiles(prevFiles =>
      prevFiles.filter((_, index) => index !== indexToRemove) // Remove file at the given index
    );
  };

  const handleSubmit = () => {
    // Create an object to hold all the data
    const bridgeData = {
      chainage,
      bridgeType: selectedBridgeType,
      pdfFiles: pdfFiles.length ? pdfFiles : null, // Use null if no files are uploaded
    };

    // Store the object as a JSON string in local storage under a single key
    localStorage.setItem('bridgeData', JSON.stringify(bridgeData));

    // Navigate to the next form
    navigate('/ConditionSurveyForm');
  };

  return (
    <div>
      <h2>Bridge Data</h2>

      <label style={{ marginBottom: '10px' }}>
        Structure Chainage (km):
        <input
          type="text"
          value={chainage}
          onChange={handleChainageChange}
          placeholder="Enter chainage in km"
        />
      </label>

      <br />

      <label style={{ marginBottom: '10px' }}>
        Bridge Type:
        <select value={selectedBridgeType} onChange={handleBridgeTypeChange}>
          <option value="" disabled>Select structure type</option>
          <option value="Interchange">Interchange</option>
          <option value="Minor Bridge">Minor Bridge</option>
          <option value="Major Bridge">Major Bridge</option>
          <option value="VUP">VUP</option>
          <option value="VOP">VOP</option>
          <option value="LVUP">LVUP</option>
          <option value="SVUP">SVUP</option>
          <option value="ROB">ROB</option>
          <option value="RUB">RUB</option>
          <option value="CUP">CUP</option>
          <option value="PUP">PUP</option>
        </select>
      </label>

      <br />

      <label style={{ marginBottom: '10px' }}>
        Import PDF File(s):
        <input
          type="file"
          accept="application/pdf"
          multiple // Allow multiple files to be selected at once
          onChange={handleFileChange}
        />
      </label>
      <br />

      {pdfFiles.length > 0 && (
        <div>
        <h4>Uploaded Files:</h4>
              {/* Show file count only if files are uploaded */}
              {pdfFiles.length > 0 && (
              <span style={{ marginLeft: '10px' }}>
              {pdfFiles.length} files uploaded
              </span>
              )}
          <ul>
            {pdfFiles.map((file, index) => (
              <li key={index}>
                {file.name}{' '}
                <button onClick={() => removeFile(index)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Next</button>
    </div>
  );
};

export default ChainageData;
