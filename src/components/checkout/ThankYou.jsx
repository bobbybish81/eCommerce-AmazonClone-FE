import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgUrl from '../../assets/logo.png';
import './Checkout.css';

const ThankYou = () => {

  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
    });
  })

  useEffect(() => {
    setTimeout(()=> {
      navigate('/home');
    }, 5000)
  }, [])

  return (
    <main className='main'>
      <section className='checkout-section'>
        <article className='message-article'>
          <h1 className='purchase-message'>Thank you for your purchase!</h1>
          <div>
            <img src={imgUrl} alt='logo to appear'/>
          </div>
        </article> 
      </section>
    </main>
  )
}

export default ThankYou