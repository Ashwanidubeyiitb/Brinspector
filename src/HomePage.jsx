import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // Function to handle user manual download
  const handleUserManualDownload = () => {
    // Replace with actual PDF file path when available
    const pdfUrl = '/user-manual.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'BRInspector-User-Manual.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/images/BRInspector.jpg" alt="BRInspector Logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><button onClick={handleUserManualDownload} className="manual-btn">User Manual</button></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero-section">
          <h1>Welcome to BRInspector</h1>
          <p>Your comprehensive solution for bridge inspection and management</p>
          <Link to="/login" className="cta-button">Get Started</Link>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Comprehensive Inspections</h3>
              <p>Conduct detailed bridge inspections with our structured assessment forms</p>
            </div>
            <div className="feature-card">
              <h3>Photo Documentation</h3>
              <p>Capture and organize photos of bridge components for thorough documentation</p>
            </div>
            <div className="feature-card">
              <h3>Condition Rating</h3>
              <p>Generate bridge health indices and star ratings based on inspection data</p>
            </div>
            <div className="feature-card">
              <h3>Detailed Reports</h3>
              <p>Create comprehensive inspection reports with all collected data</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>About BRInspector</h2>
          <p>
            BRInspector is a state-of-the-art bridge inspection application developed to streamline 
            the process of bridge condition assessment. Our application helps engineers and inspectors 
            collect, organize, and analyze bridge inspection data efficiently.
          </p>
          <p>
            Developed in collaboration with bridge engineering experts, BRInspector ensures that all 
            critical aspects of bridge inspection are covered, from structural components to safety features.
          </p>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>support@brinspector.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+91 123 456 7890</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>CRRI, Mathura Road, New Delhi - 110025, India</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
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

export default HomePage; 