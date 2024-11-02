// components/Footer.js
import React from 'react';
import './Footer.css'; // You can create this CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Your App Name. All rights reserved.</p>
      <p>
        <a href="/privacy-policy">Privacy Policy</a> | 
        <a href="/terms-of-service"> Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
