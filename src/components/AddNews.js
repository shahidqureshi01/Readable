import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPost } from '../actions'

class AddNews extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      title: '',
      owner: '',
      category: '',
      body: '',
      disable: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {title} = this.state
    if(title.length<1?false:true)
    event.preventDefault();
    this.props.addPost(this.state)
    this.setState({
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      title: '',
      owner: '',
      category: '',
      body: ''
    })
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
    const { title, owner, category, value } = this.state;
    return (
      <div>
        <div>Add a New story</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              <span className="left">Title:</span>
              <span className="right">
                <input type="text" value={title} name="title" onChange={this.handleChange} 
                required validationErrors={{ isDefaultRequiredValue: 'Field is required'}}
                />
              </span>
            </label>
          </div>
          <div>
            <label>
              <span className="left">Owner:</span>
              <span className="right">
                <input type="text" value={owner} name="owner" onChange={this.handleChange} 
                  required validationErrors={{ isDefaultRequiredValue: 'Field is required'}}
                />
              </span>
            </label>
          </div>
          <div>
            <label>
              <span className="left">Category:</span>
              <span className="right">
                <input type="text" value={category} name="category" onChange={this.handleChange}
                  required validationErrors={{ isDefaultRequiredValue: 'Field is required'}}
                />
              </span>
            </label>
          </div>
          <label>
            <span className="left">Body:</span>
            <span className="right">
              <textarea value={value} onChange={this.handleChange} id="body" 
                required validationErrors={{ isDefaultRequiredValue: 'Field is required'}}
              />
            </span>
          </label>
          <div><input  type="submit" value="Submit" /></div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) { 
    return {
        addPost: (formData) => dispatch(addPost(formData))
    }
}

export default connect(null,mapDispatchToProps)(AddNews);
