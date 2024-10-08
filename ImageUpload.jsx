import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const navigate = useNavigate(); // Get navigate function for navigation
  const [images, setImages] = useState({
    mbiuOnSite : [],
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

  const handleFileChange = (event, category) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    const newImages = files.map(file => URL.createObjectURL(file)); // Create URLs for each selected file

    setImages(prev => {
      const updatedImages = {
        ...prev,
        [category]: [...prev[category], ...newImages], // Append new images to the existing ones
      };
      // Save updated images to local storage
      localStorage.setItem('bridgeImages', JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  const handleSubmit = () => {
    // Navigate to the Report component
    navigate('/ChainageData');
  };

  return (
    <div>
      <h2>Upload Images for Bridge Components</h2>
      {Object.keys(images).map((category) => (
        <div key={category} style={{ marginBottom: '20px' }}>
          <label>
            {category.replace(/([A-Z])/g, ' $1').toUpperCase()}:
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event, category)}
              multiple // Allow multiple file uploads
            />
          </label>
          {images[category].length > 0 && (
            <div>
              <h4>Preview:</h4>
              {images[category].map((image, index) => (
                <img key={index} src={image} alt={`${category} ${index}`} style={{ width: '200px', height: 'auto', marginRight: '10px' }} />
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default ImageUpload;
