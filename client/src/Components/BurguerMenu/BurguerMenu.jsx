import React, { useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { UserContext } from '../../Contexts/userContext';

const BurguerMenu = ({ props, logout }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Menu {...props}>
      <a className='menu-item' href='/'>
        Places
      </a>
      <a className='menu-item' href='/'>
        Reviews
      </a>
      <a className='menu-item' href='/'>
        Chats
      </a>
      <a className='menu-item' href='/'>
        Settings
      </a>

      <button className='secondary_button logoutmenubutton' onClick={logout}>
        Logout
      </button>
    </Menu>
  );
};

export default BurguerMenu;
