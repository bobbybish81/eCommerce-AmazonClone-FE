import { Link, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import imgUrl from '../../assets/logo.png';
import './Header.css';

const Header = () => {

  const navigate = useNavigate();
  const signOut = useSignOut();
  
  const user = JSON.parse(localStorage.getItem('USER'));

  const logout = () => {
    alert(`${user.email} has now logged out`)
    localStorage.removeItem('USER')
    localStorage.removeItem('MY_CART')
    navigate('/')
    signOut();
    window.location.reload();
  }

  const adminHandler = () => {
    if (user.role === 'user') {
      alert('You do not have access to view store admin page')
    } else {
      navigate('/admin')
    }
  }

  return (
    <header>
      <img src={imgUrl} alt='logo to appear'/>
      <nav className='d-flex'>
        <ul className='d-flex'>
          {user ? 
          <>
            <li className='navlink'><Link to={'/home'}>All Products</Link></li>
            <li className='navlink'><Link to={'/stores'}>All Stores</Link></li>
            <li className='navlink'><Link to={'/cart'}>View Cart</Link></li>
            <li className='navlink'><a onClick={adminHandler} style={{color: user.role === 'user' ? '#484848' : '#e6d58f'}}>Store Admin</a></li>
            <li className='navlink'><Link to={'/'} onClick={logout}>Logout</Link></li>
          </> : null}
        </ul>
      </nav>
      <div className='login'>
        {user ? <p className='d-flex justify-content-center align-items-center m-0'>{`Logged in as: ${user.email}`}</p> : <>
          <li className='formlink'><Link to={'/login'}>Login</Link></li>
          <li className='formlink'><Link to={'/register'}>Signup</Link></li>
        </>}
      </div>
    </header>
  )
}

export default Header;