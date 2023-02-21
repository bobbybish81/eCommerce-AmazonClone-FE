import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteFromCart, totalItems, totalAmount } from '../../modules/index.jsx';
import Quantity from './Quantity';
import './Cart.css';

const Cart = () => {

  const navigate = useNavigate()
  
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('MY_CART')));

  useLayoutEffect(() => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
    });
  })

  useEffect(() => {
    localStorage.setItem('MY_CART', JSON.stringify(cart));
  }, [cart]);

  return (
      <main className='main'>
        {cart?.length > 0 ?  
          <section className='cart-section'>
            <article className='cart-article'>
              <h1>My Cart</h1>
              <table className='cart-table'>
                <thead>
                  <tr className='table-head'>
                    <th className='first-column' style={{fontWeight: '700'}}>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                {cart?.map((product, index) => {
                  return (
                    <tr key={index} className='table-row'>
                      <th className='first-column' scope='row'>{product.title}</th>
                      <td>{`$${product.price}`}</td>
                      <Quantity
                        product={product}
                        setCart={setCart}/>
                      <td className='remove-btn' onClick={()=> deleteFromCart(product.title, setCart)}>Remove</td>
                      <td className='total'>{`$${product.total}`}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
                <div className='total-items'>
                  <p>Total Items</p>
                  <p>{`${totalItems(cart)}`}</p>
                </div>
                <div className='total-amount'>
                  <p>Total Amount</p>
                  <p>{`$${totalAmount(cart)}`}</p>
                </div>
            </article>
              <div className='checkout-div'>
                <Link to={'/checkout'}>
                  <button className='checkout-btn'>Go To Checkout</button>
                </Link>
              </div>
          </section> :
          <section className='empty-section'>
            <article className='empty-article'>
              <h1>Your Cart is Empty</h1>
                <button
                  className='return-btn'
                  onClick={() => navigate(-1)}>Continue Shopping
                </button>
            </article>
          </section>}
      </main>
  )
}

export default Cart;