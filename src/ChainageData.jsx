import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChainageData = () => {
  const [chainage, setChainage] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();
  const [selectedBridgeType, setSelectedBridgeType] = useState('');

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
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl); // Save URL to state
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleSubmit = () => {
    // Create an object to hold all the data
    const bridgeData = {
      chainage,
      bridgeType: selectedBridgeType,
      pdfFileUrl: pdfFile || null, // Use null if no file is uploaded
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
        Import PDF File:
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>

      <br />

      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Next</button>
    </div>
  );
};

export default ChainageData;
