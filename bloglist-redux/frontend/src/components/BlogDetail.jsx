import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
} from 'react-bootstrap'
import blogService from '../services/blogs'
import commentsService from '../services/comments'
import Comments from './Comments'

const BlogDetail = () => {
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getById(id)
        setBlog(fetchedBlog)
      } catch (error) {
        console.error('Error fetching blog:', error)
      }
    }
    fetchBlog()
  }, [id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await commentsService.getAll(id)
        setComments(fetchedComments)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [id])

  const handleNewComment = (newComment) => {
    setComments(comments.concat(newComment))
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={8}>
          <Card className='mt-5'>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Author: {blog.author}
              </Card.Subtitle>
              <Card.Text>
                URL: <a href={blog.url}>{blog.url}</a>
              </Card.Text>
              <Card.Text>Likes: {blog.likes}</Card.Text>
              <Comments
                comments={comments}
                blogId={blog.id}
                onNewComment={handleNewComment}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogDetail
