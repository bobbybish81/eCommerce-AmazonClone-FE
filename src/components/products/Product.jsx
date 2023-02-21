import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../modules/index.jsx';
import './Products.css'

const Product = ({ product }) => {

    const navigate = useNavigate();

    return (
        <article
            className='product-item'>
            <h6 className='product-category'>{product.category}</h6>
            <h6>{product.title}</h6>
            <img src={product.imageUrl} alt={'product to appear'} onClick={()=> navigate(`/product/${product.id}`)}/>
            <p>{product.description}</p>
            <section className='price-qty-section'>
                <p>{`Price: ${product.price}`}</p>
                <p>{`Quantity: ${product.quantity}`}</p>
            </section>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </article>
    )
}

export default Product;