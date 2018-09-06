import React from 'react';

function NavBar({numberOfUsers}) {
  // Render
  return(
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <h3>{numberOfUsers} {numberOfUsers > 1 ? 'users' : 'user'} online</h3>
    </nav>
  );
}

export default NavBar;
