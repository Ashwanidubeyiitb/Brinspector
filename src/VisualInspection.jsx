import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VisualInspection = () => {
  const [numSpans, setNumSpans] = useState('');
  const [spans, setSpans] = useState([]);
  const navigate = useNavigate();

  const handleSpanChange = (e) => {
    const spansCount = Math.min(e.target.value, 500);
    setNumSpans(spansCount);
    setSpans(
      Array.from({ length: spansCount }, () => ({
        girders: [{ id: 1, name: 'Girder 1', notes: '' }], // Start with 1 girder as default
        photos: [],
        notes: '',
        subComponents: [],
        abutment1Photos: [],
        abutment2Photos: [],
        pierPhotos: [],
        deckSlabPhotos: [],
        girderPhotos: [],
        bearingPhotos: [],
        abutmentCapPhotos: [],
        pierCapPhotos: [],
        bearingPedestalPhotos: [],
        expansionJointPhotos: [],
        railingPhotos: [],
      }))
    );
  };

  // PhotoUpload Component
  const PhotoUpload = ({ photos, setPhotos, label }) => {
    const handlePhotoChange = (e) => {
      const files = Array.from(e.target.files);
      const newPhotos = files.map((file) => ({
        id: Date.now() + Math.random(),
        file: URL.createObjectURL(file), // Create a URL for preview
        caption: '',
      }));
      setPhotos([...photos, ...newPhotos]);
    };
  
    const handleCaptionChange = (id, caption) => {
      const updatedPhotos = photos.map((photo) => {
        if (photo.id === id) {
          return { ...photo, caption };
        }
        return photo;
      });
      setPhotos(updatedPhotos);
    };
  
    const removePhoto = (id) => {
      const updatedPhotos = photos.filter(photo => photo.id !== id);
      setPhotos(updatedPhotos);
    };
  
    return (
      <div>
        <h3>{label} Photos</h3>
        <input type="file" multiple onChange={handlePhotoChange} />
        {photos && photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.file} alt="uploaded" style={{ width: '100px', height: '100px' }} />
            <input
              type="text"
              placeholder="Enter caption"
              value={photo.caption}
              onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
            />
            <button type="button" onClick={() => removePhoto(photo.id)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };

  const toggleSubComponents = (index) => {
    const updatedSpans = [...spans];
    updatedSpans[index].isOpen = !updatedSpans[index].isOpen;
    setSpans(updatedSpans);
  };

  const addSubComponent = (spanIndex, name) => {
    if (!name) return;
    const updatedSpans = [...spans];
    const newSubComponentId = updatedSpans[spanIndex].subComponents.length + 1;
    updatedSpans[spanIndex].subComponents.push({
      id: newSubComponentId,
      name: name,
      notes: '',
      photos: [],
    });
    setSpans(updatedSpans);
  };

  const removeSubComponent = (spanIndex, subComponentIndex) => {
    const updatedSpans = [...spans];
    updatedSpans[spanIndex].subComponents.splice(subComponentIndex, 1);
    setSpans(updatedSpans);
  };

  const handleSubComponentNoteChange = (e, spanIndex, subComponentIndex) => {
    const updatedSpans = [...spans];
    updatedSpans[spanIndex].subComponents[subComponentIndex].notes = e.target.value;
    setSpans(updatedSpans);
  };

  const addGirder = (spanIndex) => {
    const updatedSpans = [...spans];
    const newGirderId = updatedSpans[spanIndex].girders.length + 1;
    updatedSpans[spanIndex].girders.push({ id: newGirderId, name: `Girder ${newGirderId}`, notes: '' });
    setSpans(updatedSpans);
  };

  const removeGirder = (spanIndex, girderIndex) => {
    const updatedSpans = [...spans];
    updatedSpans[spanIndex].girders.splice(girderIndex, 1); // Remove selected girder
    setSpans(updatedSpans);
  };

  const handleNoteChange = (e, spanIndex, subComponent) => {
    const updatedSpans = [...spans];
    updatedSpans[spanIndex][subComponent] = e.target.value;
    setSpans(updatedSpans);
  };

  const handleGirderNameChange = (e, spanIndex, girderIndex) => {
    const updatedSpans = [...spans];
    updatedSpans[spanIndex].girders[girderIndex].name = e.target.value; // Update girder name
    setSpans(updatedSpans);
  };

  const handleGirderNoteChange = (e, spanIndex, girderIndex) => {
    const updatedSpans = [...spans];
    updatedSpans[spanIndex].girders[girderIndex].notes = e.target.value;
    setSpans(updatedSpans);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/bridgeform');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Visual Inspection</h1>
      <label>
        Enter Number of Spans (up to 500):
        <input
          type="number"
          value={numSpans || ''}
          onChange={handleSpanChange}
          min={1}
          max={500}
          placeholder="Enter number of spans"
        />
      </label>

      {spans.map((span, index) => (
        <div key={index}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px' // Adjust this value to increase or decrease spacing between spans
            }}
          >
            <h2 style={{ margin: '0' }}>
              Span {index + 1}
            </h2>
            <button 
              type="button" 
              onClick={() => toggleSubComponents(index)}
              style={{
                alignSelf: 'center', 
                marginLeft: '10px',   
                fontSize: '0.7em',    
              }}
            >
              {span.isOpen ? '-' : '+'}
            </button>
          </div>
                    
          {span.isOpen && (
            <div style={{ marginLeft: '20px' }}>
              {index !== 0 && ( // Ensure that this block is not rendered for span 1 (index 0)
                <div>
                  <h3>Pier {index + 1}</h3>
                  <textarea
                    placeholder={`Enter notes for Pier ${index + 1}`}
                    value={span.pierNotes || ''}
                    onChange={(e) => handleNoteChange(e, index, 'pierNotes')}
                    style={{ width: '300px', height: '100px' }}
                  />
                  <PhotoUpload
                    photos={span.pierPhotos}
                    setPhotos={(photos) => {
                      const updatedSpans = [...spans];
                      updatedSpans[index].pierPhotos = photos;
                      setSpans(updatedSpans);
                    }}
                    label="Pier"
                  />
                </div>
              )}

              {index === 0 && (
                <div>
                  <h3>Abutment 1</h3>
                  <textarea
                    placeholder="Enter notes for Abutment 1"
                    value={span.abutment1Notes || ''}
                    onChange={(e) => handleNoteChange(e, index, 'abutment1Notes')}
                    style={{ width: '300px', height: '100px' }}
                  />
                  <PhotoUpload photos={span.abutment1Photos} setPhotos={(photos) => {
                    const updatedSpans = [...spans];
                    updatedSpans[index].abutment1Photos = photos;
                    setSpans(updatedSpans);
                  }} label="Abutment 1" />
                </div>
              )}

              {index === spans.length - 1 && (
                <div>
                  <h3>Abutment 2</h3>
                  <textarea
                    placeholder="Enter notes for Abutment 2"
                    value={span.abutment2Notes || ''}
                    onChange={(e) => handleNoteChange(e, index, 'abutment2Notes')}
                    style={{ width: '300px', height: '100px' }}
                  />
                  <PhotoUpload photos={span.abutment2Photos} setPhotos={(photos) => {
                    const updatedSpans = [...spans];
                    updatedSpans[index].abutment2Photos = photos;
                    setSpans(updatedSpans);
                  }} label="Abutment 2" />
                </div>
              )}

                <div>
                  <h3>Girders</h3>

                  {span.girders && span.girders.map((girder, girderIndex) => (
                    <div key={girder.id} style={{ marginLeft: '20px' }}>
                      <input
                        type="text"
                        value={girder.name}
                        onChange={(e) => handleGirderNameChange(e, index, girderIndex)} // Change girder name here
                        placeholder="Girder Name"
                        style={{ width: '150px', marginRight: '10px' }}
                      />
                      <h4>{girder.name}</h4>
                      <textarea
                        placeholder={`Enter notes for ${girder.name}`}
                        value={girder.notes || ''}
                        onChange={(e) => handleGirderNoteChange(e, index, girderIndex)}
                        style={{ width: '300px', height: '100px' }}
                      />
                      <button type="button" onClick={() => removeGirder(index, girderIndex)}>Remove Girder</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addGirder(index)}>Add Girder</button>
                </div>
                    {/* Photo upload for all girders */}
                    <PhotoUpload photos={span.girderPhotos} setPhotos={(photos) => {
                    const updatedSpans = [...spans];
                    updatedSpans[index].girderPhotos = photos;
                    setSpans(updatedSpans);
                  }} label="Girder" />

              <div>
                <h3>Deck Slab</h3>
                <textarea
                  placeholder="Enter notes for Deck Slab"
                  value={span.deckSlabNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'deckSlabNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
                <PhotoUpload photos={span.deckSlabPhotos} setPhotos={(photos) => {
                  const updatedSpans = [...spans];
                  updatedSpans[index].deckSlabPhotos = photos;
                  setSpans(updatedSpans);
                }} label="Deck Slab" />
              </div>

              <div>
                <h3>Pier Cap</h3>
                <textarea
                  placeholder="Enter notes for Pier Cap"
                  value={span.pierCapNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'pierCapNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
                <PhotoUpload photos={span.pierCapPhotos} setPhotos={(photos) => {
                  const updatedSpans = [...spans];
                  updatedSpans[index].pierCapPhotos = photos;
                  setSpans(updatedSpans);
                }} label="Pier Cap" />
              </div>

              <div>
                <h3>Bearing Pedestal</h3>
                <textarea
                  placeholder="Enter notes for Bearing Pedestal"
                  value={span.bearingPedestalNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'bearingPedestalNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
                <PhotoUpload photos={span.bearingPedestalPhotos} setPhotos={(photos) => {
                  const updatedSpans = [...spans];
                  updatedSpans[index].bearingPedestalPhotos = photos;
                  setSpans(updatedSpans);
                }} label="Bearing Pedestal" />
              </div>

              <div>
                <h3>Expansion Joint</h3>
                <textarea
                  placeholder="Enter notes for Expansion Joint"
                  value={span.expansionJointNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'expansionJointNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
                <PhotoUpload photos={span.expansionJointPhotos} setPhotos={(photos) => {
                  const updatedSpans = [...spans];
                  updatedSpans[index].expansionJointPhotos = photos;
                  setSpans(updatedSpans);
                }} label="Expansion Joint" />
              </div>

              <div>
                <h3>Railing</h3>
                <textarea
                  placeholder="Enter notes for Railing"
                  value={span.railingNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'railingNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
                <PhotoUpload photos={span.railingPhotos} setPhotos={(photos) => {
                  const updatedSpans = [...spans];
                  updatedSpans[index].railingPhotos = photos;
                  setSpans(updatedSpans);
                }} label="Railing" />
              </div>

              <div>
                <h3>Custom Components</h3>
                {span.subComponents && span.subComponents.map((subComponent, subComponentIndex) => (
                  <div key={subComponent.id} style={{ marginLeft: '20px' }}>
                    <input
                      type="text"
                      placeholder="Custom Component Name"
                      value={subComponent.name}
                      onChange={(e) => handleSubComponentNoteChange(e, index, subComponentIndex)}
                      style={{ width: '200px', marginRight: '10px' }}
                    />
                    <textarea
                      placeholder={`Notes for ${subComponent.name}`}
                      value={subComponent.notes || ''}
                      onChange={(e) => handleSubComponentNoteChange(e, index, subComponentIndex)}
                      style={{ width: '300px', height: '100px' }}
                    />
                    <PhotoUpload photos={subComponent.photos} setPhotos={(photos) => {
                      const updatedSpans = [...spans];
                      updatedSpans[index].subComponents[subComponentIndex].photos = photos;
                      setSpans(updatedSpans);
                    }} label={subComponent.name} />
                    <button type="button" onClick={() => removeSubComponent(index, subComponentIndex)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => addSubComponent(index, prompt('Enter custom component name:'))}>Add Custom Component</button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default VisualInspection;
