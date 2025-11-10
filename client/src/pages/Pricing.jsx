import Header from "../components/Header";

function Pricing() {
  return (
    <div style={{ backgroundColor: "#ede7d0ff", minHeight: "100vh" }}>
      <Header />

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-dark">Our Pricing Plans</h2>
        <p className="text-center text-muted mb-5">
          Simple and transparent plans to suit teachers, tutors, and institutions.
        </p>

        <div className="row justify-content-center">
          {/* Free Plan */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
              <div className="card-body text-center p-4">
                <h4 className="fw-bold mb-2 text-dark">Free Plan</h4>
                <h3 className="fw-bold mb-3">₹0</h3>
                <p className="text-muted">Try AI PaperGen with basic access</p>
                <ul className="list-unstyled my-4 text-start small text-secondary">
                  <li>✅ 3 question papers per month</li>
                  <li>✅ Basic AI question formatting</li>
                  <li>❌ No advanced layout options</li>
                </ul>
                <button className="btn btn-outline-dark rounded-pill px-4">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="col-md-4 mb-4">
            <div
              className="card border-0 shadow-lg rounded-4 h-100 text-white"
              style={{ backgroundColor: "#000" }}
            >
              <div className="card-body text-center p-4">
                <h4 className="fw-bold mb-2 text-white">Pro Plan</h4>
                <h3 className="fw-bold mb-3">₹499 / month</h3>
                <p className="text-light opacity-75">
                  For teachers and small institutions
                </p>
                <ul className="list-unstyled my-4 text-start small">
                  <li>✅ Unlimited paper generation</li>
                  <li>✅ Professional PDF downloads</li>
                  <li>✅ Advanced AI layout formatting</li>
                  <li>✅ Priority support</li>
                </ul>
                <button
                  className="btn btn-light rounded-pill px-4 fw-semibold"
                  style={{ color: "#000" }}
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
              <div className="card-body text-center p-4">
                <h4 className="fw-bold mb-2 text-dark">Enterprise Plan</h4>
                <h3 className="fw-bold mb-3">Custom</h3>
                <p className="text-muted">
                  Tailored for schools and coaching institutes
                </p>
                <ul className="list-unstyled my-4 text-start small text-secondary">
                  <li>✅ Multi-user management</li>
                  <li>✅ Custom branding and logo</li>
                  <li>✅ Dedicated account support</li>
                  <li>✅ Admin control panel</li>
                </ul>
                <button className="btn btn-dark rounded-pill px-4">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p className="text-muted small">
            All prices include applicable taxes. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
