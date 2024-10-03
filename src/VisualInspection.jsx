import React, { useState } from 'react';

const VisualInspection = () => {
  const [numSpans, setNumSpans] = useState('');
  const [spans, setSpans] = useState([]);

  const handleSpanChange = (e) => {
    const spansCount = Math.min(e.target.value, 500); // Limit to 500 spans
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
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file)); // Display image as preview
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

  return (
    <div>
      <h1>Visual Inspection</h1>
      <label>
        Enter Number of Spans (up to 500):
        <input
          type="number"
          value={numSpans || ''} // Empty string when falsy
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
            <button onClick={() => toggleSubComponents(index)}>
              {span.isOpen ? '-' : '+'}
            </button>
          </h2>

          {span.isOpen && (
            <div style={{ marginLeft: '20px' }}>
              {/* Pier */}
              <div>
                <h3>Pier {index + 1}</h3>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder={`Enter notes for Pier ${index + 1}`}
                  value={span.pierNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'pierNotes')}
                />
              </div>

              {/* Abutment 1 for first span */}
              {index === 0 && (
                <div>
                  <h3>Abutment 1</h3>
                  <textarea
                    rows={4}
                    cols={50}
                    placeholder="Enter notes for Abutment 1"
                    value={span.abutment1Notes || ''}
                    onChange={(e) => handleNoteChange(e, index, 'abutment1Notes')}
                  />
                </div>
              )}

              {/* Abutment 2 for last span */}
              {index === spans.length - 1 && (
                <div>
                  <h3>Abutment 2</h3>
                  <textarea
                    rows={4}
                    cols={50}
                    placeholder="Enter notes for Abutment 2"
                    value={span.abutment2Notes || ''}
                    onChange={(e) => handleNoteChange(e, index, 'abutment2Notes')}
                  />
                </div>
              )}

              {/* Girders Section */}
              <div>
                <h3>Girders</h3>
                {span.girders.map((girder, girderIndex) => (
                  <div key={girder.id} style={{ marginLeft: '20px' }}>
                    <h4>
                      <input
                        type="text"
                        value={girder.name}
                        onChange={(e) =>
                          handleGirderNameChange(e, index, girderIndex)
                        }
                        placeholder={`Girder Name`}
                      />
                    </h4>
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder={`Enter notes for ${girder.name}`}
                      value={girder.notes || ''}
                      onChange={(e) =>
                        handleGirderNoteChange(e, index, girderIndex)
                      }
                    />
                    {span.girders.length > 1 && (
                      <button onClick={() => removeGirder(index, girderIndex)}>
                        Remove {girder.name}
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addGirder(index)}>Add Girder</button>
              </div>

              {/* Deck Slab */}
              <div>
                <h3>Deck Slab</h3>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter notes for Deck Slab"
                  value={span.deckSlabNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'deckSlabNotes')}
                />
              </div>

              {/* Pier Cap */}
              <div>
                <h3>Pier Cap</h3>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter notes for Pier Cap"
                  value={span.pierCapNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'pierCapNotes')}
                />
              </div>

              {/* Bearing Pedestal */}
              <div>
                <h3>Bearing Pedestal</h3>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter notes for Bearing Pedestal"
                  value={span.bearingPedestalNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'bearingPedestalNotes')}
                />
              </div>

              {/* Expansion Joint */}
              <div>
                <h3>Expansion Joint</h3>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter notes for Expansion Joint"
                  value={span.expansionJointNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'expansionJointNotes')}
                />
              </div>

              {/* Railing */}
              <div>
                <h3>Railing</h3>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter notes for Railing"
                  value={span.railingNotes || ''}
                  onChange={(e) => handleNoteChange(e, index, 'railingNotes')}
                />
              </div>

              {/* Upload Photos */}
              <div>
                <h4>Upload Photos</h4>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, index)}
                />
                <div>
                  {span.photos.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {span.photos.map((photo, i) => (
                        <div key={i} style={{ margin: '10px' }}>
                          <img
                            src={photo}
                            alt={`Span ${index + 1} photo ${i + 1}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                          <textarea
                            rows={2}
                            cols={30}
                            placeholder="Enter notes for this photo"
                            value={span[`photo${i}Notes`] || ''}
                            onChange={(e) =>
                              handleNoteChange(e, index, `photo${i}Notes`)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VisualInspection;
