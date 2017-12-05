import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import News from './News'
import { fetchComments } from '../actions'
import Comments  from './Comments'
import AddComment from './AddComment'
import { changeVote, deletePost } from '../actions'


class NewsDetail extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchComments(this.props.match.params.id)
  }

  handleDelete(e, id){
    e.preventDefault()
    this.props.deletePost(id)
    this.props.history.push('/')
  }

  handleClick(e, id, vote) {
    e.preventDefault()
    this.props.changeVote(id, vote)
  }

  render() { 
    const id = this.props.match.params.id
    const postArr = this.props.posts.filter(p => p.id === id)
    const post = postArr[0];
    if(post) { 
      return ( 
        <div className="news-detail">
          <h2>{post.title}</h2>
          <div>
            <span className='small-link'>Author: {post.author}</span>
          </div>
          <div style={{margin: 10 + 'px'}}>{post.body}</div>
          <div>
            <span className='small-link'>Score: {post.voteScore}</span>
            <span className='small-link'>
              <button onClick={(e)=>this.handleClick(e, post.id, 'upVote')}>Up vote</button>
            </span>
            <span className='small-link'>
              <button onClick={(e)=>this.handleClick(e, post.id, 'downVote')}>Down vote</button>
            </span>
            <span className='small-link'>
              <Link to={`/News/${post.id}/edit`}>Edit</Link>
            </span>
            <span className='small-link'>
              <button onClick={(e)=> this.handleDelete(e, post.id)}>Delete</button>
            </span>
          </div>
          <div className='comments'>
            <Comments parentId={post.id}/>
          </div>
          <AddComment parentId={id} />
        </div>
      );
    } else {
      return (<div>No such post</div> );
    }
  }
}

function mapStateToProps({posts, comments}){
  return {
    posts: posts.posts, 
    comments: comments.comments,
  } ;

}

function mapDispatchToProps(dispatch) { 
    return {
      fetchComments: (id) => dispatch(fetchComments(id)),
      changeVote: (id, vote) => dispatch(changeVote(id, vote)),
      deletePost: (id)=>dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsDetail)
