import { useState, useLayoutEffect } from 'react';
import AddProductForm from "./AddProductForm.jsx";
import AdminProduct from "./AdminProduct.jsx";
import { BsChevronUp } from 'react-icons/bs';
import './Admin.css';

const AdminPage = ({ data, setData }) => {

    const [displayForm, setDisplayForm] = useState(false)
    const user = JSON.parse(localStorage.getItem('USER'));

    const storeProducts = data?.products.filter(product => product.storeId === user.uniqueStoreId)
    const store = data?.stores.filter(store => store.uniqueStoreId === user.uniqueStoreId)[0]

    useLayoutEffect(() => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
      })

    return (
        <main className='admin-page'>
            <h3 className='admin-header mt-3'>Welcome to the {store?.name} Store</h3>
            <section className='pb-5'>
                <div style={{width: '425px'}} className='mt-5 d-flex justify-content-center align-items-center mx-auto'>
                    <h4 className='admin-header'>Add New Product Form</h4>
                    <BsChevronUp
                        className='arrow-icon'
                        onClick={(() => displayForm ? setDisplayForm(false) : setDisplayForm(true))}
                        style={{transform: displayForm ? 'rotate(0)' : 'rotate(180deg)'}}/>
                </div>
                <AddProductForm
                    data={data}
                    setData={setData}
                    displayForm={displayForm}
                    setDisplayForm={setDisplayForm}
                    role={user.role}
                    storeId={store?.uniqueStoreId}/>
            </section>
            <h4 className='admin-header pt-5'
                style={{borderTop: '1px solid #DCC97E'}}>All Products listed for {store?.name}</h4>
            <section className='admin-product-list'>{
                storeProducts.map(product => {
                    return (
                        <article key={product.id} className='admin-product'>
                        <AdminProduct
                            product={product}
                            data={data}
                            setData={setData}
                            role={user.role}/>
                        </article>)
                    })
            }
            </section>
        </main>
    )
}

export default AdminPage;