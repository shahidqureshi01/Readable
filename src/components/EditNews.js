import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { editPost } from '../actions'

class EditNews extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      id: this.id.value,
      title: this.title.value,
      body: this.body.value 
    }
    this.props.editPost(formData)
    this.props.history.push('/')
  }

  render() { 
    const id = this.props.match.params.id
    const post = this.props.posts.filter(p => p.id === id)
    //console.log('posty',post)
    if(post[0]) { 
      return ( 
        <div>
          <div className="news-detail">
            <h2>Edit News Story</h2>
          </div>
          <div>
            <form onSubmit={this.handleSubmit} id="editform">
              <div>
                <label>
                  Title:
                  <input type="text" defaultValue={post[0].title} name="title" ref={(input) => this.title = input} id="title" />
                </label>
              </div>
              <label>
                Body:
                <textarea  id="body" defaultValue={post[0].body} ref={(input) => this.body = input} />
              </label>
              <input type="hidden" name="nid" value={id} ref={(input) => { this.id = input }} />
              <div><input type="submit" value="Save" /></div>
            </form>
        </div>
        </div>
      );
    } else {
      return (<div>No such post</div> );
    }
  }
}

function mapStateToProps({posts}){
  return {posts: posts.posts} ;
}

function mapDispatchToProps(dispatch) { 
    return {
      editPost: (formData) => dispatch(editPost(formData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditNews)
