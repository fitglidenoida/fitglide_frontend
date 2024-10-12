import React from 'react';

const NavLink = () => {
  return(
    <ul className="nav__links">
      <li className="link"><a href="/">Home</a></li>
      <li className="link"><a href="services">Program</a></li>
      <li className="link"><a href="membership">Membership</a></li>
      <li className="link"><a href="about">About</a></li>
    </ul>
  );
};

export default NavLink;