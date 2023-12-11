// Home.js

import React, { useContext, useState,useEffect } from 'react';
import { MainContext } from '../App';
import Swal from 'sweetalert2';
import './Home.css';

const Home = () => {
  const { products, cart, setCart, setSingleProduct, navigate } = useContext(MainContext);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState('lowToHigh');

  const filterProducts = (category) => {
    if (category === 'all') {
      // Show all products if 'all' is selected
      setFilteredProducts(products);
      setDisplayedProducts(8);
      console.log(products)
    } else {
      // Filter products based on the selected category
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
      console.log(filtered)
      setDisplayedProducts(8);
    }
  };

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
    let sortedProducts = [...filteredProducts];

    if(selectedOption === ''){
      sortedProducts = [...products];
    }
    
    else if (selectedOption === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(8);
    setFilteredProducts(sortedProducts);
  };












  const AddToCart = (id) => {
    let product = products.find((x) => x.id === id);

    let existing = cart.find((x) => x.id === id);
    if (existing) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Product Already Added',
        showConfirmButton: false,
        timer: 1500,
      });
      return; // Stop execution
    } else {
      setCart([...cart, product]);
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Added to Cart',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleShowMore = () => {
    setDisplayedProducts((prevCount) => prevCount + 8);
  };

  


  const AddToSingle = (product) => {
   localStorage.setItem("singleitem",JSON.stringify(product))
    navigate('/singleproduct');
  };

  // const handleCategoryChange = (category) => {
  //   setDisplayedProducts(8); // Reset displayed products when changing category
  //   setSelectedCategory(category);
  // };

  return (
    <>
      <div className="home">
        <h1>Products</h1>
        <div className="category-buttons">
          <button onClick={() => filterProducts('all')}>All</button>
          <button onClick={() => filterProducts('earbud')}>Earbud</button>
          <button onClick={() => filterProducts('shoes')}>Shoes</button>
          <button onClick={() => filterProducts('tshirt')}>T-Shirt</button>
          <button onClick={() => filterProducts('tshirtwomen')}>Women T-Shirt </button>

          <select id="sort"  className="sort-select" onChange={(e) => handleSortChange(e.target.value)}>
           
            <option value="">Select Range</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>



        <div className="wrapper">
          {filteredProducts.slice(0, displayedProducts).map((x) => {
            return (
              <div className="class-product" key={x.id}>
                <div className="single-product" onClick={() => AddToSingle(x)}>
                  <div className="img">
                    <img src={x.img} alt="" />
                  </div>
                  <div className='middle'></div>
                  <h2>{x.title}</h2>
                  <h3>
                    <del>${x.price}</del>
                    <span>${Math.trunc((x.price / 100) * (100 - x.discount))}</span>
                  </h3>
                </div>
                <div className="add">
                  <button onClick={() => AddToCart(x.id)}>Add To Cart</button>
                </div>
              </div>
            );
          })}
          {displayedProducts < filteredProducts.length && (
            <button className="show-more-button" onClick={handleShowMore}>
              Show More..
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
