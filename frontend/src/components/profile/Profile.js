import React from "react";
import AuthApi from "../../api/AuthApi";
import PostsApi from "../../api/PostsApi";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../style/Profile.css";
import FileApi from "../../api/FileApi";
import ProfilePic from './ProfilePic';
import { FaUserCircle } from 'react-icons/fa'

var getListOfAttendees = function (post) {
  let emails = post.attendees.map((a) => a.email);
  return emails;
};

var formatDate = function (stringDate) {
  return moment(stringDate).format('ddd, MMMM Do YYYY');
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      email: '',
      posts: [],
      bookings: [],
      image: [],
    };
  }

  componentDidMount() {
    AuthApi.getUserDetails()
      .then(({ data }) => this.setState({ user: data }))
      .catch((err) => console.error(err));

    PostsApi.listOfPostsByServiceProviderEmail()
      .then(({ data }) => this.setState({ posts: data }))
      .catch((err) => console.error(err));

    PostsApi.listOfPostsByAttendeeEmail()
      .then(({ data }) => this.setState({ bookings: data }))
      .catch((err) => console.error(err));

    FileApi.getProfilePic()
      .then(({ data }) => this.setState({ image: data }))
      .catch((err) => console.error(err));
  }

  

  render() {
    const user = this.state.user;
    const posts = this.state.posts;

    const sortedPosts = []
      .concat(posts)
      .sort((a, b) => (a.date > b.date ? 1 : -1));
    const bookings = this.state.bookings;
    const sortedBookings = []
      .concat(bookings)
      .sort((a, b) => (a.date > b.date ? 1 : -1));
    const data = this.state.image.data
    const imageId = this.state.user.imageId;

    const serviceDiv = (
      <div className='table table-hover table-responsive '>
        <h3> My Services</h3>
        <table className='table service-table '>
          <thead>
            <tr>
              <th scope='col'>Event Type</th>
              <th scope='col'>Location</th>
              <th scope='col'>Date</th>
              <th scope='col'>Status</th>
              <th scope='col'>Booked</th>
              <th scope='col'>Attendees</th>
            </tr>
          </thead>

          <tbody>
            {sortedPosts.map((post) => (
              <tr>
                <Link className='table-link' to={`/service/${post.id}`}>
                  {' '}
                  <td>{post.serviceType}</td>{' '}
                </Link>
                <td>{post.place}</td>
                <td>{formatDate(post.date)}</td>
                <td>{post.status.toLowerCase()}</td>
                <td>
                  {post.attendees.length + ' out of ' + post.attendeesLimit}
                </td>
                <td>{getListOfAttendees(post).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    const bookingDiv = (
      <div className='table table-hover table-responsive '>
        <h3> My Bookings</h3>
        <table class='table service-table'>
          <thead>
            <tr>
              <th scope='col'>Activity</th>
              <th scope='col'>Location</th>
              <th scope='col'>Date</th>
              <th scope='col'> Status</th>
              <th scope='col'>Provided By</th>
            </tr>
          </thead>

          <tbody>
            {sortedBookings.map((booking) => (
              <tr>
                <Link className='table-link' to={`/service/${booking.id}`}>
                  {' '}
                  <td>{booking.serviceType}</td>{' '}
                </Link>
                <td>{booking.place}</td>
                <td>{formatDate(booking.date)}</td>
                <td>{booking.status.toLowerCase()}</td>
                <td>{booking.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    return (
      <div className='container'>
        <div className="row profile">
          <div className="col-md-6">

            {  data ?
              <img class="profile-pic rounded-circle" src={`data:image/jpeg;base64,${data}`} /> :
              <FaUserCircle color="gray"size='13rem'/>}

          </div>
          <div className="col-md-6">
            <ProfilePic />
          </div>
        </div>

        <div>
          <div>
            
          <h3 class='text-uppercase'>{user.name}</h3>
          </div>
          <hr></hr>
          <div class='font-weight-bold'>
            <h5>Contact Information</h5>
            <p>E-Mail: {user.email}</p>
          </div>
        </div>
        <hr></hr>
        {sortedPosts.length === 0 || serviceDiv}
        {sortedBookings.length === 0 || bookingDiv}
    

      </div>
    );
  }
}
export default Profile;
