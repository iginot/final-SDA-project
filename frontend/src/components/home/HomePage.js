import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide "
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={require(`../../assets/homepagecarousels/abstract.jpeg`)}
                width={1200}
                height={300}
                alt="Logo"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1
                  className="display-3 landingPageHeader"
                  text-warning
                  style={{ color: "black" }}
                >
                  Post a Service
                </h1>
                <p className="paragraph" style={{ color: "black" }}>
                  Click on the Get Started button below to post a service
                </p>

                <Link className="link-button" to="/serviceform">
                  <button type="button" className="btn btn-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={require(`../../assets/homepagecarousels/leaves.jpeg`)}
                width={1200}
                height={300}
                alt="Leaves"
              />
              <div className="carousel-caption d-none d-md-block">
                <h1 className="display-3 landingPageHeader" text-warning>
                  Book a Service
                </h1>
                <p>Click on the Get Started button below to book a service</p>

                <Link className="link-button" to="/service?service=all">
                  <button type="button" className="btn btn-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>

        {/* OUTDOOR SERVICES */}
        <div className="container-fluid-padding">
          <div className="row welcome text-center">
            <div className="col-12">
              <h1
                className="display-3 landingPageHeader"
                style={{ paddingTop: "60px", paddingBottom: "30px" }}
              >
                Choose the desired service
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
                  class="card-img-top"
                  src={require(`../../assets/homepagecards/group-training.jpeg`)}
                  width={300}
                  height={200}
                  alt="group-training"
                />
                <div className="card-body">
                  <h4 className="card.title landingPageHeader">Sports</h4>
                  <hr/>
                  <Link
                    className="link-button-homepage"
                    to="/service?service=groupTraining"
                  >
                    <button type="button" className="btn homepage btn-lg">
                      Go to Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  class="card-img-top"
                  src={require(`../../assets/homepagecards/soccer-out.jpeg`)}
                  width={300}
                  height={200}
                  alt="SoccerOut"
                />
                <div className="card-body">
                  <h4 className="card.title landingPageHeader">Soccer</h4>
                  <hr />
                  <Link className="link-button-homepage" to="/service?service=soccer">
                    <button type="button" className="btn btn-lg">
                      Go to Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  class="card-img-top"
                  src={require(`../../assets/homepagecards/yoga.jpeg`)}
                  width={300}
                  height={200}
                  alt="yoga"
                />
                <div className="card-body">
                  <h4 className="card.title landingPageHeader">Outdoor Yoga</h4>
                  <hr />
                  <Link
                    className="link-button-homepage"
                    to="/service?service=Outdoor%20Yoga"
                  >
                    <button type="button" className="btn btn-lg">
                      Go to Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />

          {/*CARDS SENOND ROW*/}
          <div className="row padding">
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  class="card-img-top"
                  src={require(`../../assets/homepagecards/group-training2.jpeg`)}
                  width={300}
                  height={200}
                  alt="group Training"
                />
                <div className="card-body">
                  <h4 className="card.title landingPageHeader">
                    Group Training
                  </h4>
                  <hr />
                  <Link
                    className="link-button-homepage"
                    to="/service?service=groupTraining"
                  >
                    <button type="button" className="btn btn-lg">
                      Go to Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  class="card-img-top"
                  src={require(`../../assets/homepagecards/meditation-out.jpeg`)}
                  width={300}
                  height={200}
                  alt="meditation"
                />
                <div className="card-body">
                  <h4 className="card.title landingPageHeader">Meditation</h4>
                  <hr />
                  <Link
                    className="link-button-homepage"
                    to="/service?service=meditation"
                  >
                    <button type="button" className="btn btn-lg">
                      Go to Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <img
                  class="card-img-top"
                  src={require(`../../assets/homepagecards/group-run.jpeg`)}
                  width={300}
                  height={200}
                  alt="group-run"
                />
                <div className="card-body">
                  <h4 className="card.title landingPageHeader">
                    Group Running
                  </h4>
                  <hr />
                  <Link className="link-button-homepage" to="/service?service=groupRun">
                    <button type="button" className="btn btn-lg">
                      Go to Service
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
