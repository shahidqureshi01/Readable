import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import { fetchPosts, fetchCategories  }  from '../actions'
import News from './News'
import NewsDetail from './NewsDetail'
import EditNews from './EditNews'
import EditComment from './EditComment'
import CategoryListing from './CategoryListing'
import Categories from './Categories'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

class App extends Component {

    componentDidMount() {
      this.props.fetchPosts()
    }

  render() {
      const { posts, comments } = this.props
      if(posts.length !== 0) {
        return (
          <div className="App">
            <div className="App-header">
              <h1>Readable App</h1>
            </div>
            <div className="topnav" id="myTopnav">
              <a href="/">Home</a>
              <a href="/category/list/show">Categories</a>
            </div>
            <div>
              <Route 
                exact path="/"
                render = {() =>(<News posts={posts} comments={comments} />)}
              />
              <Route exact path="/:category/:id"  component={NewsDetail} />
              <Route exact path="/:category"  component={CategoryListing} />
              <Route exact path="/category/list/show"  component={Categories} />
              <Route exact path="/News/:id/edit"  component={EditNews} />
              <Route exact path="/Comment/:id/edit"  component={EditComment} />
            </div>
          </div>
        )
      } else {
          return(<div>Fetching data</div>)
      }
  }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchPosts: () => dispatch(fetchPosts()),
    }
}

function mapStateToProps({posts, comments}){
    return { posts: posts.posts, comments: posts.comments }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
