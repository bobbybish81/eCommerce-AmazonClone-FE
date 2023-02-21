import { useState, useLayoutEffect } from 'react';
import Search from "../search/Search.jsx";
import Product from './Product.jsx';
import Pages from './Pages.jsx';
import './Products.css'

const ProductList = ({ setQuery, products, categories }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;
  
    const lastIndex = currentPage * cardsPerPage;
    const firstIndex = lastIndex - cardsPerPage;
    const currentResults = products.slice(firstIndex, lastIndex)

    useLayoutEffect(() => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    })

    return (
        <main className='product-page'>
             <Search
                setQuery={setQuery}
                setCurrentPage={setCurrentPage}
                categories={categories}/>
            <section className='product-list'>{
                currentResults.map(product => {
                    return (
                        <Product
                            key={product.id}
                            product={product}/>)
                    })
            }
            </section>
            <section className='pagination'>
                <Pages
                    totalPages={Math.ceil(products.length/cardsPerPage)}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}/>
            </section>
        </main>
    )
}

export default ProductList;