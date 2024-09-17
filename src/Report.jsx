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

  // Function to determine condition state and star rating based on BHI
  const getBridgeConditionAndRating = (BHI) => {
    if (BHI < 20) {
      return { condition: 'Critical', starRating: 'One' };
    } else if (BHI >= 21 && BHI <= 40) {
      return { condition: 'Poor', starRating: 'Two' };
    } else if (BHI >= 41 && BHI <= 60) {
      return { condition: 'Fair', starRating: 'Three' };
    } else if (BHI >= 61 && BHI <= 80) {
      return { condition: 'Good', starRating: 'Four' };
    } else {
      return { condition: 'Excellent', starRating: 'Five' };
    }
  };

  // Get the condition state and star rating for the current BHI
  const { condition, starRating } = getBridgeConditionAndRating(reportData.BHI);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bridge Condition Report</h1>

      {/* Display overall Bridge Health Index (BHI) */}
      <h2>Bridge Health Index (BHI): {reportData.BHI.toFixed(2)}</h2>

      {/* Display Condition State and Bridge Star Rating */}
      <h3>Condition state of Bridge: {condition}</h3>
      <h3>Bridge Star Rating: {starRating}</h3>

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
