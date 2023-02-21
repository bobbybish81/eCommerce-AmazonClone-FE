import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product.jsx';
import './Products.css'

const StoreProducts = ({ products, stores }) => {

    const param = useParams();
    const storeProducts = products.filter(product => product.storeId === parseInt(param.id))
    const store = stores.filter(store => store.uniqueStoreId === parseInt(param.id))[0]

    useLayoutEffect(() => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    })

    return (
        <main className='product-page'>
            <h1 className='store-products-header'>All Products listed for: {store.name}</h1>
            <section className='product-list'>{
                storeProducts.map(product => {
                    return (
                        <Product
                            key={product.id}
                            product={product}/>)
                    })
            }
            </section>
        </main>
    )
}

export default StoreProducts;