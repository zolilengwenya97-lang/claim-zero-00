import "./App.css";

import codewrkxLogo from "./assets/codewrkx-logo.png";
import awsLogo from "./assets/aws.png";

function App() {
  return (
    <div className="app">

      <h3 className="bootcamp-title">
        Codewrkx Academy | 03 August 2026 | Johannesburg
      </h3>

      <div className="cards">

        <div className="card">
          <img
            src={codewrkxLogo}
            alt="CodeWrkx Academy"
          />
        </div>

        <div className="card">
          <img
            src={awsLogo}
            alt="AWS"
          />
        </div>

      </div>

      <div className="banner">

        <h1>
          <span>#CLAIM </span>

          <span className="gradient">
            ZERO2
          </span>

        </h1>

      </div>

      <p className="tagline">
        Building the Next Generation of Cloud Engineers.
      </p>

    </div>
  );
}

export default App;