import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-sedondary sticky-top shadowNavbar">
      <a className="navbar-brand mt=0" href="/">
        <img
          src={require(`../../assets/meetout1.png`)}
          width={120}
          height={50}
          alt="Logo"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link text-uppercase" to="/">
              home&nbsp;<i className="fas fa-home"></i>{" "}
              <span className="sr-only">(current)</span>
            </Link>
          </li>

          <li className="nav-item">
            <NavDropdown title="SERVICES" id="basic-nav-dropdown">
              <NavDropdown.Item href="/service?service=groupTraining">
                Group Training
              </NavDropdown.Item>
              <NavDropdown.Item href="/service?service=groupRun">
                Group Run
              </NavDropdown.Item>
              <NavDropdown.Item href="/service?service=meditation">
                Meditation
              </NavDropdown.Item>
              <NavDropdown.Item href="/service?service=soccer">
                Soccer
              </NavDropdown.Item>
              <NavDropdown.Item href="/service?service=Outdoor Yoga">
                Outdoor Yoga
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/service?service=all">
                All Services
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-uppercase" to="/serviceform">
              Service Form
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-uppercase" to="/covid19live">
              Covid19Live
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-uppercase" to="/aboutus">
              About Us
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-uppercase" to="/profile">
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <button
              className="btn my-2 my-sm-0"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
