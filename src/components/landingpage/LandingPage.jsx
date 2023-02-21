import { useLayoutEffect } from 'react';
import './LandingPage.css';

const LandingPage = () => {

  useLayoutEffect(() => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth',
    });
})
  
  return (
    <main className='landing-page'>
    </main>
  )
}

export default LandingPage