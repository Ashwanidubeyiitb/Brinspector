import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './ProjectInfoForm.css';

const ProjectInfoForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    consultantName: '',
    inspectionDate: '',
    popularName: '',
    riverName: '',
    bridgeType: '',
    location: '',
    yearOfConstruction: '',
    totalLength: '',
    width: '',
    spans: '',
  });
  
  const navigate = useNavigate();
  const { id } = useParams(); // Get project ID from URL if editing
  const [isEditing, setIsEditing] = useState(false);
  
  // Check if user is logged in and load project data if editing
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // If editing an existing project, load its data
    if (id) {
      setIsEditing(true);
      const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectToEdit = savedProjects.find(project => project.id === id);
      
      if (projectToEdit) {
        setFormData(projectToEdit);
      } else {
        // Project not found, redirect to projects page
        navigate('/projects');
      }
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (isEditing) {
      // Update existing project
      const updatedProjects = existingProjects.map(project => 
        project.id === id ? { ...formData, id } : project
      );
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    } else {
      // Create new project with unique ID
      const newProject = {
        ...formData,
        id: Date.now().toString(), // Simple unique ID
        createdAt: new Date().toISOString()
      };
      
      // Add to projects array
      const updatedProjects = [...existingProjects, newProject];
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      // Also store in projectInfo for compatibility with existing code
      localStorage.setItem('projectInfo', JSON.stringify(newProject));
    }
    
    // Navigate based on context
    if (isEditing) {
      navigate('/projects');
    } else {
      navigate('/ImageUpload');
    }
  };

  return (
    <div className="project-form-container">
      <header className="project-form-header">
        <div className="logo">
          <Link to="/">
            <img src="/images/BRInspector.jpg" alt="BRInspector Logo" />
          </Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
          </ul>
        </nav>
      </header>
      
      <main className="project-form-main">
        <div className="form-container">
          <h2>{isEditing ? 'Edit Project Information' : 'New Project Information'}</h2>
          
          <form onSubmit={handleSubmit} className="project-info-form">
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="projectName">Project Name:</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="clientName">Name of the Client:</label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="consultantName">Name of Consultant:</label>
                <input
                  type="text"
                  id="consultantName"
                  name="consultantName"
                  value={formData.consultantName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="inspectionDate">Date of Inspection:</label>
                <input
                  type="date"
                  id="inspectionDate"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3>Bridge Details</h3>
              
              <div className="form-group">
                <label htmlFor="popularName">Popular Name (if any):</label>
                <input
                  type="text"
                  id="popularName"
                  name="popularName"
                  value={formData.popularName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="riverName">Name of River/NH No.:</label>
                <input
                  type="text"
                  id="riverName"
                  name="riverName"
                  value={formData.riverName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bridgeType">Bridge Type:</label>
                <select
                  id="bridgeType"
                  name="bridgeType"
                  value={formData.bridgeType}
                  onChange={handleChange}
                >
                  <option value="">Select Bridge Type</option>
                  <option value="RCC">RCC Bridge</option>
                  <option value="Steel">Steel Bridge</option>
                  <option value="Composite">Composite Bridge</option>
                  <option value="Arch">Arch Bridge</option>
                  <option value="Suspension">Suspension Bridge</option>
                  <option value="Cable-stayed">Cable-stayed Bridge</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="yearOfConstruction">Year of Construction:</label>
                  <input
                    type="text"
                    id="yearOfConstruction"
                    name="yearOfConstruction"
                    value={formData.yearOfConstruction}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="spans">Number of Spans:</label>
                  <input
                    type="text"
                    id="spans"
                    name="spans"
                    value={formData.spans}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="totalLength">Total Length (m):</label>
                  <input
                    type="text"
                    id="totalLength"
                    name="totalLength"
                    value={formData.totalLength}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="width">Width (m):</label>
                  <input
                    type="text"
                    id="width"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/projects')}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {isEditing ? 'Update Project' : 'Save & Continue'}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="project-form-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/BRInspector.jpg" alt="BRInspector Logo" />
            <img src="/images/CRRI.png" alt="CRRI Logo" />
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} BRInspector. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectInfoForm;