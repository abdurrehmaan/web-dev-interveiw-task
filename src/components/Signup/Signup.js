
import React, { useRef, useState } from 'react'
// import bootstrap components
import { Card, Button, Form, Alert,Container } from 'react-bootstrap'
// Importing useAuth from AuthContext 
import { useUserAuth } from '../../contexts/UserAuthContext'
import { Link, useNavigate } from 'react-router-dom'




function Signup() {
  // using use Ref hook here 
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp, user } = useUserAuth();
  console.log("Signup -> user", JSON.stringify(user))

  const history = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("");
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value);
      history('/')
    } catch (err) {
      setError(err.message);
    }

    setLoading(false)
  }
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {error && <Alert variant="danger" >{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email"  >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" >
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button className="w-100 mt-2" type="submit" disabled={loading}>Sign UP</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Signup