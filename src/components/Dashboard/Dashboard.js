import React, { useState } from 'react'
import { 
  Card, 
  Button, 
  Alert, 
  Container,
  Navbar,
  Nav,
  Form,
} from 'react-bootstrap'
import { useUserAuth } from '../../contexts/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom'
import Table from './InfoTable'



function Dashboard() {
  const [error, setError] = useState("");
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      setError(error.message)
      console.log(error.message);
    }
  };
  return (
    <>
      <Container Fluid>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Roptsam Task</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
              <Form className="d-flex">
                {/* <strong>Email:{user && user.email} </strong> */}
                <Button variant="outline mx-4" disabled >{user && user.email}</Button>
                <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>



        <div className="w-100 d-flex align-items-center flex-column mt-5 " style={{ minHeight: "100vh" }}>
        {error && <Alert variant="danger" >{error}</Alert>}
        <Alert variant="success">
          Welcome to <strong> {user && user.email}</strong>.  It's great to meet you! 😊
        </Alert>
        <Alert variant="warning ">
          Update Your Password  <Link to="/reset-password" className='btn btn-outline-primary'>Reset Password</Link>
        </Alert>
          <div className='w-100 text-white bg-dark ps-3 py-2'>
          
            <strong className='text-left'>Vehicle Info</strong>

          </div>
          <Table />
        </div>
      </Container>
    </>
  )
}

export default Dashboard