import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../App';
import Swal from 'sweetalert2';
import './SingleProduct.css'


const SingleProduct = () => {
  const { single, cart, setCart, products,navigate,setSingleProduct } = useContext(MainContext);
  const [productmain, setproductmain] = useState(single.img)

  const Producthandler=()=>
{
   let product= JSON.parse(localStorage.getItem("singleitem"))
   setSingleProduct(product)

  }

  useEffect(() => {
    Producthandler()
}, [])
  useEffect(()=>{
    setproductmain(single.img)
  },[single])



  function showmainimage(image) {
    setproductmain(image)
  }
  const AddToCart = (id) => {
    let product = products.find((x) => {
      return x.id === id;
    });

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


  const QtyIncrease = (productqty) => {


    productqty.qty++;
    setCart([...cart]);

  }
  const QtyDecrease = (productqty) => {

    if (productqty.qty <= 1) {
      alert('minimum 1 quantity required')
    } else {
      productqty.qty--
      setCart([...cart])


    }
  }

  function GoToCart(){
    navigate('/cart')
  }








  return (
    <>
      <div className="Single-Product">
        <div className="col-1">
          <div className="main">
            <img src={productmain} alt="" />
          </div>
          <div className="below-image">
            <img src={single.img} onClick={() => showmainimage(single.img)} alt="" />
            <img src={single.img2} onClick={() => showmainimage(single.img2)} alt="" />
            <img src={single.img3} onClick={() => showmainimage(single.img3)} alt="" />
            <img src={single.img4} onClick={() => showmainimage(single.img4)} alt="" />
            <img src={single.img5} onClick={() => showmainimage(single.img5)} alt="" />
          </div>

        </div>
        <div className="col-2">
          <div className='title>'>
            <h4 className='title'>{single.title}</h4>
          </div>
          <div className='price'>
            <p className='price'>Original Price:<del>${single.price}</del></p>
            <p className='price'>Discounted Price:${Math.trunc((single.price / 100) * (100 - single.discount) * single.qty)}</p>
          </div>
          {
          cart.find((x)=>x.id == single.id) ? <button className='go-to-cart' onClick={() => GoToCart()}>Go to cart</button> :
          <div>
          <div className='quantity'>
              <span>Quantity : </span>
              <button className='single-quantity' onClick={() => QtyIncrease(single)}>+</button>
              <span style={{ display: 'inline-block', margin: '0 5px' }}>{single.qty}</span>
              <button className='single-quantity' onClick={() => QtyDecrease(single)}>-</button>
            </div>

              <div className='add-to-cart-search'>
                <button className='single-button' onClick={() => AddToCart(single.id)}>Add to Cart</button>
              </div>

          </div>}
          
        


        </div>

      </div >
    </>
  );
};


export default SingleProduct;
