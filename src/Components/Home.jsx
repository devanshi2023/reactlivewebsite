// Home.js

import React, { useContext, useState } from 'react';
import { MainContext } from '../App';
import Swal from 'sweetalert2';
import './Home.css';

const Home = () => {
  const { products, cart, setCart,setSingleProduct,navigate} = useContext(MainContext);
  const [displayedProducts, setDisplayedProducts] = useState(8);

  

  const AddToCart = (id) => {
    let product = products.find((x) => 
       x.id === id);

    let existing = cart.find((x) => x.id === id);
    if (existing) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Product Already Added',
        showConfirmButton: false,
        timer: 2500,
      });
      return; // Stop execution
    } else {
      setCart([...cart, product]);
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
    // Display additional 8 products when "Show More" is clicked
    setDisplayedProducts((prevCount) => prevCount + 8);
  };

  const AddToSingle = (product) => {
   
    setSingleProduct(product);
    navigate('/singleproduct');
   
  };

  

  return (
    <>
      <div className="home">
        <h1>Products</h1>
        <div className="wrapper">
          {products.slice(0, displayedProducts).map((x) => {
            return (
              
              <div className="class-product" key={x.id}>
                <div className="single-product"  onClick={() => AddToSingle(x)}>
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
           {displayedProducts < products.length && (
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
