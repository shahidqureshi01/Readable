import {
	GET_POSTS, 
	GET_COMMENTS,
	GET_COMMENT,
	ADD_NEWS, 
	EDIT_NEWS, 
	ADD_COMMENT, 
	EDIT_COMMENT, 
	DELETE_COMMENT, 
	DELETE_POST, 
	SORT_POSTS, 
	UPDATE_VOTE, 
	UPDATE_COMMENT_VOTE 
} from './actionTypes'

export function getPosts(posts, categories, comments) {
	return {
		type: GET_POSTS,
		posts,
		categories,
		comments: comments
	}
}

export const fetchPosts = () => dispatch => (
	fetch(
 		'http://localhost:5001/posts', 
 		{ headers: { 'Authorization': 'Javascript is awesome' }})
	.then(response => {
		if(response.ok) {
			response.json().then(posts => { 
				let comments = []
				posts.map(post =>{
					fetch(
 						`http://localhost:5001/posts/${post.id}/comments`, 
 						{ headers: { 'Authorization': 'Javascript is awesome' }})
					.then(response => {
						if(response.ok) {
							response.json().then(comment => { 
								comments = comments.concat(comment)
							})
						}
					})
				}) // end of map
				fetch(
 					'http://localhost:5001/categories', 
 					{ headers: { 'Authorization': 'Javascript is awesome' }})
				.then(response => {
					if(response.ok) {
						response.json().then(data => { 
							dispatch(getComments(comments))
							dispatch(getPosts(posts,data,comments))
						})
					}	
				})
			}) //respons ends
		}	
	})
);

export function getComments(comments) {
	return {
		type: GET_COMMENTS,
		comments,
	}
}

export const fetchComments = (id) => dispatch => ( 
	fetch(
 		`http://localhost:5001/posts/${id }/comments`, 
 		{ headers: { 'Authorization': 'Javascript is awesome' }})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => {
				dispatch(getComments(data))
			})
		}	
	})
);

export function getComment(comment) {
	return {
		type: GET_COMMENT,
		comment,
	}
}

export const fetchComment = (id) => dispatch => ( 
	fetch(
 		`http://localhost:5001/comments/${id}`, 
 		{ headers: { 'Authorization': 'Javascript is awesome' }})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(getComment(data))
			})
		}	
	})
);

export function addNews(post) {
	return {
		type: ADD_NEWS,
		post,
	}
}

export const addPost = (formData) => dispatch =>(
	fetch(
 		'http://localhost:5001/posts/', 
 		{ 
 			method: 'POST',
 			headers: {
 			 'Authorization': 'Javascript is awesome',
 			  'Accept': 'application/json',
    		'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
				"id" : formData.id,
				"title" : formData.title,
				"timestamp" : Date.now(),
				"body" : formData.body,
				"owner" : formData.owner,
				"category" : formData.category
 			})
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(addNews(data))
			})
		}	
	})
);

export function editNews(post) {
	return {
		type: EDIT_NEWS,
		post,
	}
}

export const editPost = (formData) => dispatch =>(
	fetch(
 		`http://localhost:5001/posts/${formData.id}`, 
 		{ 
 			method: 'PUT',
 			headers: {
 				'Authorization': 'Javascript is awesome',
 				'Accept': 'application/json',
    		'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
				"title" : formData.title,
				"body" : formData.body
 			})
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(editNews(data))
			})
		}	
	})
);

export function addCommentToState(comment) {
	return {
		type: ADD_COMMENT,
		comment,
	}
}

export const addComment = (formData) => dispatch =>(
	fetch(
 		'http://localhost:5001/comments/', 
 		{ 
 			method: 'POST',
 			headers: {
 			 'Authorization': 'Javascript is awesome',
 			  'Accept': 'application/json',
    		'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
				"id" : formData.id,
				"timestamp" : Date.now(),
				"body" : formData.body,
				"owner" : formData.owner,
				"parentId" : formData.parentId
 			})
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(addCommentToState(data))
			})
		}	
	})
);

export function updateComment(comment){
	return {
		type: EDIT_COMMENT,
		comment,
	}
}

export const editComment = (formData) => dispatch =>(
	fetch(
 		`http://localhost:5001/comments/${formData.id}`, 
 		{ 
 			method: 'PUT',
 			headers: {
 				'Authorization': 'Javascript is awesome',
 				'Accept': 'application/json',
    		'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
				"body" : formData.body
 			})
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { console.log('ddd',data)
				dispatch(updateComment(data))
			})
		}	
	})
);

export function updateDeletedComment(comment) {
	return {
		type: DELETE_COMMENT,
		comment
	}
}

export const deleteComment = (id) => dispatch =>(
	fetch(
 		`http://localhost:5001/comments/${id}`, 
 		{ 
 			method: 'DELETE',
 			headers: {
 				'Authorization': 'Javascript is awesome',
 			},
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(updateDeletedComment(data))
			})
		}	
	})
);

export function updateDeletedPost(post) {
	return {
		type: DELETE_POST,
		post
	}
}

export const deletePost = (id) => dispatch =>(
	fetch(
 		`http://localhost:5001/posts/${id}`, 
 		{ 
 			method: 'DELETE',
 			headers: {
 				'Authorization': 'Javascript is awesome',
 			},
 		})
	.then(response => { 
		if(response.ok) { 
			response.json().then(data => { 
				dispatch(updateDeletedPost(data))
			})
		}	
	})
);

export function sortPosts(option){
	return {
		type: SORT_POSTS,
		option
	}
}

export function updateVote(post){
	return {
		type: UPDATE_VOTE,
		post
	}
}

export const changeVote = (id, vote) => dispatch =>(
	fetch(
 		`http://localhost:5001/posts/${id}`, 
 		{ 
 			method: 'POST',
 			headers: {
 				'Authorization': 'Javascript is awesome',
 				'Accept': 'application/json',
    		'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
				"option" : vote
 			})
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(updateVote(data))
			})
		}	
	})
);

export function updateCommentVote(comment){
	return {
		type: UPDATE_COMMENT_VOTE,
		comment
	}
}

export const changeCommentVote = (id, vote) => dispatch =>(
	fetch(
 		`http://localhost:5001/comments/${id}`, 
 		{ 
 			method: 'POST',
 			headers: {
 				'Authorization': '',
 				'Accept': 'application/json',
    		'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
				"option" : vote
 			})
 		})
	.then(response => { 
		if(response.ok) {
			response.json().then(data => { 
				dispatch(updateCommentVote(data))
			})
		}	
	})
);