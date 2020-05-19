import React from "react";
import PostsApi from './../../api/PostsApi';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import moment from 'moment';

var getParams = function () {
  var url = window.location.href;
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('?');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

var formatDate = function (stringDate) {
  return moment(stringDate).format("ddd, MMMM Do YYYY");
};

class ServiceList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      title: this.props.title,
      param1: getParams,
    };
  }

  async bookPost(post) {
    console.log("Your booking has been done")
  }

  componentDidMount() {
    PostsApi.getAllActiveAndFull()
      .then(({ data }) => this.setState({ posts: data }))
      .catch((err) => console.error(err));
  }

  render() {
    const posts = this.state.posts;
    const sortedPosts = [].concat(posts)
      .sort((a, b) => a.date > b.date ? 1 : -1);
    var variable = getParams();

        return (
          <div className='table table-hover table-responsive '>
            <h2>Available Events</h2>
            <table class='table service-table'>
              <thead>
                <tr>
                  <th scope='col'>Title</th>
                  <th scope='col'>Location</th>
                  <th scope='col'>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {sortedPosts.map(
                  (post) =>
                    (variable.service === 'all' ||
                      post.serviceType === variable.service) && (
                      <tr key={post.id}>
                        <td>{post.name}</td>
                        <td>{post.place}</td>
                        <td>{formatDate(post.date)}</td>
                        {
                          <Link to={`/service/${post.id}`}>
                            <button className='btn btn-success'>See details</button>
                          </Link>
                        }
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        );
    }
}

export default ServiceList;
