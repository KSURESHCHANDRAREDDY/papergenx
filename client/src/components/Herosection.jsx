import { Link } from 'react-router-dom';
import './index.css';

function Herosection() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="position-relative w-95 mx-auto" style={{ maxWidth: '1400px' }}>
        <img
          src="https://img.freepik.com/premium-vector/dark-texture-abstract-background-design_278222-10695.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Dark abstract background"
          className="img-fluid w-100 rounded-4 shadow"
          style={{
            height: '90vh',
            objectFit: 'cover',
            filter: 'brightness(60%)',
          }}
        />

        {/* Text Overlay */}
        <div className="position-absolute top-50 start-50 translate-middle text-center text-light px-3">
          <h1 className="fw-bold display-4 hero-title">
            Create Question Papers in Seconds with AI
          </h1>
          <h6 className="fst-normal mt-3 hero-subtitle" style={{ fontSize: '1.1rem' }}>
            Save hours of manual work — generate balanced, high-quality exam papers instantly with 
            <span className="fw-semibold text-primary"> PaperGenX</span>.
          </h6>
          <Link to="/genpaper" className="btn  btn-lg mt-4 rounded-pill px-4 hero-cta" style={{ background: "linear-gradient(to right, #FEEFC3, \t #999900)" }}>
            Get Started <i className="bi bi-arrow-right-circle ms-2"></i>
          </Link>
        </div>
        <style>{`
          @media (max-width: 576px) {
            .hero-title { font-size: 1.75rem; }
            .hero-subtitle { font-size: 0.95rem !important; }
            .hero-cta { padding: 0.5rem 1rem !important; font-size: 0.95rem; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Herosection;
