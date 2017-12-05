import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sortPosts } from '../actions'

class Sort extends Component {

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    this.props.sortPosts(e.target.value)
  }

  render() { 
    return(
      <div>
        <div>                                    
          <span className='small-link'>Sort</span>
          <select name="sort" onChange={(e)=>this.handleChange(e)} >
            <option value="">...</option>
            <option value="asc">Time - Asc</option>
            <option value="desc">Time - Desc</option>
            <option value="scoreAsc">Score - Asc</option>
            <option value="scoreDesc">Score - Desc</option>
          </select>
        </div>
      </div>
    )
  }
} 

function mapDispatchToProps(dispatch){
  return {
    sortPosts: (option)=>dispatch(sortPosts(option))
  }
}

export default connect(null,mapDispatchToProps)(Sort)