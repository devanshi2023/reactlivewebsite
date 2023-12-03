import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import './NavBar.css';
import { MainContext } from '../App';

const NavBar = () => {
  const { cart, products, setSearched, navigate } = useContext(MainContext);
  

  let [inputSearch, setinput] = useState('');

  function searchValue(e) {
    setinput(e.target.value);
  }

  function searchOnButton() {
    let SearchedProducts = products.filter((x) => x.title.toLowerCase().includes(inputSearch.toLowerCase()));
    setSearched(SearchedProducts);
    navigate('/search');
  }

  return (
    <div className="navbar">
      <div className='img-ecom'>
       <img
          src='https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-happy-shopping-logo-template_467913-990.jpg?w=740'
          alt="E-Commerce Logo"
          className='img-ecommerce'
        />
      <div className="brand-search">
       
        <NavLink to={'/'} className="brand">
          E-Commerce
        </NavLink>
      </div>
      </div>

      <ul>
      <li>
          <NavLink to={'/'} className="circleBehind">
            Home
            <span className="circleBefore"></span>
            <span className="circleAfter"></span>
          </NavLink>
        </li>
        <li className='cartlink'>
          <NavLink to={'/cart'} className="circleBehind">
            Cart
            <FaCartShopping className="cart-icon" />
            <span className="cart-count">{cart.length}</span>
            <span className="circleBefore"></span>
            <span className="circleAfter"></span>
          </NavLink>
        </li>
      </ul>

      <div>
        <input type="search" onChange={searchValue} name="search" id="search" placeholder='Search...' />
        <button onClick={searchOnButton} className='search'>
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
