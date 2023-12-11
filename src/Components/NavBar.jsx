import React, { useContext, useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import './NavBar.css';
import { MainContext } from '../App';

const NavBar = () => {
  const { cart, products, setSearched, navigate } = useContext(MainContext);

  

  let [inputSearch, setinput] = useState('');

  useEffect(() => {
    // Retrieve searched products and input text from localStorage on component mount
    const storedSearchedProducts = localStorage.getItem('searchedProducts');
    const storedInputSearch = localStorage.getItem('inputSearch');

    if (storedSearchedProducts) {
      setSearched(JSON.parse(storedSearchedProducts));
    }

    if (storedInputSearch) {
      setinput(storedInputSearch);
    }
  }, [setSearched]);

  function searchValue(e) {
    const newText = e.target.value;
    setinput(newText);

    // Trigger a search when the input text changes
    performSearch(newText);
  }

  function handleKeyDown(e) {
    // Check if the key pressed is Enter (key code 13)
    if (e.key === 'Enter') {
      performSearch();
    }
  }

  function performSearch(searchText) {
    if (searchText.trim() === '') {
      // If the search input is empty, navigate to the home page
      navigate('/');
    } else {
      // If the search input is not empty, filter the products and navigate to the search page
      const searchedProducts = products.filter((x) =>
        x.title.toLowerCase().includes(searchText.toLowerCase())
      );

      // Save searched products and input text to localStorage
      localStorage.setItem('searchedProducts', JSON.stringify(searchedProducts));
      localStorage.setItem('inputSearch', searchText);

      setSearched(searchedProducts);
      navigate('/search');
    }
  }

  return (
    <div className="navbar">
      <div className="img-ecom">
        <img
          src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-happy-shopping-logo-template_467913-990.jpg?w=740"
          alt="E-Commerce Logo"
          className="img-ecommerce"
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
        <li className="cartlink">
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
      <input
          type="search"
          onChange={searchValue}
          onKeyDown={handleKeyDown}
          value={inputSearch}
          name="search"
          id="search"
          placeholder="Search..."
        />
        <button onClick={() => performSearch(inputSearch)} className="search">
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
