import React from "react";
import "./Footer.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="social-link"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-link"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="social-link"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
      <p className="copyright">© 2024 Lord WINE. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;

