import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="financial-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="brand-section">
            <h3 className="footer-logo">TASC</h3>
            <p className="footer-description">
              Empowering financial literacy through cutting-edge education tools, 
              market insights, and interactive learning experiences. 
              Master your financial future with our curated resources.
            </p>
          </div>

          <div className="contact-section">
            <h4 className="section-title">Connect With Me</h4>
            <ul className="contact-links">
              <li>
                <a href="mailto:your-email@example.com">Email</a>
              </li>
              <li>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/harsh-bhardwaj-8006072a7?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bpw9%2FirVCTwK9qOFheVubUw%3D%3D" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} TASC . All rights reserved.
          </div>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
