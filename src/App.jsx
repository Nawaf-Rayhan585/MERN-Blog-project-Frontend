import React from 'react';
import './App.css'
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
import PostDetails from './pages/PostDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import CategoryPosts from './pages/CategoryPosts'
import AuthorPost from './pages/AuthorPost';
import DeletePost from './pages/DeletePost';
import UserProvider from './context/userContext';

const App = () => {


  const router = createBrowserRouter([
    {
      path:'/',
      element: <UserProvider><Layout/></UserProvider>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {index: true, element: <Home></Home>},
        {path: "posts/:id", element: <PostDetails></PostDetails>},
        {path: "register", element: <Register></Register>},
        {path: "login", element: <Login></Login>},
        {path: "profile/:id", element: <UserProfile></UserProfile>},
        {path: "authors", element: <Authors></Authors>},
        {path: "create", element: <CreatePost></CreatePost>},
        {path: "posts/categories/:category", element: <CategoryPosts></CategoryPosts>},
        {path: "posts/users/:id", element: <AuthorPost></AuthorPost>},
        {path: "posts/:id/edit", element: <EditPost></EditPost>},
        {path: "posts/:id/delete", element: <DeletePost></DeletePost>},
        {path: "myposts/:id", element: <Dashboard></Dashboard>},
        {path: "logout", element: <Logout></Logout>},
      ]
    }
  ])


  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
