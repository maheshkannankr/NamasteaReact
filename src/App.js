import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/fonts/font.css';
import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/Footer';

const AppLayout = () => {
  return (
    <div className='appContainer'>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
