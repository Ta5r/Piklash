import React from 'react';
import {NavLink} from 'react-router-dom';
const Home = () => {
  return <div>
    <h1>Piklash</h1>
    <NavLink  to="/login">Login</NavLink>
    <br />
    <br />
    <br />
    <NavLink  to="/register">SigUP</NavLink>
  </div>;
};

export default Home;
