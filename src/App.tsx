import * as React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Single } from './pages/Single';
import Write from './pages/Write';
import './style.scss';
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/post/:id',
        element: <Single />
      },
      {
        path: '/write',
        element: <Write />
      }
    ]
  },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> }
]);
const App = () => {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
