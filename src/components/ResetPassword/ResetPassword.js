import React, { useRef, useState } from 'react'
// import bootstrap components
import { Card, Button, Form, Alert, Container } from 'react-bootstrap'
// Importing useAuth from AuthContext 
import { useUserAuth } from '../../contexts/UserAuthContext'
import { Link } from 'react-router-dom'


function ResetPassword() {
    // using use Ref hook here 
    const emailRef = useRef();

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage("")
            setError("");
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your email inbox for futher instructions")
        } catch (err) {
            setError("Failed to reset password");
        }

        setLoading(false)
    }
    return (
        <>
            <Container className="" style={{ minHeight: "100vh" }}>
                <div className='w-100 d-flex align-items-center flex-column mt-5'>
                
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Reset Password</h2>
                            {error && <Alert variant="danger" >{error}</Alert>}
                            {message && <Alert variant="success" >{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email"  >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>

                                <Button className="w-100 mt-2" type="submit" disabled={loading}>Reset Password</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/">back to dashboard</Link>
                    </div>
                    
                </div>
                </div>
            </Container>
        </>
    )
}

export default ResetPassword