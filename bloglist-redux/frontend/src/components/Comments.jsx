import React from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const Comments = ({ comments, blogId }) => {
  const dispatch = useDispatch()

  const handleComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addCommentToBlog(blogId, content))
  }

  return (
    <div>
      <h2>Comments</h2>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control type='text' name='comment' />
          <Button variant='primary' type='submit'>
            Add comment
          </Button>
        </Form.Group>
      </Form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
