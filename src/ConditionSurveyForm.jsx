import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Sample JSON data (You can import this from a separate JSON file if preferred)
const formData = [
  {
    category: 'STRUCTURE DATA',
    fields: [
      { label: 'Road Width (m)', name: 'roadWidth', type: 'text' },
      { label: 'Overall Deck Width (m)', name: 'deckWidth', type: 'text' },
      { label: 'Approach Roadway Width Including Shoulder (m)', name: 'approachWidth', type: 'text' },
      { label: 'Height of Approach Embankment', name: 'embankmentHeight', type: 'text' },
      { label: 'Average Skew', name: 'averageSkew', type: 'text' },
      { label: 'Whether Navigable', name: 'navigable', type: 'text' },
      { label: 'Horizontal Clearance', name: 'horizontalClearance', type: 'text' },
      { label: 'Vertical Clearance', name: 'verticalClearance', type: 'text' },
    ],
  },
  {
    category: 'GENERAL',
    fields: [
      { label: 'Corrosion Protection Measures', name: 'corrosionProtection', type: 'text' },
      { label: 'Bank Protection & Type', name: 'bankProtection', type: 'text' },
      { label: 'Floor Protection & Type', name: 'floorProtection', type: 'text' },
      { label: 'Bridge Located in Back Water/Chemical Affected Water Body', name: 'chemicalAffectedWater', type: 'text' },
    ],
  },
  {
    category: 'APPROACHES',
    fields: [
      { label: 'Type of Approach', name: 'approachType', type: 'text' },
      { label: 'Material of Approach', name: 'approachMaterial', type: 'text' },
      { label: 'Approach Geometrics', name: 'approachGeometrics', type: 'text' },
      { label: 'Approaches Span Details', name: 'approachSpanDetails', type: 'text' },
      { label: 'Pavement Surface Condition', name: 'pavementSurface', type: 'text' },
      { label: 'Side Slopes Condition', name: 'sideSlopes', type: 'text' },
      { label: 'Erosion of Embankment', name: 'erosionEmbankment', type: 'text' },
      { label: 'Approach Slab Condition', name: 'approachSlab', type: 'text' },
      { label: 'Retaining Walls Type', name: 'retainingWallsType', type: 'text' },
      { label: 'Retaining Walls Condition', name: 'retainingWallsCondition', type: 'text' },
      { label: 'Silt and Debris', name: 'siltDebris', type: 'text' },
    ],
  },
  {
    category: 'PROTECTION WORKS',
    fields: [
      { label: 'Type', name: 'protectionWorksType', type: 'text' },
      { label: 'Layout and Cross Section Profile', name: 'layoutCrossSection', type: 'text' },
      { label: 'Slope Pitching, Apron, and Toe Walls', name: 'slopePitching', type: 'text' },
      { label: 'Floor Protection Works', name: 'floorProtectionWorks', type: 'text' },
      { label: 'Scour', name: 'scour', type: 'text' },
      { label: 'Reserve Store Material', name: 'reserveStoreMaterial', type: 'text' },
    ],
  },
  {
    category: 'WATERWAY',
    fields: [
      { label: 'Presence of Obstruction in Flow', name: 'flowObstruction', type: 'text' },
      { label: 'Flow Pattern', name: 'flowPattern', type: 'text' },
      { label: 'Maximum Flood Level Observed', name: 'maxFloodLevel', type: 'text' },
      { label: 'Afflux from U/s and D/s', name: 'afflux', type: 'text' },
      { label: 'Erosion of Bank', name: 'erosionBank', type: 'text' },
    ],
  },
  {
    category: 'FOUNDATION',
    fields: [
      { label: 'Foundation Type', name: 'foundationType', type: 'text' },
      { label: 'Foundation Material', name: 'foundationMaterial', type: 'text' },
      { label: 'Foundation Condition', name: 'foundationCondition', type: 'text' },
      { label: 'Impact Damage from Floating Bodies', name: 'impactDamage', type: 'text' },
      { label: 'Seepage and Vehicle Impact Condition', name: 'seepageImpact', type: 'text' },
      { label: 'Cracking and Erosion Condition', name: 'crackingErosion', type: 'text' },
    ],
  },
  {
    category: 'SUBSTRUCTURE',
    fields: [
      {
        label: 'Abutment',
        fields: [
          { label: 'Type', name: 'abutmentType', type: 'text' },
          { label: 'Material', name: 'abutmentMaterial', type: 'text' },
          { label: 'Condition', name: 'abutmentCondition', type: 'text' },
          { label: 'Efficiency of Drainage', name: 'drainageEfficiency', type: 'text' },
          { label: 'Maximum Depth of Foundation', name: 'maxAbutmentDepth', type: 'text' },
          { label: 'Abutment Width', name: 'abutmentWidth', type: 'text' },
          { label: 'Abutment Thickness', name: 'abutmentThickness', type: 'text' },
        ],
      },
      {
        label: 'Pier',
        fields: [
          { label: 'Type', name: 'pierType', type: 'text' },
          { label: 'Material', name: 'pierMaterial', type: 'text' },
          { label: 'Condition', name: 'pierCondition', type: 'text' },
          { label: 'Maximum Depth of Foundation', name: 'maxPierDepth', type: 'text' },
          { label: 'Pier Width', name: 'pierWidth', type: 'text' },
          { label: 'Pier Thickness', name: 'pierThickness', type: 'text' },
        ],
      },
    ],
  },
  {
    category: 'SUBWAYS',
    fields: [
      { label: 'Condition of Side Retaining Wall', name: 'sideWallCondition', type: 'text' },
      { label: 'Large Excavations Nearby', name: 'excavationCondition', type: 'text' },
      { label: 'Damages to Protective Measures', name: 'protectiveDamages', type: 'text' },
      { label: 'Damages to Protective Coating', name: 'protectiveCoatingDamages', type: 'text' },
    ],
  },
  {
    category: 'BEARING & PEDESTAL',
    fields: [
      { label: 'No. per Abutment', name: 'numAbutment', type: 'text' },
      { label: 'No. per Pier', name: 'numPier', type: 'text' },
      { label: 'Type', name: 'bearingType', type: 'text' },
      { label: 'Material', name: 'bearingMaterial', type: 'text' },
      { label: 'General Condition', name: 'bearingCondition', type: 'text' },
      { label: 'Functioning Condition', name: 'functioningCondition', type: 'text' },
      { label: 'Condition of Pads', name: 'padsCondition', type: 'text' },
      { label: 'General Cleanliness', name: 'generalCleanliness', type: 'text' },
      { label: 'Signs of Distress', name: 'distressSigns', type: 'text' },
      { label: 'Loss of Shape Condition', name: 'lossOfShape', type: 'text' },
      { label: 'Cracks in Supporting Members', name: 'supportingCracks', type: 'text' },
      { label: 'Condition of D/s Stoppers', name: 'downstreamStoppers', type: 'text' },
    ],
  },
  {
    category: 'SUPERSTRUCTURE',
    fields: [
      { label: 'Total number of Spans & Arrangement', name: 'totalSpansArrangement', type: 'text' },
      { label: 'Type of Span (T-beam, slab/box girder etc.)', name: 'typeOfSpan', type: 'text' },
      { label: 'Structural System (Simply supported/continuous etc.)', name: 'structuralSystem', type: 'text' },
      { label: 'Type of Material (RCC/PSC/Steel/Timber/Masonry etc.)', name: 'typeOfMaterial', type: 'text' },
      { label: 'Check Spalling disintegration or honey combing', name: 'spallingCheck', type: 'text' },
      { label: 'Check cracks (Pattern, location)', name: 'crackCheck', type: 'text' },
      { label: 'Check exposed reinforcement', name: 'exposedReinforcementCheck', type: 'text' },
      { label: 'Check wear of deck surface', name: 'deckSurfaceWear', type: 'text' },
      { label: 'Check scaling', name: 'scalingCheck', type: 'text' },
      { label: 'Check surface stains and rust stains', name: 'surfaceStainsCheck', type: 'text' },
      { label: 'Check leaching', name: 'leachingCheck', type: 'text' },
      { label: 'Check corrosion of reinforcements, sheathing and tendon', name: 'corrosionCheck', type: 'text' },
      { label: 'Check leakage', name: 'leakageCheck', type: 'text' },
      { label: 'Check damages due to moving vehicle', name: 'vehicleDamageCheck', type: 'text' },
      { label: 'Check condition of articulation', name: 'articulationCondition', type: 'text' },
      { label: 'Check excessive vibrations', name: 'vibrationCheck', type: 'text' },
      { label: 'Check excessive deflections (sag) or loss of camber', name: 'deflectionCheck', type: 'text' },
      { label: 'Check cracks around anchorage zone for prestressed concrete', name: 'anchorageCrackCheck', type: 'text' },
      { label: 'Check excessive deflection at central hinge, tip of cantilever', name: 'cantileverDeflectionCheck', type: 'text' },
      { label: 'Check box girders for signs of cracking', name: 'boxGirderCheck', type: 'text' },
      { label: 'Check accumulation of silt and debris on surface of deck', name: 'debrisAccumulationCheck', type: 'text' },
      { label: 'Check peeling off of protective coat or paint', name: 'protectiveCoatCheck', type: 'text' },
      { label: 'Check steel members', name: 'steelMembersCheck', type: 'text' },
      { label: 'Check condition of protective system', name: 'protectiveSystemCondition', type: 'text' },
      { label: 'Check corrosion', name: 'corrosionCheck2', type: 'text' },
      { label: 'Check excessive vibrations (again)', name: 'vibrationCheck2', type: 'text' },
      { label: 'Check alignment of members', name: 'alignmentCheck', type: 'text' },
      { label: 'Check condition for Steel Superstructure', name: 'steelSuperstructureCondition', type: 'text' },
      { label: 'Check excessive loss of camber', name: 'camberLossCheck', type: 'text' },
      { label: 'Check buckling, kinking, warping and waviness', name: 'bucklingCheck', type: 'text' },
      { label: 'Check apparent fracture', name: 'fractureCheck', type: 'text' },
      { label: 'Check excessive wear in pins in joints of truss', name: 'excessiveWearCheck', type: 'text' },
      { label: 'Check conditions inside the closed members', name: 'closedMembersCheck', type: 'text' },
      { label: 'Check masonry arches', name: 'masonryArchesCheck', type: 'text' },
      { label: 'Check condition of joints mortar, pointing, masonry', name: 'jointsConditionCheck', type: 'text' },
      { label: 'Check profile, report flattening', name: 'profileCheck', type: 'text' },
      { label: 'Check drainage of spandrel fillings', name: 'spandrelDrainageCheck', type: 'text' },
      { label: 'Check growth of vegetation', name: 'vegetationGrowthCheck', type: 'text' },
      { label: 'Check all cast iron/wrought iron components', name: 'castIronCheck', type: 'text' },
      { label: 'In case of steel bridges (Corrosion/painting/loose rivet joints)', name: 'steelBridgeCheck', type: 'text' },
      { label: 'In case of masonry bridges (Pointing/joints mortar and bulging of spandrel)', name: 'masonryBridgeCheck', type: 'text' },
      { label: 'Vegetation (Yes/No)', name: 'vegetationPresence', type: 'text' },
    ],
  },
  {
    category: 'EXPANSION JOINT',
    fields: [
      { label: 'Type', name: 'type', type: 'text' },
      { label: 'Condition (Misalignment of Joints, Debris, Accumulation etc.)', name: 'condition', type: 'text' },
      { label: 'Functioning (Cracks in wearing course, existence of normal gap, excessive noise, etc.)', name: 'functioning', type: 'text' },
      { label: 'Sealing material (check for splitting, oxidation, creep, flattening, bulging)', name: 'sealingMaterial', type: 'text' },
      { label: 'Check secureness of the joints', name: 'jointsSecureness', type: 'text' },
      { label: 'Top sliding plate (check corrosion, damage to welds, etc.)', name: 'topSlidingPlate', type: 'text' },
      { label: 'Locking of joints (especially for finger type expansion joints)', name: 'lockingOfJoints', type: 'text' },
      { label: 'Check for debris in joints', name: 'debrisInJoints', type: 'text' },
      { label: 'Report rattling, if any', name: 'rattlingReport', type: 'text' },
      { label: 'Check drainage from expansion joint', name: 'drainageFromJoint', type: 'text' },
      { label: 'Check alignment and clearance', name: 'alignmentAndClearance', type: 'text' },
    ],
  },
  {
    category: 'WEARING COAT',
    fields: [
      { label: 'Material', name: 'material', type: 'text' },
      { label: 'Surface Condition (Cracks/ potholes/ Bulges, Spalling, disintegration, etc.)', name: 'surfaceCondition', type: 'text' },
      { label: 'Evidence of wear (Telltale rings, check for thickness)', name: 'evidenceOfWear', type: 'text' },
      { label: 'Compare additional thickness with design thickness', name: 'thicknessComparison', type: 'text' },
    ],
  },
  {
    category: 'DRAINAGE SPOUTS AND VEST HOLES',
    fields: [
      { label: 'Check clogging, deterioration and damage', name: 'cloggingCheck', type: 'text' },
      { label: 'Check the projection of the spout on the underside', name: 'spoutProjectionCheck', type: 'text' },
      { label: 'Check adequacies thereof', name: 'adequaciesCheck', type: 'text' },
      { label: 'For subways, report about adequacy of drainage and pumping arrangements', name: 'subwayDrainageCheck', type: 'text' },
      { label: 'For submersible bridges, report on functioning', name: 'submersibleBridgeCheck', type: 'text' },
      { label: 'Report absence of Drainage Spouts', name: 'absenceOfDrainageSpouts', type: 'text' },
      { label: 'Check choking of drainage holes provided in the bottom booms', name: 'drainageHolesCheck', type: 'text' },
    ],
  },
  {
    category: 'HAND RAILS & PARAPETS WALLS',
    fields: [
      { label: 'Check General Condition (Check expansion gaps and missing parts if any)', name: 'generalCondition', type: 'text' },
      { label: 'Check Damage due to collision', name: 'collisionDamage', type: 'text' },
      { label: 'Check alignment (Report any abruptness in profile)', name: 'alignmentCheck', type: 'text' },
    ],
  },
  {
    category: 'FOOT PATHS',
    fields: [
      { label: 'Check general condition (Damage due to mounting of vehicles)', name: 'generalConditionFootPaths', type: 'text' },
      { label: 'Check missing footpath slabs', name: 'missingFootpathSlabs', type: 'text' },
      { label: 'Cleanliness of ducts along footpaths', name: 'cleanlinessDucts', type: 'text' },
    ],
  },
  {
    category: 'UTILITIES',
    fields: [
      { label: 'Check leakage of water and sewage pipes', name: 'waterSewageLeakage', type: 'text' },
      { label: 'Check any damage by telephone and electric cables', name: 'telephoneElectricDamage', type: 'text' },
      { label: 'Check condition of lighting facilities', name: 'lightingCondition', type: 'text' },
      { label: 'Check damages due to any other utilities', name: 'otherUtilitiesDamage', type: 'text' },
    ],
  },
];

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
      <h1>PROFORMA FOR CONDITON SURVEY OF BRIDGE</h1>
      <form onSubmit={handleSubmit}>
        {formData.map((category, idx) => (
          <div key={category.category + idx} style={{ marginBottom: '30px' }}>
            <h3>{category.category}</h3>
            {renderFields(category.fields, category.category)}
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

