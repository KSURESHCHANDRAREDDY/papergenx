import Header from "../components/Header";

function About() {
  return (
    <div style={{ backgroundColor: "#ede7d0ff", minHeight: "100vh" }}>
      <Header />

      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="fw-bold text-dark mb-3">About AI PaperGenX</h1>
            <p className="lead text-muted" style={{ lineHeight: "1.8" }}>
              PaperGenX is an advanced AI-powered tool designed to simplify
              question paper creation for educators. With just a few clicks, it
              generates professional, well-structured papers that save time and
              maintain academic quality.
            </p>
            <p className="text-muted">
              Our mission is to combine AI intelligence with intuitive design
              — so teachers can focus on teaching, not paperwork.
            </p>
          </div>

          <div className="col-md-6 text-center">
            <div
              className="p-5 bg-dark text-white rounded-4 shadow"
              style={{ minHeight: "250px" }}
            >
              <h4 className="fw-bold mb-3">Technologies We Use</h4>
              <div className="d-flex flex-wrap justify-content-center gap-4 fs-5">
                <div>
                  <i className="bi bi-lightning-charge-fill text-info me-2"></i> React.js
                </div>
                <div>
                  <i className="bi bi-terminal text-success me-2"></i> Node.js
                </div>
                <div>
                  <i className="bi bi-database me-2 text-warning"></i> MongoDB
                </div>
                <div>
                  <i className="bi bi-bootstrap-fill me-2 text-primary"></i> Bootstrap
                </div>
              </div>
              <p className="mt-4 text-light opacity-75 small">
                The backend integrates Google’s Gemini AI for intelligent paper generation, 
                while the frontend is crafted with React for a seamless experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <hr className="my-5 border-dark opacity-25" />
      </div>

      {/* Features Section */}
      <section className="container pb-5">
        <div className="row align-items-stretch g-4">
          <div className="col-md-6">
            <div className="p-5 bg-dark text-white rounded-4 shadow-sm h-100">
              <h3 className="fw-bold mb-4">Key Features</h3>
              <ul className="list-unstyled fs-6 lh-lg opacity-90">
                <li>⚡ AI-driven question generation</li>
                <li>📄 One-click professional PDF export</li>
                <li>🎯 Customizable difficulty and format</li>
                <li>🔒 Secure authentication & user data</li>
                <li>🧩 Seamless responsive UI design</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-5 bg-white rounded-4 shadow-sm h-100">
              <h3 className="fw-bold text-dark mb-4">About the Developer</h3>
              <p className="text-muted mb-2">
                <strong>👨‍💻 K Suresh Chandra Reddy</strong>
              </p>
              <p className="text-muted mb-3">
                Passionate full-stack developer focused on building meaningful,
                scalable web apps that combine strong backend logic with a clean
                and intuitive UI.
              </p>

              <div className="d-flex align-items-center gap-3 mt-3">
                <a
                  href="https://www.linkedin.com/in/kodurusureshchandrareddy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fs-4"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://github.com/KSURESHCHANDRAREDDY"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fs-4"
                >
                  <i className="bi bi-github"></i>
                </a>
              </div>

              <div className="mt-4">
                <p className="text-muted small mb-1">
                  📍 India | 💼 Available to Work
                </p>
                <p className="text-muted small">
                  © {new Date().getFullYear()} PaperGenX — Built with ❤️ by
                  K Suresh Chandra Reddy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
