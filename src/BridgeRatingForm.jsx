import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bridgeData from './componentsData.json'; // Assume this is your JSON file for the bridge structure

const BridgeRatingForm = () => {
  const navigate = useNavigate();
  
  // Initialize state with bridge data
  const [formData, setFormData] = useState(bridgeData);

  // Track expanded states for components and sub-components
  const [expandedComponents, setExpandedComponents] = useState({});
  const [expandedSubComponents, setExpandedSubComponents] = useState({});

  // Toggle visibility of component sections
  const toggleComponentExpand = (componentIndex) => {
    setExpandedComponents(prevState => ({
      ...prevState,
      [componentIndex]: !prevState[componentIndex]
    }));
  };

  // Toggle visibility of sub-component input sections
  const toggleSubComponentExpand = (componentIndex, subComponentIndex) => {
    setExpandedSubComponents(prevState => ({
      ...prevState,
      [`${componentIndex}-${subComponentIndex}`]: !prevState[`${componentIndex}-${subComponentIndex}`]
    }));
  };

  // Get min and max limits for distress types
  const getDistressLimits = (distressType) => {
    switch (distressType) {
      case "Erosion":
        return { min: 0, max: 100 }; // Erosion allowed between 0 and 100
      case "Abrasion":
        return { min: 0, max: 100 };
      case "Scour":
        return { min: 0, max: 2.0 };
      case "Vegetation":
        return { min: 0, max: 100 };
      case "Deformations (deflection/tilt)":
        return { min: 0, max: 100 };
      case "Honeycombing":
        return { min: 0, max: 100 };
      case "Delamination":
        return { min: 0, max: 100 };
      case "Spalling":
        return { min: 0, max: 100 };
      case "Staining/Scaling/Leaching":
        return { min: 0, max: 100 };
      case "Rust":
        return { min: 0, max: 100 };
      case "Cracking (width)":
        return { min: 0, max: 5 };
      case "Exposed Reinforcement":
        return { min: 0, max: 100 };
      case "Corrosion (depth of pitting excluded)":
        return { min: 0, max: 2 };
      case "Reduction in Area of Reinforcement":
        return { min: 0, max: 100 };
      case "Section Loss":
        return { min: 0, max: 100 };
      case "Efflorescence":
        return { min: 0, max: 100 };
      case "Crushing":
        return { min: 0, max: 100 };
      case "Rutting":
        return { min: 0, max: 100 };
      case "Unevenness":
        return { min: 0, max: 100 };
      case "Degradation (wear and tear)":
        return { min: 0, max: 100 };
      case "Missing Elements":
        return { min: 0, max: 20 };
      case "Leaning/Bulging":
        return { min: 0, max: 50 };
      case "Pot Holes":
        return { min: 0, max: 10 };
      case "Loose Joints":
        return { min: 0, max: 10 };
      case "Undesired Restraints":
        return { min: 0, max: 10 };
      case "Marine Borers":
        return { min: 0, max: 100 };
      case "Inadequate Drainage":
        return { min: 0, max: 10 };
      case "Silting":
        return { min: 0, max: 100 };
      default:
        return { min: 0, max: 100 }; // Default for undefined distress types
    }
  };

  // Handle input changes for distress values
  const handleInputChange = (componentIndex, subComponentIndex, distressIndex, value) => {
    const newFormData = { ...formData };
    newFormData.components[componentIndex].subComponents[subComponentIndex].distressTypes[distressIndex].value = value;
    setFormData(newFormData);
  };

  // Calculate the Bridge Health Index (BHI) based on the condition states
  const calculateBHI = (data) => {
    let totalBHI = 0;
    let totalWeight = 0;
  
    // Predefined weights for each component
    const componentWeights = {
      Approaches: 3.6,
      Substructure: 18,
      "Waterway/channel": 5.8,
      Foundations: 32.7,
      Superstructure: 21.7,
      "Appurtenances/Auxiliary works": 4.1,
      Bearings: 14,
    };
  
    // Function to get Sk based on the condition state
    const getSkFromConditionState = (conditionState) => {
      switch (conditionState) {
        case 1: return 0.0;  // Excellent
        case 2: return 0.25; // Good
        case 3: return 0.50; // Fair
        case 4: return 0.75; // Poor
        case 5: return 1.0;  // Critical
        default: return 0.0; // Default to excellent if undefined
      }
    };
  
    // Iterate over each component
    data.components.forEach((component) => {
      let totalComponentCondition = 0;
      let totalComponentWeight = 0;
  
      // Iterate over each sub-component
      component.subComponents.forEach((subComponent) => {
        let totalSubCondition = 0;
        let numDistressTypes = subComponent.distressTypes.length;
  
        // Iterate over distress types within sub-components
        subComponent.distressTypes.forEach((distress) => {
          const distressValue = distress.value || 0; // Default to no distress
          const conditionState = getConditionStateFromInput(distress.label, distressValue); // Get condition state
          const Sk = getSkFromConditionState(conditionState); // Get Sk for the condition state
  
          // Calculate Sk-based contribution to CSj
          totalSubCondition += (100 - 100 * Sk);
        });
  
        // Calculate CSj for the sub-component
        const CSj = totalSubCondition / numDistressTypes;
  
        // Sum up the weighted CSj for the component (multiply by sub-component weight)
        totalComponentCondition += subComponent.weight * CSj;
        totalComponentWeight += subComponent.weight;
      });
  
      // Calculate CIi for the component
      const CIi = totalComponentCondition / totalComponentWeight || 1;
  
      // Add to overall Bridge Health Index (BHI) calculation using component weights
      const componentWeight = componentWeights[component.label] || 1;
      totalBHI += componentWeight * CIi;
      totalWeight += componentWeight;
    });
  
    // Final BHI for the bridge
    const BHI = totalBHI / totalWeight || 1;
    return BHI;
  };

  // Determine the condition state based on the distress type and input value
  const getConditionStateFromInput = (distressType, value) => {
    switch (distressType) {
      case "Erosion":
        return value > 30 ? 5 : value > 20 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      case "Abrasion":
        return value > 50 ? 5 : value > 40 ? 4 : value > 20 ? 3 : value >= 10 ? 2 : 1;
      case "Scour":
        return value > 1.0 ? 5 : value > 0.5 ? 4 : value > 0.25 ? 3 : value > 0 ? 2 : 1;
      case "Vegetation":
        return value > 75 ? 5 : value > 50 ? 4 : value > 25 ? 3 : value >= 10 ? 2 : 1;
      case "Deformations (deflection/tilt)":
        return value > 50 ? 5 : value > 25 ? 4 : value > 10 ? 3 : value > 5 ? 2 : 1;
      case "Honeycombing":
        return value > 25 ? 5 : value > 15 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Delamination":
        return value > 25 ? 5 : value > 15 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Spalling":
        return value > 20 ? 5 : value > 10 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Staining/Scaling/Leaching":
        return value > 50 ? 5 : value > 25 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      case "Rust":
        return value > 25 ? 5 : value > 10 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Cracking (width)":
        return value > 2 ? 5 : value > 1.0 ? 4 : value > 0.3 ? 3 : value > 0 ? 2 : 1;
      case "Exposed Reinforcement":
        return value > 15 ? 5 : value > 10 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Corrosion (depth of pitting excluded)":
        return value > 1.0 ? 5 : value > 0.5 ? 4 : value > 0.3 ? 3 : value > 0.1 ? 2 : 1;
      case "Reduction in Area of Reinforcement":
        return value > 20 ? 5 : value > 10 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Section Loss":
        return value > 25 ? 5 : value > 15 ? 4 : value > 10 ? 3 : value > 5 ? 2 : 1;
      case "Efflorescence":
        return value > 50 ? 5 : value > 25 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      case "Crushing":
        return value > 10 ? 5 : value > 5 ? 4 : value > 0 ? 3 : 1;
      case "Rutting":
        return value > 50 ? 5 : value > 25 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      case "Unevenness":
        return value > 25 ? 5 : value > 15 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Degradation (wear and tear)":
        return value > 50 ? 5 : value > 20 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      case "Missing Elements":
        return value > 10 ? 5 : value > 8 ? 4 : value > 5 ? 3 : value > 2 ? 2 : 1;
      case "Leaning/Bulging":
        return value > 25 ? 5 : value > 15 ? 4 : value > 5 ? 3 : value > 0 ? 2 : 1;
      case "Pot Holes":
        return value > 8 ? 5 : value > 5 ? 4 : value > 2 ? 3 : value > 0 ? 2 : 1;
      case "Loose Joints":
        return value > 8 ? 5 : value > 5 ? 4 : value > 2 ? 3 : value > 0 ? 2 : 1;
      case "Undesired Restraints":
        return value > 3 ? 5 : value > 2 ? 4 : value > 1 ? 3 : value > 0 ? 2 : 1;
      case "Marine Borers":
        return value > 50 ? 5 : value > 25 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      case "Inadequate Drainage":
        return value > 8 ? 5 : value > 5 ? 4 : value > 3 ? 3 : value > 0 ? 2 : 1;
      case "Silting":
        return value > 50 ? 5 : value > 25 ? 4 : value > 10 ? 3 : value > 0 ? 2 : 1;
      default:
        return 1; // Default to condition state 1 if no distress type match
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate Bridge Health Index (BHI)
    const BHI = calculateBHI(formData);

    // Store the calculated BHI and form data into localStorage
    const ratingsData = { ...formData, BHI };
    localStorage.setItem('bridgeratingReport', JSON.stringify(ratingsData));

    // Navigate to the report page
    navigate('/report');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Bridge Rating System</h1>

      {/* Iterate over each component */}
      {formData.components.map((component, componentIndex) => (
  <div key={component.value} style={{ paddingLeft: "20px" }}>
    <h2 style={{ display: 'inline-block' }}>
      {component.label}
    </h2>
    <button
      type="button"
      onClick={() => toggleComponentExpand(componentIndex)}
      style={{

        alignSelf: 'flex-end',
        right: '0',          // Aligns the button to the right
        bottom: '0',         // Aligns the button at the bottom of the header (subscript effect)
        fontSize: '0.8em',   // Subscript effect by reducing font size
        marginLeft: '10px',
      }}
    >
      {expandedComponents[componentIndex] ? '-' : '+'}
    </button>

          {/* Show sub-components if the component is expanded */}
          {expandedComponents[componentIndex] && (
            <div style={{ paddingLeft: '10px' }}>
              {/* Iterate over each sub-component */}
              {component.subComponents.map((subComponent, subComponentIndex) => (
                <div key={subComponent.value} style={{ marginBottom: '10px', position: "relative" }}>
                  <h3>
                    {subComponent.label}
                    <button
                      type="button"
                      onClick={() => toggleSubComponentExpand(componentIndex, subComponentIndex)}
                      style={{

                        alignSelf: 'flex-end',
                        right: '0',          // Aligns the button to the right
                        bottom: '0',         // Aligns the button at the bottom of the header (subscript effect)
                        fontSize: '0.7em',   // Subscript effect by reducing font size
                        marginLeft: '10px',
                      }}
                
                    >
                      {expandedSubComponents[`${componentIndex}-${subComponentIndex}`] ? '-' : '+'}
                    </button>
                  </h3>

                  {/* Show input fields only if sub-component is expanded */}
                  {expandedSubComponents[`${componentIndex}-${subComponentIndex}`] && (
                    <div style={{ paddingLeft: '20px' }}>
                      {subComponent.distressTypes.map((distress, distressIndex) => {
                        const { min, max } = getDistressLimits(distress.label); // Get min and max limits for each distress type
                        return (
                          <div key={distress.label} style={{ marginBottom: '10px' }}>
                            <label>
                              {distress.label} ({distress.unit}):{' '}
                              <input
                                type="number"
                                min={min}
                                max={max}
                                value={distress.value || ''}
                                onChange={(e) =>
                                  handleInputChange(componentIndex, subComponentIndex, distressIndex, e.target.value)
                                }
                                placeholder={`Enter value (${min}-${max})`}
                                style={{
                                  width: '150px', // Increased width for better usability
                                  padding: '5px',  // Padding for better appearance
                                  marginLeft: '10px', // Space between label and input    
                                }}                  
                              />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button type="submit">Generate Report</button>
    </form>
  );
};

export default BridgeRatingForm;