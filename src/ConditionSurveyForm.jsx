import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formData from './ConditionData';

const ConditionSurveyForm = () => {
  const initialState = {};
  const navigate = useNavigate();

  // Function to recursively set initial state for nested fields
  const setInitialState = (fields, category) => {
    fields.forEach((field) => {
      if (field.fields) {
        // Nested fields, set them recursively
        setInitialState(field.fields, category);
      } else {
        if (!initialState[category]) {
          initialState[category] = {};
        }
        initialState[category][field.label] = field.type === 'boolean' ? false : '';
      }
    });
  };

  formData.forEach((category) => {
    setInitialState(category.fields, category.category);
  });

  const [formState, setFormState] = useState(initialState);
  const [expandedCategories, setExpandedCategories] = useState({}); // Track expanded categories

  // Handle input changes
  const handleChange = (e, category, label) => {
    const { value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [label]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  // Toggle the expanded state of a category
  const toggleCategory = (category) => {
    setExpandedCategories((prevExpanded) => ({
      ...prevExpanded,
      [category]: !prevExpanded[category], // Toggle the state
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formState);
    localStorage.setItem('surveydata', JSON.stringify(formState));
    navigate('/VisualInspection');
  };

  // Recursive component to render fields
  const renderFields = (fields, category) => {
    return fields.map((field, index) => {
      if (field.fields) {
        // If the field has nested fields, render them recursively
        return (
          <div
            key={field.label + index}
            style={{
              marginLeft: '20px',
              borderLeft: '2px solid #ccc',
              paddingLeft: '10px',
              marginBottom: '10px',
            }}
          >
            <h4>{field.label}</h4>
            {renderFields(field.fields, category)}
          </div>
        );
      }

      return (
        <div key={field.label} style={{ marginBottom: '10px' }}>
          <label htmlFor={field.label} style={{ display: 'block', marginBottom: '5px' }}>
            {field.label}
          </label>
          {field.type === 'text' && (
            <input
              type="text"
              id={field.label}
              name={field.name}
              value={formState[category][field.label]}
              onChange={(e) => handleChange(e, category, field.label)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>PROFORMA FOR CONDITION SURVEY OF BRIDGE</h1>
      <form onSubmit={handleSubmit}>
        {formData.map((category, idx) => (
          <div key={category.category + idx} style={{ marginBottom: '30px' }}>
            <div style={{ display: 'inline-block', marginBottom: '5px' }}>
              <h3 style={{ display: 'inline', marginRight: '5px' }}>{category.category}</h3>
              <button
                type="button"
                onClick={() => toggleCategory(category.category)}
                style={{
                  alignSelf: 'flex-end',
                        right: '0',          
                        bottom: '0',         
                        fontSize: '0.7em',   
                        marginLeft: '10px',
                }}
              >
                {expandedCategories[category.category] ? '-' : '+'}
              </button>
            </div>
            {expandedCategories[category.category] && (
              <div style={{ marginTop: '10px' }}>
                {renderFields(category.fields, category.category)}
              </div>
            )}
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConditionSurveyForm;



