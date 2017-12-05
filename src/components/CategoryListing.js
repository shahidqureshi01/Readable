import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import Sort from './Sort'
import { deletePost, changeVote } from '../actions'

class CategoryListing extends Component {


  handleDelete(e, id){
    e.preventDefault()
    this.props.deletePost(id)
  }

  handleClick(e, id, vote) {
    e.preventDefault()
    this.props.changeVote(id, vote)
  }

  getCommentCount(id,comments) {
    const postComments = comments.filter(c => c.parentId === id )
    return postComments.length
  }

  render() { 
    if(this.props.posts) {
      const category = this.props.match.params.category
      const posts = this.props.posts.filter(p=> (p.category === category && !p.deleted))
      if(!posts.length){
        return(<div>No posts in this category</div>)
      }
      return(
        <div className="news-listing">
          <div><Sort /></div>
          <div>
            {posts && posts.map(p =>(
              <div className="news" key={p.id}>
                <Link to={`/${p.category}/${p.id}`}>
                  <h3>{p.title}</h3>
                </Link>
                <div>
                  <span className='small-link'>
                    Comment count: {this.getCommentCount(p.id,this.props.comments)}
                  </span>
                  <span className='small-link'>
                    Votes: {p.voteScore}
                  </span>
                  <span className='small-link'>
                    <button onClick={(e)=>this.handleClick(e, p.id, 'upVote')}>Up vote</button>
                  </span>
                  <span className='small-link'>
                    <button onClick={(e)=>this.handleClick(e, p.id, 'downVote')}>Down vote</button>
                  </span>
                  <span className='small-link'>
                    <Link to={`/News/${p.id}/edit`}>Edit</Link>
                  </span>
                  <span className='small-link'>
                    <button onClick={(e)=> this.handleDelete(e, p.id)}>Delete</button>
                  </span>
                  <hr />
                </div>
                <div>
                  <hr />
                </div>
              </div>
            ))}         
          </div>
        </div>
      )
    } else {
      return ( 
        <div>
          return ('<div>No posts...</div>')
        </div>
      )
    }
  }
}

function mapDispatchToprops(dispatch){
  return {
    deletePost: (id)=>dispatch(deletePost(id)),
    changeVote: (id, vote) => dispatch(changeVote(id, vote)),
  }
}

function mapStateToProps({posts}){
  return {posts: posts.posts, comments: posts.comments}
}

export default connect(mapStateToProps, mapDispatchToprops)(CategoryListing);
