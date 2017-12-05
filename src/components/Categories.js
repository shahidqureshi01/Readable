import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Categories(props) {
  if(props.categories) {
    const categories = props.categories.categories
    return (
      <div>
        <div><h2>Categories</h2></div>
        <div>
          <ul>
            {categories.map(c=>(
              <li key={c.name}><Link to={`/${c.path}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  return ( 
    <div>No Categories...</div>
  )
}

function mapStateToProps({posts}){
  return {
    categories: posts.categories
  }
}

export default connect(mapStateToProps)(Categories)
