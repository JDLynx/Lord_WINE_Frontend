import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">

        <a
          href="https://web.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="social-link"
        >
          <i className="fab fa-whatsapp"></i>
        </a>

        <a
          href="https://www.facebook.com/lordrobert.colombia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="social-link"
        >
          <i className="fab fa-facebook"></i>
        </a>

        <a
          href="https://www.instagram.com/lordwine.cop/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-link"
        >
          <i className="fab fa-instagram"></i>
        </a>

        <a
          href="mailto:lordwineoficial@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Gmail"
          className="social-link"
        >
          <i className="far fa-envelope"></i>
        </a>

      </div>

      <p className="copyright">© 2024 Lord WINE. Todos los derechos reservados.</p>
      
    </footer>
  );
}

export default Footer;