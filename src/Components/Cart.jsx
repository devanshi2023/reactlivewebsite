import React, { useContext, useEffect } from 'react';
import { MainContext } from '../App';
import './cart.css';
import Swal from 'sweetalert2';

const Cart = () => {
  const { cart, setCart } = useContext(MainContext);

 
  // Function to remove an item from the cart
  const removeItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);

        if (updatedCart.length === 0) {
          // Clear localStorage if the updatedCart is empty
          localStorage.removeItem('cart');
        } else {
          // Save the updatedCart to localStorage
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        }

        Swal.fire('Removed!', 'Your item has been removed.', 'success');
      }
    });
  };


  // Function to increase the quantity of an item in the cart
  const qtyIncrease = (id) => {
    let obj = cart.find((x) => x.id === id);
    console.log(obj);
    obj.qty++;

    setCart([...cart]);
  };

  // Function to decrease the quantity of an item in the cart
  const qtyDecrease = (id) => {
    let obj = cart.find((x) => x.id === id);

    if (obj.qty <= 1) {
      alert('Minimum 1 quantity required');
    } else {
      obj.qty--;
      setCart([...cart]);
    }
  };
  // useEffect(() => {
  //   // Load the cart from localStorage on initial render
  //   const storedCart = JSON.parse(localStorage.getItem('cart'));
  //   if (storedCart && storedCart.length > 0) {
  //     setCart(storedCart);
  //   }
  // }, [setCart]);
  return (
    <div className="cart">
      {cart.length === 0 ? (
        <h4>Cart is empty !</h4>
      ) : (
        <div className="cart-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th className="cart-title">Title</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img className="cart-css" src={item.img} alt="" />
                  </td>
                  <td className="cart-title">{item.title}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button className="cart-button-quantity" onClick={() => qtyIncrease(item.id)}>
                      +
                    </button>
                    <span style={{ display: 'inline-block', margin: '0 5px' }}>{item.qty}</span>
                    <button className="cart-button-quantity" onClick={() => qtyDecrease(item.id)}>
                      -
                    </button>
                  </td>
                  <td>
                    <div>
                      <del>${item.price}</del> ${(Math.trunc(item.price - ((item.price * item.discount) / 100)) * item.qty)}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => removeItem(item.id)} className="cart-button">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="total" colSpan={3}>
                  Total :
                </td>
                <td className="price" colSpan={2}>
                  ${cart.reduce((total, x) => (total += Math.trunc((x.price / 100) * (100 - x.discount)) * x.qty), 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;

