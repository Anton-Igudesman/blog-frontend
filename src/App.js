import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';

import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';

function App() {
 
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/add-category" element = {<AddNewCategory />} />
        <Route path="category-list" element = {<CategoryList />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="*" element = {<h1>404. Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





