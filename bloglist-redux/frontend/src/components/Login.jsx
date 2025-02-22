import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { login } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      dispatch(notify('Logged in', 'success'))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>Login</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId='formUsername' className='mb-3'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    data-testid='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter username'
                  />
                </Form.Group>
                <Form.Group controlId='formPassword' className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    data-testid='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                  />
                </Form.Group>
                <Button variant='primary' type='submit' className='w-100'>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
