import React from 'react';
import CommentsApi from '../../api/CommentsApi';
import PostsApi from '../../api/PostsApi';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import ServiceEditor from '../service/ServiceEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

var getLocalTime = function (stringDate) {
  let localTime = moment.utc(stringDate);
  return localTime.local().format('ddd, MMMM Do YYYY, h:mm a');
};

var formatDate = function (stringDate) {
  return moment(stringDate).format('ddd, MMMM Do YYYY');
};

var getUpdateTime = function (stringDate) {
  let localTime = moment.utc(stringDate);
  return localTime.local().fromNow();
};

class CommentsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      post: {
        user: { email: '' },
        description: '',
        name: '',
        attendeesLimit: '',
        serviceType: '',
        date: '',
        time: '',
        place: '',
        attendees: [{ email: '' }],
      },
      postId: '',
      email: '',
    };
  }

  async createComment(commentData, postId, email) {
    try {
      const response = await CommentsApi.createComment(
        commentData,
        postId,
        email
      );
      const comment = response.data;
      const newComments = this.state.comments.concat(comment);

      this.setState({
        comments: newComments,
      });
    } catch (e) {
      console.error(e);
    }
  }
  async updateComment(comment, postId) {
    try {
      await CommentsApi.updateComment(postId, comment.id, comment);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteComment(comment) {
    try {
      await CommentsApi.deleteComment(comment.id);
      const newComments = this.state.comments.filter(
        (c) => c.id !== comment.id
      );
      this.setState({
        comments: newComments,
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    const idPost = Number(this.props.match.params.id);

    PostsApi.getPostById(idPost)
      .then(({ data }) => this.setState({ post: data }))
      .catch((err) => console.error(err));

    CommentsApi.getEmail()
      .then(({ data }) => this.setState({ email: data }))
      .catch((err) => console.error(err));

    this.setState({ postId: idPost });

    CommentsApi.getAllCommentsByPost(idPost)
      .then(({ data }) => this.setState({ comments: data }))
      .catch((err) => console.error(err));
  }

  render() {
    const comments = this.state.comments;
    const currentEmail = this.state.email;
    const id = Number(this.props.match.params.id);
    let posts = [];

    return (
      <div>
        <div className='card'>
        <h5 className='card-header'>{'Organizer: ' + this.state.post.user.name}</h5>
          
          <div className='card-body'>
          <span className='badge badge-default float-right m-2'>
          {'Max ' + this.state.post.attendeesLimit + ' people'}
        </span>
        <span className='badge badge-default float-right m-2'>
          {this.state.post.serviceType}
        </span>
        <div className='card-title'>{this.state.post.name}</div>
            
        <div className='mt-3'>
          <span className='d-inline-block'>
            {<FontAwesomeIcon icon={faMapMarkerAlt} />}
          </span>
          <span className='d-inline-block'> {this.state.post.place}</span>
        </div>

        <div className='mt-3'>
          <span className='d-inline-block'>
            {<FontAwesomeIcon icon={faClock} />}
          </span>
          <span className='d-inline-block'>
            {' '}
            {formatDate(this.state.post.date) + ' at ' + this.state.post.time}
          </span>
        </div>
        <div className='mt-3'>
          <p className='headline-description'>
            {`Activity Description:`}
          </p>
            {this.state.post.description ? (
              <ServiceEditor
                editorState={JSON.parse(this.state.post.description)}
                readOnly={true}
              />
            ) : (
              <div/>
            )}
          </div>
          <div className='card-footer'>
              <small className='text-muted'>
                <div className='row'>
                  <div className='col'>
                    {' '}
                    {'Created at: ' + getLocalTime(this.state.post.createdAt)}
                  </div>
                  <div className='col-right'>
                    {' '}
                    {'Updated ' + getUpdateTime(this.state.post.updatedAt)}
                  </div>
                </div>
              </small>
            </div>
          </div>
        </div>

        <br />
        <CommentForm
          onSubmit={(commentData) =>
            this.createComment(commentData, id, currentEmail)
          }
          post={posts}
        />

        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            currentEmail={currentEmail}
            comment={comment}
            onDeleteClick={() => this.deleteComment(comment)}
            onSubmit={this.updateComment}
            postID={id}
          />
        ))}
      </div>
    );
  }
}

export default CommentsPage;
