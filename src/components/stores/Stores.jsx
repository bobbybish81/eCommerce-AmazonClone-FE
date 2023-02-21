import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import './Stores.css'

const Stores = ({ stores }) => {

    useLayoutEffect(() => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    })

    return (
        <main className='store-page'>
            <h1 className='store-products-header'>All Stores registered to Saltazon</h1>
            <section className='store-list'>{
                stores.map(store => {
                    return (
                        <article className='store-detail'>
                            <h5 className='store-detail-heading mb-3'>{store.name}</h5>
                            <img className='store-img' src='https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt={store.name}/>
                            <h6>About {store.name}</h6>
                            <p>We invent on behalf of our customers every day to meet their desire for lower prices and better service. One way we guarantee a wide selection of products is through our small and medium businesses around the world selling online and offering more options for customers.</p>
                            <p><b>StoreId: </b>{store.uniqueStoreId}</p>
                            <Link to={`/product/store/${store.uniqueStoreId}`}>View All Products</Link>
                      </article>
                        )
                    })
            }
            </section>
        </main>
    )
}

export default Stores;