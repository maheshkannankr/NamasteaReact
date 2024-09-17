import { useState, useEffect } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/hooks/useOnlineStatus';

const Header = () => {
  const [authBtnLable, setAuthBtnLable] = useState('Login');

  const onLineStatus = useOnlineStatus();

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
          <li className='online_state flex'>{useOnlineStatus() ? '🟢' : '🔴'}</li>
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
