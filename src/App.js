import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login"
import ResetPassword from "./components/ResetPassword/ResetPassword"
// Bootstrap Components
import { Container } from 'react-bootstrap'
import { UserAuthContextProvider } from './contexts/UserAuthContext'
// importing React Routers
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// importing private routes
import PrivateRoute from "./Routes/PrivateRoute";


function App() {
  return (


        <Router>
          <UserAuthContextProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute><Dashboard /></PrivateRoute> } />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile-update' element={<Dashboard /> } />
              <Route path='/reset-password' element={<ResetPassword /> } />
            </Routes>
          </UserAuthContextProvider>
        </Router>
    
      
  );
}

export default App;
