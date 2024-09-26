import React, { useState } from 'react';

const ConditionSurveyForm = ({ nextStep, prevStep, handleFormData }) => {
  const [formData, setFormData] = useState({
    structureData: {
      roadWidth: '',
      overallDeckWidth: '',
      approachRoadwayWidth: '',
      heightOfApproachEmbankment: '',
      averageSkew: '',
      navigable: '',
      horizontalClearance: '',
      verticalClearance: ''
    },
    approaches: {
      typeOfApproach: '',
      materialOfApproach: '',
      approachGeometrics: '',
      spanDetails: '',
      pavementSurface: '',
      sideSlopes: '',
      erosionOfEmbankment: '',
      approachSlab: '',
      retainingWallType: ''
    },
    general: {
      corrosionProtection: '',
      bankProtection: '',
      floorProtection: '',
      backWaterOrChemical: ''
    },
    protectionWorks: {
      type: '',
      layout: '',
      slopePitching: '',
      floorProtectionWorks: '',
      scour: '',
      reserveStoreMaterial: ''
    },
    waterway: {
      obstructionInFlow: '',
      flowPattern: '',
      maxFloodLevel: '',
      afflux: '',
      erosionOfBank: ''
    }
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const submitForm = () => {
    handleFormData(formData);
    nextStep();
  };

  return (
    <div>
      <h2>PROFORMA FOR CONDITION SURVEY OF BRIDGE</h2>
      <h3>Structure Data</h3>
      <label>1. Road Width:</label>
      <input
        type="text"
        value={formData.structureData.roadWidth}
        onChange={(e) => handleChange('structureData', 'roadWidth', e.target.value)}
      />
      <label>2. Overall Deck Width:</label>
      <input
        type="text"
        value={formData.structureData.overallDeckWidth}
        onChange={(e) => handleChange('structureData', 'overallDeckWidth', e.target.value)}
      />
      <label>3. Approach Roadway Width:</label>
      <input
        type="text"
        value={formData.structureData.approachRoadwayWidth}
        onChange={(e) => handleChange('structureData', 'approachRoadwayWidth', e.target.value)}
      />
      <label>4. Height of Approach Embankment:</label>
      <input
        type="text"
        value={formData.structureData.heightOfApproachEmbankment}
        onChange={(e) => handleChange('structureData', 'heightOfApproachEmbankment', e.target.value)}
      />
      <label>5. Average Skew:</label>
      <input
        type="text"
        value={formData.structureData.averageSkew}
        onChange={(e) => handleChange('structureData', 'averageSkew', e.target.value)}
      />
      <label>6. Navigable:</label>
      <select
        value={formData.structureData.navigable}
        onChange={(e) => handleChange('structureData', 'navigable', e.target.value)}
      >
        <option value="">Select</option>
        <option value="Yes Navigable">Yes Navigable</option>
        <option value="No">No</option>
      </select>
      <label>7. Horizontal Clearance:</label>
      <input
        type="text"
        value={formData.structureData.horizontalClearance}
        onChange={(e) => handleChange('structureData', 'horizontalClearance', e.target.value)}
      />
      <label>8. Vertical Clearance:</label>
      <input
        type="text"
        value={formData.structureData.verticalClearance}
        onChange={(e) => handleChange('structureData', 'verticalClearance', e.target.value)}
      />

      {/* General Section */}
      <h3>General</h3>
      <label>1. Corrosion Protection:</label>
      <input
        type="text"
        value={formData.general.corrosionProtection}
        onChange={(e) => handleChange('general', 'corrosionProtection', e.target.value)}
      />
      <label>2. Bank Protection:</label>
      <input
        type="text"
        value={formData.general.bankProtection}
        onChange={(e) => handleChange('general', 'bankProtection', e.target.value)}
      />
      <label>3. Floor Protection:</label>
      <input
        type="text"
        value={formData.general.floorProtection}
        onChange={(e) => handleChange('general', 'floorProtection', e.target.value)}
      />
      <label>4. Back Water or Chemical:</label>
      <input
        type="text"
        value={formData.general.backWaterOrChemical}
        onChange={(e) => handleChange('general', 'backWaterOrChemical', e.target.value)}
      />

      {/* Approaches Section */}
      <h3>Approaches</h3>
      <label>1. Type of Approach:</label>
      <input
        type="text"
        value={formData.approaches.typeOfApproach}
        onChange={(e) => handleChange('approaches', 'typeOfApproach', e.target.value)}
      />
      <label>2. Material of Approach:</label>
      <input
        type="text"
        value={formData.approaches.materialOfApproach}
        onChange={(e) => handleChange('approaches', 'materialOfApproach', e.target.value)}
      />
      <label>3. Approach Geometrics:</label>
      <input
        type="text"
        value={formData.approaches.approachGeometrics}
        onChange={(e) => handleChange('approaches', 'approachGeometrics', e.target.value)}
      />
      <label>4. Span Details:</label>
      <input
        type="text"
        value={formData.approaches.spanDetails}
        onChange={(e) => handleChange('approaches', 'spanDetails', e.target.value)}
      />
      <label>5. Pavement Surface:</label>
      <input
        type="text"
        value={formData.approaches.pavementSurface}
        onChange={(e) => handleChange('approaches', 'pavementSurface', e.target.value)}
      />
      <label>6. Side Slopes:</label>
      <input
        type="text"
        value={formData.approaches.sideSlopes}
        onChange={(e) => handleChange('approaches', 'sideSlopes', e.target.value)}
      />
      <label>7. Erosion of Embankment:</label>
      <input
        type="text"
        value={formData.approaches.erosionOfEmbankment}
        onChange={(e) => handleChange('approaches', 'erosionOfEmbankment', e.target.value)}
      />
      <label>8. Approach Slab:</label>
      <input
        type="text"
        value={formData.approaches.approachSlab}
        onChange={(e) => handleChange('approaches', 'approachSlab', e.target.value)}
      />
      <label>9. Retaining Wall Type:</label>
      <input
        type="text"
        value={formData.approaches.retainingWallType}
        onChange={(e) => handleChange('approaches', 'retainingWallType', e.target.value)}
      />

      {/* Protection Works Section */}
      <h3>Protection Works</h3>
      <label>1. Type:</label>
      <input
        type="text"
        value={formData.protectionWorks.type}
        onChange={(e) => handleChange('protectionWorks', 'type', e.target.value)}
      />
      <label>2. Layout:</label>
      <input
        type="text"
        value={formData.protectionWorks.layout}
        onChange={(e) => handleChange('protectionWorks', 'layout', e.target.value)}
      />
      <label>3. Slope Pitching:</label>
      <input
        type="text"
        value={formData.protectionWorks.slopePitching}
        onChange={(e) => handleChange('protectionWorks', 'slopePitching', e.target.value)}
      />
      <label>4. Floor Protection Works:</label>
      <input
        type="text"
        value={formData.protectionWorks.floorProtectionWorks}
        onChange={(e) => handleChange('protectionWorks', 'floorProtectionWorks', e.target.value)}
      />
      <label>5. Scour:</label>
      <input
        type="text"
        value={formData.protectionWorks.scour}
        onChange={(e) => handleChange('protectionWorks', 'scour', e.target.value)}
      />
      <label>6. Reserve Store Material:</label>
      <input
        type="text"
        value={formData.protectionWorks.reserveStoreMaterial}
        onChange={(e) => handleChange('protectionWorks', 'reserveStoreMaterial', e.target.value)}
      />

      {/* Waterway Section */}
      <h3>Waterway</h3>
      <label>1. Obstruction in Flow:</label>
      <input
        type="text"
        value={formData.waterway.obstructionInFlow}
        onChange={(e) => handleChange('waterway', 'obstructionInFlow', e.target.value)}
      />
      <label>2. Flow Pattern:</label>
      <input
        type="text"
        value={formData.waterway.flowPattern}
        onChange={(e) => handleChange('waterway', 'flowPattern', e.target.value)}
      />
      <label>3. Max Flood Level:</label>
      <input
        type="text"
        value={formData.waterway.maxFloodLevel}
        onChange={(e) => handleChange('waterway', 'maxFloodLevel', e.target.value)}
      />
      <label>4. Afflux:</label>
      <input
        type="text"
        value={formData.waterway.afflux}
        onChange={(e) => handleChange('waterway', 'afflux', e.target.value)}
      />
      <label>5. Erosion of Bank:</label>
      <input
        type="text"
        value={formData.waterway.erosionOfBank}
        onChange={(e) => handleChange('waterway', 'erosionOfBank', e.target.value)}
      />

      {/* Navigation buttons */}
      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm}>Next</button>
    </div>
  );
};

export default ConditionSurveyForm;
