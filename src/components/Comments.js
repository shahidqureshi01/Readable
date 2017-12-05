import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteComment } from '../actions'
import { changeCommentVote } from '../actions'

class Comments extends Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id, e) {
    e.preventDefault()
    this.props.deleteComment(id)    
  } 

  handleClick(e, id, vote) {
    e.preventDefault()
    this.props.changeCommentVote(id, vote)
  }

  render() { 
    if(this.props.comments) {
      const parentId = this.props.parentId
      const comments = this.props.comments.filter(c=>c.id===parentId)
      return(
        <div>
          <h4>Comments : Number of comments={this.props.comments.length}</h4>
          <div className="comments">
            {this.props.comments.map(c =>(
              <div className="comments-body" key={c.id}>
                <p>{c.body}</p>
                <span className="small-link">Score: {c.voteScore}</span>
                <span className="small-link">
                  <button onClick={(e)=>this.handleClick(e, c.id, 'upVote')}>Up vote</button>
                </span>
                <span className="small-link">
                  <button onClick={(e)=>this.handleClick(e, c.id, 'downVote')}>Down vote</button>
                </span>
                <span className='small-link'>
                    <Link to={`/Comment/${c.id}/edit`}>Edit</Link>
                </span>
                <span className="small-link">
                  <button onClick={(e) => this.handleDelete(c.id, e)}>Delete</button>
                </span>
                <div><hr /></div>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return ( 
        <div>
          return (<div>No comments...</div>)
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (id) => dispatch(deleteComment(id)),
    changeCommentVote: (id, vote) => dispatch(changeCommentVote(id, vote)),
  }
}

function mapStateToProps({comments}){
  return {
    comments: comments.comments
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments);
