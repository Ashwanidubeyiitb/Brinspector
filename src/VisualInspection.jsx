import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VisualInspection = () => {
  const [spans, setSpans] = useState([]);
  const [newSubComponentName, setNewSubComponentName] = useState('');
  const getSpanName = (spanNumber, totalSpans) => {
    if (totalSpans === 1) {
      return 'Span A1-A2';
    } else if (spanNumber === 1) {
      return 'Span A1-P1';
    } else if (spanNumber === totalSpans) {
      return `Span P${spanNumber - 1}-A2`;
    } else {
      return `Span P${spanNumber - 1}-P${spanNumber}`;
    }
  };
  
  const toggleSpan = (spanNumber) => {
    setSpans((prevSpans) =>
      prevSpans.map((span) =>
        span.spanNumber === spanNumber
          ? { ...span, isExpanded: !span.isExpanded }
          : span
      )
    );
  };

  // Initialize spans with subcomponents
  const initializeSpans = (numberOfSpans) => {
    const newSpans = [];
    for (let i = 1; i <= numberOfSpans; i++) {
      newSpans.push({
        spanNumber: i,
        subComponents: [
          ...(i === 1 ? [{ name: 'Abutment 1', notes: '', photos: [] }] : []),
          ...(i === 1 ? [{ name: 'Abutment Cap 1', notes: '', photos: [] }] : []),
          ...(i === numberOfSpans ? [] : [{ name: `Pier ${i}`, notes: '', photos: [] }]),
          ...(i === numberOfSpans ? [] : [{ name: `Pier Cap`, notes: '', photos: [] }]),
          { name: 'Pedestal', notes: '', photos: [] },
          { name: 'Bearing', notes: '', photos: [] },
          { name: 'Girders', girders: [], notes: '' },
          { name: 'Cross Girders', girders: [], notes: '' },
          { name: `Deck Slab`, notes: '', photos: [] },
          { name: 'Railing', notes: '', photos: [] }, // Railing
          ...(i === numberOfSpans ? [{ name: 'Abutment 2', notes: '', photos: [] }] : []),
          ...(i === numberOfSpans ? [{ name: 'Abutment Cap 2', notes: '', photos: [] }] : []),
        ],
      });
    }
    setSpans(newSpans);
  };

  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate('/bridgeratingform');
  };

  // Function to add a new girder
  const addGirder = (spanNumber, componentName) => {
    setSpans((prevSpans) =>
    prevSpans.map((span) =>
      span.spanNumber === spanNumber
        ? {
            ...span,
            subComponents: span.subComponents.map((subComp) =>
              subComp.name === componentName
                ? {
                    ...subComp,
                    girders: [
                      ...subComp.girders,
                      {
                        name: componentName === 'Girders'
                          ? `Girder ${subComp.girders.length + 1}`
                          : componentName === 'Cross Girders'
                          ? `Cross Girder ${subComp.girders.length + 1}`
                          : '',
                        photos: [],
                      },
                    ],
                  }
                : subComp
            ),
          }
        : span
    ));
    };
  
  // Function to add a new subcomponent
  const addSubComponent = (spanNumber) => {
    if (!newSubComponentName) return; // Prevent empty names
    setSpans((prevSpans) =>
        prevSpans.map((span) =>
            span.spanNumber === spanNumber
                ? {
                    ...span,
                    subComponents: [
                        ...span.subComponents,
                        { name: newSubComponentName, notes: '', photos: [], isUserAdded: true }, // Mark as user added
                    ],
                }
                : span
        )
    );
    setNewSubComponentName(''); // Clear input field after adding
};

  // Function to add a photo
  const addPhoto = (spanNumber, subComponentName, girderIndex, photo) => {
    setSpans((prevSpans) =>
      prevSpans.map((span) =>
        span.spanNumber === spanNumber
          ? {
              ...span,
              subComponents: span.subComponents.map((subComp) => {
                if (subComp.name === subComponentName) {
                  if (subComp.name === 'Girders' || subComp.name === 'Cross Girders') {
                    // Handle adding photo to specific girder or cross girder
                    if (girderIndex !== undefined) {
                      return {
                        ...subComp,
                        girders: subComp.girders.map((girder, index) =>
                          index === girderIndex
                            ? {
                                ...girder,
                                photos: [
                                  ...girder.photos,
                                  { image: URL.createObjectURL(photo), caption: '' },
                                ],
                              }
                            : girder
                        ),
                      };
                    }
                  } else {
                    // Handle adding photo to subcomponent
                    return {
                      ...subComp,
                      photos: [
                        ...subComp.photos,
                        { image: URL.createObjectURL(photo), caption: '' },
                      ],
                    };
                  }
                }
                return subComp;
              }),
            }
          : span
      )
    );
  };  

  // Function to remove a photo
  const removePhoto = (spanNumber, subComponentName, girderIndex, photoIndex) => {
  setSpans((prevSpans) =>
    prevSpans.map((span) =>
      span.spanNumber === spanNumber
        ? {
            ...span,
            subComponents: span.subComponents.map((subComp) => {
              if (subComp.name === subComponentName) {
                if (subComp.name === 'Girders' || subComp.name === 'Cross Girders') {
                  // Handle removing photo from specific girder or cross girder
                  if (girderIndex !== undefined) {
                    return {
                      ...subComp,
                      girders: subComp.girders.map((girder, index) =>
                        index === girderIndex
                          ? {
                              ...girder,
                              photos: girder.photos.filter((_, idx) => idx !== photoIndex),
                            }
                          : girder
                      ),
                    };
                  }
                } else {
                  // Handle removing photo from subcomponent
                  return {
                    ...subComp,
                    photos: subComp.photos.filter((_, idx) => idx !== photoIndex),
                  };
                }
              }
              return subComp;
            }),
          }
        : span
      )
    );
  };

  // Function to remove a subcomponent
  const removeSubComponent = (spanNumber, subComponentName) => {
    setSpans((prevSpans) =>
        prevSpans.map((span) =>
            span.spanNumber === spanNumber
                ? {
                    ...span,
                    subComponents: span.subComponents.filter((subComp) => subComp.name !== subComponentName),
                }
                : span
        )
    );
  };

  // Function to update caption for a photo
  const updateCaption = (spanNumber, subComponentName, girderIndex, photoIndex, caption) => {
    setSpans((prevSpans) =>
      prevSpans.map((span) =>
        span.spanNumber === spanNumber
          ? {
              ...span,
              subComponents: span.subComponents.map((subComp) => {
                if (subComp.name === subComponentName) {
                  if (subComp.name === 'Girders' && girderIndex !== undefined) {
                    // Update caption for specific girder
                    return {
                      ...subComp,
                      girders: subComp.girders.map((girder, index) =>
                        index === girderIndex
                          ? {
                              ...girder,
                              photos: girder.photos.map((photo, index) =>
                                index === photoIndex ? { ...photo, caption } : photo
                              ),
                            }
                          : girder
                      ),
                    };
                  } else {
                    // Update caption for subcomponent
                    return {
                      ...subComp,
                      photos: subComp.photos.map((photo, index) =>
                        index === photoIndex ? { ...photo, caption } : photo
                      ),
                    };
                  }
                }
                return subComp;
              }),
            }
          : span
      )
    );
  };

  // Function to update notes for a subcomponent
  const updateNotes = (spanNumber, subComponentName, notes) => {
    setSpans((prevSpans) =>
      prevSpans.map((span) =>
        span.spanNumber === spanNumber
          ? {
              ...span,
              subComponents: span.subComponents.map((subComp) =>
                subComp.name === subComponentName ? { ...subComp, notes } : subComp
              ),
            }
          : span
      )
    );
  };

  
  return (
    <div>
      <h1>Visual Inspection</h1>
      <label>
        Enter Number of Spans:
        <input
          type="number"
          onChange={(e) => {
            const numSpans = parseInt(e.target.value) || 0;
            if (numSpans <= 100) {
              initializeSpans(numSpans);
            } else {
              alert("Maximum number of spans is 100.");
            }
          }}
          max="100"
        />
      </label>
      <div>
        {spans.map((span) => (
          <div key={span.spanNumber} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>
            {getSpanName(span.spanNumber, spans.length)}
              <button onClick={() => toggleSpan(span.spanNumber)} style={{ marginLeft: '10px' }}>
                {span.isExpanded ? '-' : '+'}
              </button>
            </h3>
            {span.isExpanded && (
              <div>
                {span.subComponents.map((subComp, subCompIndex) => (
                  <div key={subCompIndex}>
<h4>{subComp.name}</h4>
<textarea
  value={subComp.notes}
  placeholder={`Enter notes for ${subComp.name}`}
  onChange={(e) => updateNotes(span.spanNumber, subComp.name, e.target.value)}
  style={{ width: '100%', marginBottom: '10px' }}
/>

{/* Logic for Girders */}
{subComp.name === 'Girders' && (
  <>
    <button onClick={() => addGirder(span.spanNumber, 'Girders')}>
      Add Girder
    </button>
    {subComp.girders && subComp.girders.map((girder, girderIndex) => (
      <div key={girderIndex}>
        <h5>{girder.name}</h5>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            Array.from(e.target.files).forEach((file) =>
              addPhoto(span.spanNumber, 'Girders', girderIndex, file)
            )
          }
        />
        {girder.photos && girder.photos.map((photo, photoIndex) => (
          <div key={photoIndex} style={{ marginTop: '10px' }}>
            <img
              src={photo.image}
              alt={`Photo ${photoIndex}`}
              style={{ maxWidth: '100px', marginRight: '10px' }}
            />
            <input
              type="text"
              placeholder="Caption"
              value={photo.caption}
              onChange={(e) =>
                updateCaption(span.spanNumber, 'Girders', girderIndex, photoIndex, e.target.value)
              }
            />
            <button onClick={() => removePhoto(span.spanNumber, 'Girders', girderIndex, photoIndex)}>
              Remove Photo
            </button>
          </div>
        ))}
      </div>
    ))}
  </>
)}

{/* Logic for Cross Girders */}
{subComp.name === 'Cross Girders' && (
  <>
    <button onClick={() => addGirder(span.spanNumber, 'Cross Girders')}>
      Add Cross Girder
    </button>
    {subComp.girders && subComp.girders.map((crossGirder, crossGirderIndex) => (
      <div key={crossGirderIndex}>
        <h5>{crossGirder.name}</h5>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            Array.from(e.target.files).forEach((file) =>
              addPhoto(span.spanNumber, 'Cross Girders', crossGirderIndex, file)
            )
          }
        />
        {crossGirder.photos && crossGirder.photos.map((photo, photoIndex) => (
          <div key={photoIndex} style={{ marginTop: '10px' }}>
            <img
              src={photo.image}
              alt={`Photo ${photoIndex}`}
              style={{ maxWidth: '100px', marginRight: '10px' }}
            />
            <input
              type="text"
              placeholder="Caption"
              value={photo.caption}
              onChange={(e) =>
                updateCaption(span.spanNumber, 'Cross Girders', crossGirderIndex, photoIndex, e.target.value)
              }
            />
            <button onClick={() => removePhoto(span.spanNumber, 'Cross Girders', crossGirderIndex, photoIndex)}>
              Remove Photo
            </button>
          </div>
        ))}
      </div>
    ))}
  </>
)}

{/* Logic for other subcomponents */}
{!(subComp.name === 'Girders' || subComp.name === 'Cross Girders') && (
  <>
    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        Array.from(e.target.files).forEach((file) =>
          addPhoto(span.spanNumber, subComp.name, undefined, file)
        )
      }
    />
    {subComp.photos && subComp.photos.map((photo, photoIndex) => (
      <div key={photoIndex} style={{ marginTop: '10px' }}>
        <img
          src={photo.image}
          alt={`Photo ${photoIndex}`}
          style={{ maxWidth: '100px', marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Caption"
          value={photo.caption}
          onChange={(e) =>
            updateCaption(span.spanNumber, subComp.name, undefined, photoIndex, e.target.value)
          }
        />
        <button onClick={() => removePhoto(span.spanNumber, subComp.name, undefined, photoIndex)}>
          Remove Photo
        </button>
      </div>
    ))}
  </>
)}

                    {subComp.isUserAdded && (
                      <button onClick={() => removeSubComponent(span.spanNumber, subComp.name)}>
                        Remove Subcomponent
                      </button>
                    )}
                  </div>
                ))}
                <input
                  type="text"
                  value={newSubComponentName}
                  onChange={(e) => setNewSubComponentName(e.target.value)}
                  placeholder="Add new component"
                />
                <button onClick={() => addSubComponent(span.spanNumber)}>+ Component</button>
              </div>
            )}
          </div>
        ))}
        <div>
        <button onClick={handleNextClick}>Next</button>
        </div>

      </div>
    </div>
  );
  
};

export default VisualInspection;
