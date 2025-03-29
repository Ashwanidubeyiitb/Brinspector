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
  const ratingData = JSON.parse(localStorage.getItem('bridgeratingData'));
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

  const [spans, setSpans] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('visualInspectionData');
    if (data) {
      setSpans(JSON.parse(data)); // Parse and set spans data from local storage
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
    
    <div 
    style={{ padding: '20px' }}>
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
        {bridgeData.pdfFiles && bridgeData.pdfFiles.length > 0 ? (
          <div style={{ display: 'flex' }}>
            <strong>Drawing Files:</strong>
            <div style={{ marginLeft: '10px' }}>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {bridgeData.pdfFiles.map((file, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    <a 
                      href={file.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        textDecoration: 'underline', 
                        fontStyle: 'italic', 
                        color: 'black' 
                      }}
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p><strong>PDF Files:</strong> No files uploaded</p>
        )}
      </div>
    ) : (
      <p>No bridge data available.</p>
    )}
  </div>


  <div>
  <h2>PROFORMA FOR CONDITION SURVEY OF BRIDGE</h2>
  {/* Check if reportArray exists and has items */}
  {reportArray && reportArray.length > 0 ? (
    reportArray.map((section, sectionIndex) => (
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
            {/* Check if the section has items */}
            {section?.items.length > 0 ? (
              section.items.map((item, itemIndex) => (
                <tr key={itemIndex} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black', padding: '4px', width: '10%', textAlign: 'center' }}>
                    {sectionIndex + 1}.{itemIndex + 1}
                  </td>
                  <td style={{ border: '1px solid black', padding: '4px', width: '75%' }}>{item.label}</td>
                  <td style={{ border: '1px solid black', padding: '4px', width: '25%', textAlign: 'center' }}>{item.value}</td>
                </tr>
              ))
            ) : (
              // If no items are found in the section, display this message
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    ))
  ) : (
    // If reportArray is empty or undefined, display this message
    <div>No data available</div>
  )}
</div>

<div>
  <h2>VISUAL INSPECTION</h2>
  {spans.length === 0 ? (
    <p>No data available.</p>
  ) : (
    spans.map((span, spanIndex) => (
      <div key={spanIndex} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <h2>{`Span ${span.spanNumber}`}</h2>
        {span.subComponents.map((subComp, subCompIndex) => (
          <div key={subCompIndex} style={{ marginBottom: '20px' }}>
            <h3>{subComp.name}</h3>
            <p> {subComp.notes || 'No notes available.'}</p>

            {/* Render photos with captions */}
            {subComp.photos && subComp.photos.length > 0 && (
              <div>
                {subComp.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} style={{ marginBottom: '15px', maxWidth: '200px' }}>
                    <img
                      src={photo.image}
                      alt={`Photo ${photoIndex + 1}`}
                      style={{ maxWidth: '100%', display: 'block' }}
                    />
                    <p style={{ marginTop: '0', wordWrap: 'break-word' }}>
                      {photo.caption || 'No caption provided.'}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Render Girders and Cross Girders photos if applicable */}
            {subComp.girders && subComp.girders.length > 0 && (
              <div>
                <h4>Girders</h4>
                {subComp.girders.map((girder, girderIndex) => (
                  <div key={girderIndex} style={{ marginBottom: '20px', maxWidth: '200px' }}>
                    <h5>{girder.name}</h5>
                    {girder.photos && girder.photos.map((photo, photoIndex) => (
                      <div key={photoIndex} style={{ marginBottom: '15px', maxWidth: '200px' }}>
                        <img
                          src={photo.image}
                          alt={`Girder Photo ${photoIndex + 1}`}
                          style={{ maxWidth: '100%', display: 'block' }}
                        />
                        <p style={{ marginTop: '0', wordWrap: 'break-word' }}>
                          {photo.caption || 'No caption provided.'}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {subComp.crossgirders && subComp.crossgirders.length > 0 && (
              <div>
                <h4>Cross Girders</h4>
                {subComp.crossgirders.map((crossgirder, crossgirderIndex) => (
                  <div key={crossgirderIndex} style={{ marginBottom: '20px', maxWidth: '200px' }}>
                    <h5>{crossgirder.name}</h5>
                    {crossgirder.photos && crossgirder.photos.map((photo, photoIndex) => (
                      <div key={photoIndex} style={{ marginBottom: '15px', maxWidth: '200px' }}>
                        <img
                          src={photo.image}
                          alt={`Cross Girder Photo ${photoIndex + 1}`}
                          style={{ maxWidth: '100%', display: 'block' }}
                        />
                        <p style={{ marginTop: '0', wordWrap: 'break-word' }}>
                          {photo.caption || 'No caption provided.'}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ))
  )}
</div>

      {/* Display overall Bridge Health Index (BHI) */}
      <h2>Bridge Health Index (BHI): {ratingData.BHI.toFixed(2)}</h2>

      {/* Display Condition State and Bridge Star Rating */}
      <h3>Condition state of Bridge: {condition}</h3>
      <h3>Bridge Star Rating: {starRating}</h3>

      {/* Footer */}
      <footer className="report-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
      <div className="footer-logos" style={{ marginRight: 'auto' }}>
      <img src="/images/BRInspector.jpg" alt="BRInspector Logo" style={{ height: '50px' }} />
      </div>
      <div className="footer-logos" style={{ marginLeft: 'auto' }}>
      <img src="/images/CRRI.png" alt="CRRI Logo" style={{ height: '50px' }} />
      </div>
      <p>&copy;</p>
      </footer>
      
    </div>
  );
};

export default Report;