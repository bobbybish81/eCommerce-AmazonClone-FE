import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../../modules/index.jsx';
import './Products.css'

const ProductDetail = ({ products, stores }) => {

  const param = useParams();
  const product = products.filter(product => product.id === parseInt(param.id))[0]
  const store = stores.filter(store => store.uniqueStoreId === product.storeId)[0]

  return (
    <main className='product-page'>
      <section className='product-detail-section'>
      <article
            className='product-detail'>
            <h5 className='product-category mb-3'>{product.category}</h5>
            <h5>{product.title}</h5>
            <img src={product.imageUrl} alt={'product to appear'} onClick={()=> navigate(`/product/${product.id}`)}/>
            <h6>Product Description</h6>
            <p>{product.description}</p>
            <section className='d-flex justify-content-between'>
                <p><b>{`Price: ${product.price}`}</b></p>
                <p><b>{`Quantity: ${product.quantity}`}</b></p>
            </section>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </article>
        <article className='product-store-detail'>
          <h5 className='store-detail-heading mb-3'>Store Information</h5>
          <h5>Name: {store.name}</h5>
          <img className='store-img' src='https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt={store.name}/>
          <h6>About {store.name}</h6>
          <p>We invent on behalf of our customers every day to meet their desire for lower prices and better service. One way we guarantee a wide selection of products is through our small and medium businesses around the world selling online and offering more options for customers.</p>
          <p><b>StoreId: </b>{store.uniqueStoreId}</p>
            <Link to={`/product/store/${store.uniqueStoreId}`}>View All Products</Link>
        </article>
      </section>
    </main>
  )
}

export default ProductDetail