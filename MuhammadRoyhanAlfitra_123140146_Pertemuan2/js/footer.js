class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: white;
          color: #4a5568;
          padding: 2rem;
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid #ffccde;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .social-links a {
          color: #ff1a55;
          transition: opacity 0.2s;
        }
        .social-links a:hover {
          opacity: 0.8;
        }
        .copyright {
          font-size: 0.875rem;
          color: #718096;
        }
        @media (max-width: 768px) {
          footer {
            padding: 1.5rem;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="social-links">
            <a href="#"><i data-feather="instagram"></i></a>
            <a href="#"><i data-feather="twitter"></i></a>
            <a href="#"><i data-feather="linkedin"></i></a>
            <a href="#"><i data-feather="github"></i></a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} Pinky Promise Dashboard. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);