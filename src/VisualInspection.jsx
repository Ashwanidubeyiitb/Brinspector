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
      }))
    );
  };

  const toggleSubComponents = (index) => {
    const updatedSpans = [...spans];
    updatedSpans[index].isOpen = !updatedSpans[index].isOpen;
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

  const handlePhotoUpload = (e, spanIndex) => {
    const updatedSpans = [...spans];
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    updatedSpans[spanIndex].photos.push(...files);
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
          <h2>
            Span {index + 1}
            <button type="button" onClick={() => toggleSubComponents(index)}>
              {span.isOpen ? '-' : '+'}
            </button>
          </h2>

          {span.isOpen && (
            <div style={{ marginLeft: '20px' }}>
              <div>
                <h3>Pier {index + 1}</h3>
                <textarea
                  placeholder={`Enter notes for Pier ${index + 1}`}
                  value={span.pierNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'pierNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
              </div>

              {index === 0 && (
                <div>
                  <h3>Abutment 1</h3>
                  <textarea
                    placeholder="Enter notes for Abutment 1"
                    value={span.abutment1Notes || ''}
                    onChange={(e) => handleNoteChange(e, index, 'abutment1Notes')}
                    style={{ width: '300px', height: '100px' }}
                  />
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
                </div>
              )}

              <div>
                <h3>Girders</h3>
                {span.girders.map((girder, girderIndex) => (
                  <div key={girder.id} style={{ marginLeft: '20px' }}>
                    <input
                      type="text"
                      value={girder.name}
                      onChange={(e) => handleGirderNameChange(e, index, girderIndex)} // Change girder name here
                      placeholder={`Girder Name`}
                      style={{ width: '150px', marginRight: '10px' }}
                    />
                    <h4>{girder.name}</h4>
                    <textarea
                      placeholder={`Enter notes for ${girder.name}`}
                      value={girder.notes || ''}
                      onChange={(e) =>
                        handleGirderNoteChange(e, index, girderIndex)
                      }
                      style={{ width: '300px', height: '100px' }}
                    />
                    {span.girders.length > 1 && (
                      <button type="button" onClick={() => removeGirder(index, girderIndex)}>
                        Remove {girder.name}
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addGirder(index)}>Add Girder</button>
              </div>

              <div>
                <h3>Deck Slab</h3>
                <textarea
                  placeholder="Enter notes for Deck Slab"
                  value={span.deckSlabNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'deckSlabNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
              </div>

              <div>
                <h3>Pier Cap</h3>
                <textarea
                  placeholder="Enter notes for Pier Cap"
                  value={span.pierCapNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'pierCapNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
              </div>

              <div>
                <h3>Bearing Pedestal</h3>
                <textarea
                  placeholder="Enter notes for Bearing Pedestal"
                  value={span.bearingPedestalNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'bearingPedestalNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
              </div>

              <div>
                <h3>Expansion Joint</h3>
                <textarea
                  placeholder="Enter notes for Expansion Joint"
                  value={span.expansionJointNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'expansionJointNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
              </div>

              <div>
                <h3>Railing</h3>
                <textarea
                  placeholder="Enter notes for Railing"
                  value={span.railingNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'railingNotes')}
                  style={{ width: '300px', height: '100px' }}
                />
              </div>

              <div>
                <h3>Upload Photos</h3>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, index)}
                />
                <div>
                  {span.photos.length > 0 && (
                    <h5>Uploaded Photos:</h5>
                  )}
                  {span.photos.map((photo, i) => (
                    <img key={i} src={photo} alt={`Span ${index} Photo ${i}`} style={{ width: '100px', height: 'auto' }} />
                  ))}
                </div>
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
