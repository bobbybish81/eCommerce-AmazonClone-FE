import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  
  const navigate = useNavigate();
  
  const purchaseHandler = (event) => {
    event.preventDefault();
    
    localStorage.setItem('MY_CART', '[]');
    navigate('/thankyou')
  }

  return (
    <main className='main'>
      <section className='checkout-section'>
      <form className='checkout-form' autoComplete='off' onSubmit={event => purchaseHandler(event)}>
          <h1>Enter name and delivery address</h1>
          <input
            className='input'
            type='text'
            name='name'
            placeholder='First Name' required/>
          <input
            className='input'
            type='text'
            placeholder='Last Name' required/>
          <input
            className='input'
            type='text'
            placeholder='Address' required/>
          <div className='split-div'>
            <input 
              className='split-input-left'
              type='text'
              placeholder='City' required/>
            <input
              className='split-input-right'
              type='text'
              placeholder='Post Code' required/>
          </div>
          <div className='split-div'>
            <input
              className='split-input-left'
              type='text'
              placeholder='Email Address' required/>
            <input
              className='split-input-right'
              type='text'
              placeholder='Mobile No' required/>
          </div>
          <div className='confirm-purchase'>
            <button
              className='purchase-btn'
              type='submit'
              onClick={event => purchaseHandler(event)}>Confirm Purchase</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Checkout