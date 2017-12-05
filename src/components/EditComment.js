import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { fetchComment } from '../actions'
import { editComment } from '../actions'

class EditComment extends Component {

  constructor(props) {
    super(props)
    this.props.fetchComment(this.props.match.params.id)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      id: this.id.value,
      body: this.body.value 
    }
    const parentId = this.pid.value;
    const parent = this.props.posts.filter(p=> p.id === parentId)
    const category = parent[0].category
    console.log('parent', parent)
    this.props.editComment(formData)
    this.props.history.push(`/${category}/${parentId}`)
  }

  render() { 
    const commentId = this.props.match.params.id
    const comment = this.props.comments.filter(c=>c.id===commentId)
    console.log('key', comment)
    if(comment[0]) { 
      return ( 
        <div><div>{JSON.stringify(comment[0])}</div>
          <div className="news-detail">
            <h2>Edit comment </h2>
          </div>
          <div>
            <form onSubmit={this.handleSubmit} id="editform">
              <label>
                Comment:
                <textarea  id="body" defaultValue={comment[0].body} ref={(input) => this.body = input} />
              </label>
              <input type="hidden" name="nid" value={comment[0].id} ref={(input) => { this.id = input }} />
              <input type="hidden" name="pid" value={comment[0].parentId} ref={(input) => { this.pid = input }} />
              <div><input type="submit" value="Save" /></div>
            </form>
        </div>
        </div>
      );
    } else {
      return (<div>No such Comment</div> );
    }
  }
}

function mapStateToProps({comments, posts}){
  return {
    comments: comments.comments,
    posts: posts.posts
  } 
}

function mapDispatchToProps(dispatch) { 
    return {
      fetchComment: (id) => dispatch(fetchComment(id)),
      editComment: (formData) => dispatch(editComment(formData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditComment)
