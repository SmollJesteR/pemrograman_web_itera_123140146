class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(255, 128, 163, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .logo {
          color: #ff1a55;
          font-weight: bold;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          color: #4a5568;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        a:hover {
          color: #ff1a55;
        }
        .active {
          color: #ff1a55;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            padding: 1rem;
          }
          ul {
            margin-top: 1rem;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      </style>
      <nav>
        <div class="logo">
          <i data-feather="heart"></i>
          <span>Pinky Promise</span>
        </div>
      </nav>
    `;
  }
}
customElements.define("custom-navbar", CustomNavbar);
