import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChainageData = () => {
  const [chainage, setChainage] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const handleChainageChange = (event) => {
    const value = event.target.value;
    // Regular expression to match decimal numbers
    const decimalPattern = /^\d*\.?\d*$/;

    // Update only if the value matches the decimal pattern
    if (decimalPattern.test(value)) {
      setChainage(value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file);
      localStorage.setItem('pdfFileUrl', fileUrl);
      localStorage.setItem('chainage', chainage);
      setPdfFile(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('chainage', chainage);
    navigate('/ConditionSurveyForm'); // Adjust this route as needed
  };

  return (
    <div>
      <h2>Bridge Data</h2>
      
      <label>
        Structure Chainage (km):
        <input
          type="text"
          value={chainage}
          onChange={handleChainageChange}
          placeholder="Enter chainage in km"
        />
      </label>

      <br />

      <label>
        Import PDF File:
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>

      <br />

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default ChainageData;
