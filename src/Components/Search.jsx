import React, { useContext } from 'react';
import { MainContext } from '../App';
import Swal from 'sweetalert2';
import './Search.css';

const Search = () => {
  const { searched, products, cart, setCart,navigate,setSingleProduct } = useContext(MainContext);

  
  

  const AddToCart = (id) => {
    const product = products.find((x) => x.id === id);
    const existing = cart.find((x) => x.id === id);

    if (existing) {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Product Already Added',
        showConfirmButton: false,
        timer: 2500,
      });
      return;
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

  const AddToSingle = (product) => {
   
    localStorage.setItem("singleitem",JSON.stringify(product))
    navigate('/singleproduct');
   
  };

  return (
    <div className="home">
      <div className="search-wrapper">
        {searched.length > 0 ? (
          searched.map((x) => (
            <div className="product" key={x.id}>
               <div className="single-product"  onClick={() => AddToSingle(x)}>
              <div className="img">
                <img src={x.img} alt="" />
              </div>
              <div className="middle">
                <h2>{x.title}</h2>
                <h3>
                  <del>${x.price}</del>
                  <span>${Math.trunc((x.price / 100) * (100 - x.discount))}</span>
                </h3>
                </div>
                </div>
                <div className="add">
                  <button onClick={() => AddToCart(x.id)}>Add To Cart</button>
                </div>
                
              
            </div>
          ))
        ) : (
          <p>No search results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
