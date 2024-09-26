import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve the bridge report data from localStorage
  const reportData = JSON.parse(localStorage.getItem('bridgeReport'));
  const projectInfo =  JSON.parse(localStorage.getItem('projectInfo')) || {};
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
      {/* Project Information Section */}
      <section>
  <h2>Project Information</h2>
  <table border="1" cellspacing="0" cellpadding="10">
    <tr>
      <td>Project Name</td>
      <td>{projectInfo.projectName}</td>
    </tr>
    <tr>
      <td>Client Name</td>
      <td>{projectInfo.clientName}</td>
    </tr>
    <tr>
      <td>Consultant Name</td>
      <td>{projectInfo.consultantName}</td>
    </tr>
    <tr>
      <td>Date of Inspection</td>
      <td>{projectInfo.inspectionDate}</td>
    </tr>
    <tr>
      <td>Popular Name</td>
      <td>{projectInfo.popularName || 'N/A'}</td>
    </tr>
    <tr>
      <td>Name of River/NH No.</td>
      <td>{projectInfo.riverName}</td>
    </tr>
  </table>
</section>

      {/* Display overall Bridge Health Index (BHI) */}
      <h2>Bridge Health Index (BHI): {reportData.BHI.toFixed(2)}</h2>

      {/* Display Condition State and Bridge Star Rating */}
      <h3>Condition state of Bridge: {condition}</h3>
      <h3>Bridge Star Rating: {starRating}</h3>

      {/* Button to go back to the form */}
      <button onClick={() => navigate('/bridgeform')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Back to Form
      </button>
    </div>
  );
};

export default Report;