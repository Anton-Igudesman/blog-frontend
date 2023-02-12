import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';

import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar';

function App() {
 
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/register" element = {<Register />} />
        <Route path="https://blog-backend-s0f7.onrender.com/api/v1/users/login" element = {<Login />} />
        <Route path="*" element = {<h1>404. Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





