import React from 'react';

function Footer() {
  return (
    <footer className="bottom-footer">
      <div className="footer-left">
        <p>
          © CopyRight All Rights Reserved by <strong>Aditya University</strong>
          <span className="powered">
            Powered By{' '}
            <a href="https://maya.technicalhub.io/" target="_blank" rel="noreferrer">
              <img src="/Thub_logo.png" alt="Technical Hub" className="th-logo" />
            </a>
          </span>
        </p>
      </div>

      <div className="footer-right">
        <div className="social-icons">
          <a href="https://www.linkedin.com/school/adityauniversity/" target="_blank" rel="noreferrer" className="footer-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://wa.me/919989776661" target="_blank" rel="noreferrer" className="footer-icon">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://x.com/adityauniv" target="_blank" rel="noreferrer" className="footer-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/aditya_university/" target="_blank" rel="noreferrer" className="footer-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/@adityauniversity" target="_blank" rel="noreferrer" className="footer-icon">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.facebook.com/adityauniversity9" target="_blank" rel="noreferrer" className="footer-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
