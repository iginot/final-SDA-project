import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Auth from "../../services/Auth";
import Footer from "../layout/Footer";

class LoginPage extends Component {
  async login(loginData) {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
      alert("Invalid credentials");
    }
  }

  async register(registrationData) {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
    window.location.reload();
  }

  render() {
    return (
      <div className="wrapper-login bg-light">
        {/* MODAL TO DISPLAY LOGIN FORM */}
        <div className="modal" id="login">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12">
                  <LoginForm onSubmit={this.login} />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL TO DISPLAY SIGNUP FORM */}
        <div className="modal" id="sign-up">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12 mt-4">
                  <RegisterForm onSubmit={this.register} />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* NAVBAR*/}
        <nav className="navbar navbar-expand-lg navbar-light bg-sedondary shadowNavbar">
          <a className="navbar-brand" href="#">
            <img
              src={require(`../../assets/meetout1.png`)}
              width={120}
              height={50}
              alt="Logo"
            />
          </a>
          {/* NAVBAR TOGGLE BUTTON ON SMALL SCREENS */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <button
                  type="button"
                  className="btn"
                  data-toggle="modal"
                  data-target="#login"
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn"
                  data-toggle="modal"
                  data-target="#sign-up"
                >
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <br />
        <br />
        {/* CAROUSELS */}
        <div className="container mt-2">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={require(`../../assets/landingpagecarousels/bars.jpeg`)}
                  width={1200}
                  height={400}
                  alt="Logo"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1 className="display-3 landingPageHeader" text-secondary>
                    Outdoor Trainings
                  </h1>
                  <p></p>

                  <button
                    type="button"
                    className="btn   btn-lg"
                    data-toggle="modal"
                    data-target="#sign-up"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={require(`../../assets/landingpagecarousels/contrast.jpeg`)}
                  width={1200}
                  height={400}
                  alt="Logo"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1 className="display-3 landingPageHeader" text-secondary>
                    Outdoor Sports
                  </h1>
                  <p></p>

                  <button
                    type="button"
                    className="btn btn-lg"
                    data-toggle="modal"
                    data-target="#sign-up"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src={require(`../../assets/landingpagecarousels/leaves.jpeg`)}
                  width={1200}
                  height={400}
                  alt="Logo"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1 className="display-3 landingPageHeader" text-secondary>
                    Open oppertunities for Business
                  </h1>
                  <p></p>
                  <button
                    type="button"
                    className="btn btn-lg"
                    data-toggle="modal"
                    data-target="#sign-up"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="main-page-intro landingPageHeader">
          <p>
            During the Corona Pandemic, our aim is to provide safe oppertunities
            for outdoor services like Yoga, Aerobics, Meditation and Soccer.
          </p>
          <p>
            The main initiative of this application is to facilitate both
            Service providers to deal with business loss and to get new
            customers and to provide the customers safe and exciting
            oppertunities.
          </p>
          <p>
            In the indoor services, there are more chances of corona spread. To
            deal with the situation and to provide opportunity for business and
            customers, we have all the services provided outdoors.
          </p>
        </div>
        <hr />
        {/* OUTDOOR SERVICES */}
        <div className="container-fluid-padding">
          <div className="row welcome text-center">
            <div className="col-12">
              <h1
                className="display-3 landingPageHeader"
                style={{ paddingTop: "60px", paddingBottom: "30px" }}
              >
                Outdoor Services
              </h1>
            </div>
            <hr></hr>
          </div>
        </div>
        {/* CARDS */}
        <div className="container-fluid" style={{ padding: "30px" }}>
          <div className="row padding">
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  className="card-img-top"
                  src={require(`../../assets/landingpagecards/meditation.jpeg`)}
                  width={300}
                  height={600}
                  alt = 'meditation'
                />
                <div className="card-body">
                  <h4 className="card.title display-3 landingPageHeader">
                    Meditation
                  </h4>
                  <p className="card-text">
                    Meditation is a practice where an individual uses a
                    technique – such as mindfulness, or focusing the mind on a
                    particular object, thought, or activity – to train attention
                    and awareness, and achieve a mentally clear and emotionally
                    calm and stable state.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  className="card-img-top"
                  src={require(`../../assets/landingpagecards/sports.jpeg`)}
                  width={300}
                  height={600}
                  alt="sports"
                />
                <div className="card-body">
                  <h4 className="card.title display-3 landingPageHeader">
                    Sports{" "}
                  </h4>
                  <p className="card-text">
                    Sport includes all forms of competitive physical activity or
                    games which through casual or organized participation, at
                    least in part aim to use, maintain or improve physical
                    ability and skills while providing enjoyment to
                    participants, entertainment for spectators.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  className="card-img-top"
                  src={require(`../../assets/landingpagecards/running.jpeg`)}
                  width={300}
                  height={600}
                  alt="running"
                />
                <div className="card-body">
                  <h4 className="card.title display-3 landingPageHeader">
                    Running
                  </h4>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate deserunt quos tempore omnis expedita suscipit
                    cumque obcaecati magni. Dignissimos minima vel labore quos,
                    nostrum doloremque blanditiis iure tempore pariatur facilis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginPage;
