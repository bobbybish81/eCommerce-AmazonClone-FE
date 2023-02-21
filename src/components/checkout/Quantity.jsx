import { newTotal} from '../../modules/index.jsx';
import './Cart.css';

const Quantity = ({ product, setCart}) => {

const decrement = () => {
  const getCart = JSON.parse(localStorage.getItem('MY_CART'));
  const index = getCart.findIndex(item => item.title === product.title);
  if (getCart[index].quantity > 1) {
    getCart[index].quantity = product.quantity - 1;
    getCart[index].total = newTotal(getCart[index].price,  getCart[index].quantity)
    setCart(getCart);
  }
  return;
}

const increment = () => {
  const getCart = JSON.parse(localStorage.getItem('MY_CART'));
  const index = getCart.findIndex(item => item.title === product.title);
  getCart[index].quantity = product.quantity + 1;
  getCart[index].total = newTotal(getCart[index].price,  getCart[index].quantity)
  setCart(getCart);
}

  return (
      <td>
        <div className='quantity'>
          <button className='quantity-input-left' onClick={decrement}>
            &mdash;
          </button>
          <p className='quantity-value'>{product.quantity}</p>
          <button className='quantity-input-right' onClick={increment}>
            &#xff0b;
          </button>  
        </div>
      </td>  
    );
  }


export default Quantity
