import React from 'react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();

  // Retrieve the bridge report data from localStorage
  const reportData = JSON.parse(localStorage.getItem('bridgeReport'));

  // If no report data exists, redirect back to the form
  if (!reportData) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bridge Condition Report</h1>

      {/* Display overall Bridge Health Index (BHI) */}
      <h2>Bridge Health Index (BHI): {reportData.BHI.toFixed(2)}</h2>

      {/* Display details for each component */}
      {reportData.components.map((component) => (
        <div key={component.value} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>{component.label} (Weight: {component.weight}%)</h3>

          {/* Display details for each sub-component */}
          {component.subComponents.map((subComponent) => (
            <div key={subComponent.value} style={{ marginLeft: '20px', marginBottom: '10px' }}>
              <h4>{subComponent.label} (Weight: {subComponent.weight}%)</h4>

              {/* Display distress types and their values */}
              {subComponent.distressTypes.map((distress) => (
                <p key={distress.label} style={{ marginLeft: '20px' }}>
                  <strong>{distress.label}:</strong> {distress.value || 'Not provided'} {distress.unit}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Button to go back to the form */}
      <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Back to Form
      </button>
    </div>
  );
};

export default Report;
