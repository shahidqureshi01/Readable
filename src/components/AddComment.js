import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment} from '../actions'

class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      body: '',
      owner: '',
      parentId: this.props.parentId
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.addComment(this.state)
    this.setState({
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      owner: '',
      body: '',
    })
    event.preventDefault()
    document.getElementById('body').value = ''
  }

  handleChange(event) {
    if(event.target.id === 'body')  {
      this.setState({body: event.target.value})
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  render() { 
    return (
      <div>
        <div>Add a New Comment</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Add Comment:
              <textarea value={this.state.value} onChange={this.handleChange} id="body" 
                required validationErrors={{ isDefaultRequiredValue: 'Field is required'}}
              />
            </label>
          </div>
          <div><input type="submit" value="Submit" /></div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) { 
    return {
        addComment: (formData) => dispatch(addComment(formData))
    }
}

export default connect(null,mapDispatchToProps)(AddComment);
