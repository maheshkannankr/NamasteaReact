import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/fonts/font.css';
import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Contact from './components/Contact';
import About from './components/About';
import Error from './components/Error';
import RestaruntMenu from './components/restaruntmenu/RestaruntMenu';

const AppLayout = () => {
  return (
    <div className='appContainer'>
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/city/chennai/:restId',
        element: <RestaruntMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
