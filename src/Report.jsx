import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Report = () => {
 
  const location = useLocation();

  const [images, setImages] = useState({
    mbiuOnSite: [],
    expansionJoints: [],
    drainageSpouts: [],
    bearings: [],
    abutments: [],
    piers: [],
    superStructure: [],
    retainingWalls: [],
    overallBridge: [],
  });

  // Load images from local storage when component mounts
  useEffect(() => {
    const storedImages = localStorage.getItem('bridgeImages');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  // Retrieve the bridge report data from localStorage
  const ratingData = JSON.parse(localStorage.getItem('bridgeratingReport'));
  const projectInfo =  JSON.parse(localStorage.getItem('projectInfo')) || {};
  const storedData = localStorage.getItem('surveydata');
  const formData = storedData ? JSON.parse(storedData) : {};

  const [bridgeData, setBridgeData] = useState(null);

  useEffect(() => {
    // Retrieve and parse bridge data from local storage
    const data = localStorage.getItem('bridgeData');
    if (data) {
      setBridgeData(JSON.parse(data));
    }
  }, []);

  const convertObjectToArray = (data) => {
    let resultArray = [];

    Object.keys(data).forEach((sectionTitle) => {
        let sectionData = data[sectionTitle];
        let formattedSection = [];

        Object.keys(sectionData).forEach((key, index) => {
            formattedSection.push({
                index: `${index + 1}.${index + 1}`, // 1.1, 1.2, 1.3...
                label: key,
                value: sectionData[key] || '-'
            });
        });

        resultArray.push({
            section: sectionTitle,
            items: formattedSection
        });
    });

    return resultArray;
};

// Convert report data
const reportArray = convertObjectToArray(formData);

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
  const { condition, starRating } = getBridgeConditionAndRating(ratingData.BHI);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bridge Inspection Report</h1>
      {/* Project Information Section */}
      <div style={{ padding: '20px' }}>
    {/* Project Information Section */}
  <section>
    <p><strong>1. Project Name:</strong> {projectInfo.projectName}</p>
    <p><strong>2. Client Name:</strong> {projectInfo.clientName}</p>
    <p><strong>3. Consultant Name:</strong> {projectInfo.consultantName}</p>
    <p><strong>4. Date of Inspection:</strong> {projectInfo.inspectionDate}</p>
    <p><strong>5. Popular Name:</strong> {projectInfo.popularName}</p>
    <p><strong>6. Name of River/NH No.:</strong> {projectInfo.riverName}</p>
  </section>
  </div>

      <div>
      {Object.keys(images).map((category) => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h3>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {images[category].length > 0 ? (
              images[category].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${category} ${index}`}
                  style={{ width: '200px', height: 'auto', margin: '10px' }}
                />
              ))
            ) : (
              <p>No images uploaded </p>
            )}
          </div>
        </div>
      ))}
    </div>
  
    <div>
      <h2>BRIDGE DATA</h2>
      {bridgeData ? (
        <div>
          <p><strong>Structure Chainage (km):</strong> {bridgeData.chainage}</p>
          <p><strong>Bridge Type:</strong> {bridgeData.bridgeType}</p>
          {bridgeData.pdfFileUrl ? (
            <p>
              <strong>PDF File:</strong> 
              <a href={bridgeData.pdfFileUrl} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            </p>
          ) : (
            <p><strong>PDF File:</strong> No file uploaded</p>
          )}
        </div>
      ) : (
        <p>No bridge data available.</p>
      )}
    </div>


    <div>
  <h2>PROFORMA FOR CONDITION SURVEY OF BRIDGE</h2>
  {reportArray?.map((section, sectionIndex) => (
    <div key={sectionIndex} style={{ marginBottom: '20px' }}>
      <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th colSpan="3" style={{ textAlign: 'left', padding: '8px' }}>
              <h3 style={{ margin: '0' }}>{sectionIndex + 1}. {section.section}</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {section?.items.map((item, itemIndex) => (
            <tr key={itemIndex} style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black', padding: '4px', width: '10%', textAlign: 'center' }}>
                {sectionIndex + 1}.{itemIndex + 1}
              </td>
              <td style={{ border: '1px solid black', padding: '4px', width: '75%' }}>{item.label}</td> {/* Decreased width */}
              <td style={{ border: '1px solid black', padding: '4px', width: '25%', textAlign: 'center' }}>{item.value}</td> {/* Increased width */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</div>





      {/* Display overall Bridge Health Index (BHI) */}
      <h2>Bridge Health Index (BHI): {ratingData.BHI.toFixed(2)}</h2>

      {/* Display Condition State and Bridge Star Rating */}
      <h3>Condition state of Bridge: {condition}</h3>
      <h3>Bridge Star Rating: {starRating}</h3>

      {/* Button to go back to the form */}
      <button onClick={() => navigate('/bridgeratingform')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Back to Form
      </button>
    </div>
  );
};

export default Report;