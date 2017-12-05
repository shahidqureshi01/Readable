import { combineReducers } from 'redux'

import { 
	GET_POSTS,
	GET_CATEGORIES,
	GET_COMMENTS,
	GET_COMMENT,
	ADD_NEWS,
	EDIT_NEWS,
	ADD_COMMENT,
	DELETE_COMMENT,
	DELETE_POST,
	SORT_POSTS,
	UPDATE_VOTE,
	UPDATE_COMMENT_VOTE,
	EDIT_COMMENT
	} from '../actions/actionTypes'

function data(state = {posts: []}, action) {
  switch(action.type){
    case GET_POSTS:
      return { ...state, posts: action.posts, categories: action.categories, comments: action.comments }
    case ADD_NEWS:
    	return { ...state, posts: state.posts.concat(action.post)}
    case EDIT_NEWS: 
    	return {
    		...state, posts:state.posts.map(p=>(p.id===action.post.id?action.post:p))
    	}
    case DELETE_POST:
    	 return {...state,
    	 	posts: state.posts.filter(p => p.id !== action.post.id)
    	 }
    case SORT_POSTS:
    	return {...state,
    		posts: state.posts.sort(function (a, b) {
    			if(action.option === 'asc') {
    				return a.timestamp - b.timestamp;
    			} else if(action.option ==='desc') {
    				return b.timestamp - a.timestamp
    			} else if (action.option ==='scoreAsc'){
    				return a.voteScore - b.voteScore
    			} else if(action.option === 'scoreDesc') {
    				return b.voteScore - a.voteScore
    			} else {
    				return state.posts
    			}
				}).slice()
    	}
    case UPDATE_VOTE:
    	return {...state,
    		posts: state.posts.map(p=>(p.id===action.post.id?action.post:p))
    	}
    default:
      return state;
  }
}

function comments(state = {comments: []}, action) {
  switch(action.type){
    case GET_COMMENTS:
      return { ...state, comments: action.comments }
    case ADD_COMMENT:
    	return {...state, comments: state.comments.concat(action.comment)}
    case DELETE_COMMENT:
    	return {...state, 
    		comments: state.comments.filter(c =>c.id !== action.comment.id)
    	}
    case UPDATE_COMMENT_VOTE:
    	return {...state,
    		comments: state.comments.map(c =>c.id === action.comment.id?action.comment:c)
    	}
    case EDIT_COMMENT:
    	return {...state,
    		comments: state.comments.map(c =>c.id === action.comment.id?action.comment:c),
    		comment: action.comment
    	}
    default:
      return state;
  }
}

function comment(state = {comment: []}, action) {
	switch(action.type) {
		case GET_COMMENT:
			return {...state, comment: action.comment}
		case EDIT_COMMENT:
			return {...state, comment: action.state}
		default:
			return state
	}
}

export default combineReducers({
  posts: data,
  comments,
  comment
});