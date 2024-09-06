import { LOGO_URL } from '../utils/constants';

const Header = () => {
  return (
    <div className='header'>
      <div className='h_logo'>
        <img src={LOGO_URL} />
      </div>
      <div className='h_navItemsContainer'>
        <ul className='h_navItems'>
          <li>
            <a className='font_r header_item'>Home</a>
          </li>
          <li>
            <a className='font_r header_item'>About Us</a>
          </li>
          <li>
            <a className='font_r header_item'>Products</a>
          </li>
          <li>
            <a className='font_r header_item'>Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
