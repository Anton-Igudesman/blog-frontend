import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from './components/Categories/AddNewCategory';
import UpdateCategory from './components/Categories/UpdateCategory';
import CategoryList from './components/Categories/CategoryList';
import ProtectAdminRoute from './components/Navigation/ProtectedRoutes/ProtectAdminRoute';
import ProtectPrivateRoute from './components/Navigation/ProtectedRoutes/ProtectPrivateRoute';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';


function App() {
 
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route 
          path="/add-category" 
          element = {
          <ProtectAdminRoute>
            <AddNewCategory />
          </ProtectAdminRoute>
            } 
          /> 
        <Route 
          path="/category/update/:id" 
          element = {
            <ProtectAdminRoute>
              <UpdateCategory />
            </ProtectAdminRoute>
            }
          /> 
        <Route 
          path="category-list" 
          element = {
            <ProtectAdminRoute>
              <CategoryList />
            </ProtectAdminRoute>  
            } 
          />
        <Route 
          path="/create-post"
          element = {
            <ProtectPrivateRoute>
              <CreatePost />
            </ProtectPrivateRoute>
          }
        />
        <Route 
          path="/update-post/:id"
          element = {
            <ProtectPrivateRoute>
              <UpdatePost />
            </ProtectPrivateRoute>
          }
        />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path='/posts' element = {<PostsList />} />
        <Route exact path='/posts/:id' element = {<PostDetails/>} />
        <Route path="*" element = {<h1>404. Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





