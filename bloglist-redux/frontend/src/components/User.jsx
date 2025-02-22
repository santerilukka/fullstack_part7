import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, ListGroup, Spinner, Container, Row, Col } from 'react-bootstrap'
import usersService from '../services/users'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await usersService.getAll()
      const selectedUser = user.find((u) => u.id === id)
      setUser(selectedUser)
    }
    fetchUser()
  }, [id])

  if (!user) {
    return (
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={8}>
          <Card className='mt-5'>
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Added blogs
              </Card.Subtitle>
              <ListGroup variant='flush'>
                {user.blogs.map((blog) => (
                  <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default User
