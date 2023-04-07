// import React from 'react';
import NavBar from './NavBar';
import logo from '../images/logo.svg';

function Header({ email, onLogOut}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto" className="header__image"/>
      <NavBar email={email} onLogOut={onLogOut} />
    </header>
  )
}

export default Header;
