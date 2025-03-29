import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
    
    // Load projects from localStorage
    const loadProjects = () => {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    };
    
    loadProjects();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  // Delete a project
  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }
  };

  return (
    <div className="projects-container">
      {/* Header */}
      <header className="projects-header">
        <div className="logo">
          <img src="/images/BRInspector.jpg" alt="BRInspector Logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects" className="active">Projects</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="projects-main">
        <div className="projects-header-actions">
          <h1>My Projects</h1>
          <Link to="/project-info" className="create-project-btn">Create New Project</Link>
        </div>

        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-info">
                  <h3>{project.projectName}</h3>
                  <p><strong>Client:</strong> {project.clientName}</p>
                  <p><strong>Date:</strong> {project.inspectionDate}</p>
                  {project.bridgeType && (
                    <p><strong>Bridge Type:</strong> {project.bridgeType}</p>
                  )}
                </div>
                <div className="project-actions">
                  <Link to={`/project/${project.id}`} className="view-btn">View</Link>
                  <Link to={`/project-info/${project.id}`} className="edit-btn">Edit</Link>
                  <button 
                    onClick={() => handleDeleteProject(project.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <p>You don't have any projects yet.</p>
            <p>Click "Create New Project" to get started.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="projects-footer">
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

export default ProjectsPage; 