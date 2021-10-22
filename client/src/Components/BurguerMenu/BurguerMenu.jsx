import React from "react";
import { slide as Menu } from 'react-burger-menu'


const BurguerMenu = (props) => {
  return (
    <Menu {...props}>
      <a className="menu-item" href="/">Places</a>
      <a className="menu-item" href="/">Reviews</a>
      <a className="menu-item" href="/">Chats</a>
      <a className="menu-item" href="/">Settings</a>
    </Menu>
  )
};

export default BurguerMenu;
