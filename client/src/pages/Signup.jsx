import { useDispatch, useSelector } from "react-redux";
import { setname, setemail, setpassword, setloading } from '../redux/authslice';
import { signup } from "../services/authapi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const { name, email, password, isloading } = useSelector((state) => state.auth);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const handelform = async (event) => {
    event.preventDefault();
    dispatch(setloading(true));
    seterror("");

    const result = await signup({ name, email, password });
    dispatch(setloading(false));

    if (result.status === 200) {
      navigate("/login"); // ✅ go to login after successful signup
    } else if (result.status === 409) {
      seterror("User already exists! Please login.");
    } else {
      seterror("Server Down. Please Try Later!");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center px-3">
      <div className="row shadow-lg w-100" style={{ maxWidth: '1000px' }}>
        {/* Left Column */}
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center text-white p-3"
          style={{ background: "linear-gradient(to right, #FEEFC3, #999900)" }}>
          <div className="w-90 text-center">
            <h2 className="fw-bold mb-3">Welcome To PaperGenX!</h2>
            <p className="text-light mb-4">Generate papers smarter and faster.</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-light p-3">
          <div className="w-100" style={{ maxWidth: '420px' }}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-light w-100 mb-3 d-flex align-items-center justify-content-center border"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" className="me-2">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.156,7.961,3.039l5.657-5.657C33.64,6.053,29.084,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,12,24,12c3.059,0,5.842,1.156,7.961,3.039l5.657-5.657 C33.64,6.053,29.084,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.282-7.946l-6.513,5.02C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.093,5.565 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </button>
            <h2 className="fw-bold text-center mb-1">Create Account</h2>
            <form onSubmit={handelform}>
              <div className="mb-4 text-start">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                  onChange={e => dispatch(setname(e.target.value))}
                />
              </div>

              <div className="mb-4 text-start">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  onChange={e => dispatch(setemail(e.target.value))}
                />
              </div>

              <div className="mb-4 text-start">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  onChange={e => dispatch(setpassword(e.target.value))}
                />
              </div>

              <p className='text-center text-danger'>{error}</p>

              {isloading ? (
                <button className="btn btn-dark w-100 mb-3" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Loading...</span>
                </button>
              ) : (
                <button type="submit" className="btn btn-dark w-100 mb-3">Sign Up</button>
              )}

              <p className="text-center">
                Already have an account?{" "}
                <Link className='text-dark fw-semibold' to={"/login"}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
