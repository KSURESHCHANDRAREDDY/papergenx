
function Footer() {
  return (
    <footer
      className="text-light py-4"
      style={{ backgroundColor: "#1a1a1a", borderTop: "2px solid #333" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start">
        
        {/* Left Section */}
        <div className="mb-3 mb-md-0">
          <h5 className="fw-bold mb-2" style={{ color: "#f0ebebff" }}>
            PaperGen<span style={{ color: "#a1a1a1ff" }}>X</span>
          </h5>
          <p className="mb-1 small">
            Built by <strong>K Suresh Chandra Reddy</strong> © 2025
          </p>
        </div>

        {/* Middle Section */}
        <div className="text-center mb-3 mb-md-0 align-self-center">
          <a href="/" className="text-light text-decoration-none mx-3">Home</a>
          <a href="/genpaper" className="text-light text-decoration-none mx-3">GenPaper</a>
          <a href="/pricing" className="text-light text-decoration-none mx-3">Pricing</a>
          <a href="/about" className="text-light text-decoration-none mx-3">About</a>
        </div>

        {/* Right Section */}
        <div className="text-md-end">
          <div className="mb-2">
            <a
              href="https://github.com/KSURESHCHANDRAREDDY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light fs-5 me-3"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light fs-5"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>

          <a href="/privacy" className="text-light text-decoration-none d-block">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
