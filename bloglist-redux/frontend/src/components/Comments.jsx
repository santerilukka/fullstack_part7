import React from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'
import { Form, Button, ListGroup, Card } from 'react-bootstrap'

const Comments = ({ comments, blogId, onNewComment }) => {
  const dispatch = useDispatch()

  const handleComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    const newComment = await dispatch(addCommentToBlog(blogId, content))
    onNewComment(newComment)
  }

  return (
    <Card className='my-3'>
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <Form onSubmit={handleComment}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              name='comment'
              placeholder='Write a comment...'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Add comment
          </Button>
        </Form>
        <ListGroup variant='flush' className='mt-3'>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Comments
