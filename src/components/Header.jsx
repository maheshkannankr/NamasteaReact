import { useState, useEffect } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Header = () => {
  const [authBtnLable, setAuthBtnLable] = useState('Login');

  const onClickLogin = () => {
    setAuthBtnLable(authBtnLable === 'Login' ? 'Logout' : 'Login');
  };

  useEffect(() => {}, []);
  return (
    <div className='header'>
      <div className='h_logo'>
        <img src={LOGO_URL} />
      </div>
      <div className='h_navItemsContainer'>
        <ul className='h_navItems'>
          <li>
            <Link to={'/'} className='font_r header_item pointer'>
              Home
            </Link>
          </li>
          <li>
            <Link to={'/about'} className='font_r header_item pointer'>
              About Us
            </Link>
          </li>
          {/*           <li>
            <Link to={'/'} className='font_r header_item pointer'>
              Products
            </Link>
          </li> */}
          <li>
            <Link to={'/contact'} className='font_r header_item pointer'>
              Contact Us
            </Link>
          </li>
          <div onClick={onClickLogin}>
            <Link className='font_r header_item pointer'>{authBtnLable}</Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
