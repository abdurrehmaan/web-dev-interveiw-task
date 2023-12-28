
import React, { useRef,useState } from 'react'
// import bootstrap components
import { Card, Button, Form,Alert ,Container  } from 'react-bootstrap'
// Importing useAuth from AuthContext 
import { useUserAuth } from '../../contexts/UserAuthContext'
import { Link, useNavigate } from 'react-router-dom'


function Login() {
    // using use Ref hook here 
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { logIn,  user } = useUserAuth();

    const history = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
        setError("");
            setLoading(true)
          await logIn(emailRef.current.value, passwordRef.current.value);
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
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant="danger" >{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email"  >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                   
                    <Button className="w-100 mt-2" type="submit" disabled={loading}>Sign In</Button>
                </Form>
            </Card.Body> 
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        </div>
      </Container>
    </>
  )
}

export default Login