import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from 'react';
import { logout } from "../redux/authslice";
import axios from "axios";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await axios.post(`${API}/logout`, {}, { withCredentials: true });
    dispatch(logout());
  };

  return (
    <header className="shadow-sm" style={{ backgroundColor: "#ede7d0ff" }}>
      <nav className="navbar navbar-expand-lg px-3" ref={dropdownRef}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-dark m-0 text-decoration-none">
            <h3 className="text-dark m-0">PaperGen<span className="text-muted">X</span></h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4 fw-semibold">
              {isAuthenticated && (
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <div className="d-flex align-items-center bg-light px-2 py-1 rounded-3 shadow-sm" style={{ gap: '6px' }}>
                    <i className="bi bi-lightning-charge-fill text-warning fs-5"></i>
                    <span className="fw-semibold text-dark">{user?.freeCount}</span>
                    <small className="text-muted">free</small>
                  </div>
                </li>
              )}

              <li className="nav-item"><Link to="/" className="nav-link text-dark">Home</Link></li>
              <li className="nav-item"><Link to="/genpaper" className="nav-link text-dark">GenPaper</Link></li>
              <li className="nav-item"><Link to="/pricing" className="nav-link text-dark">Pricing</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-link text-dark">About</Link></li>

              <li className="nav-item dropdown position-static">
                {isAuthenticated ? (
                  <>
                    <i
                      className="bi bi-person-circle fs-3 ms-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowDropdown(!showDropdown)}
                    ></i>

                    <div
                      className={`custom-dropdown position-absolute end-0 mt-2 p-3 bg-light shadow rounded-3 ${showDropdown ? 'show' : ''}`}
                      style={{ minWidth: '180px', zIndex: 1050 }}
                    >
                      <p className="mb-2 fw-semibold text-center">{user?.name}</p>
                      <p className="text-muted small text-center mb-2">{user?.email}</p>
                      <hr className="my-2" />
                      <button className="btn btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
                    </div>
                  </>
                ) : (
                  <Link to="/login" className="btn btn-dark ms-lg-2">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        .custom-dropdown {
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .custom-dropdown.show {
          opacity: 1;
          transform: translateY(8px);
          pointer-events: auto;
        }
        .navbar-toggler {
          border-color: rgba(0,0,0,.1);
        }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.7)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
      `}</style>
    </header>
  );
}

export default Header;
