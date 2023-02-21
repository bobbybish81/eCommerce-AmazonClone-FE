import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth } from "react-auth-kit";
import LandingPage from './components/landingpage/LandingPage.jsx';
import Header from './components/header/Header.jsx';
import Cart from './components/checkout/Cart.jsx';
import Checkout from './components/checkout/Checkout.jsx';
import ThankYou from './components/checkout/ThankYou.jsx';
import AdminPage from "./admin/AdminPage.jsx";
import ProductList from './components/products/ProductList.jsx';
import Stores from './components/stores/Stores.jsx';
import StoreProducts from './components/products/StoreProducts.jsx';
import ProductDetail from './components/products/ProductDetail.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import RegForm from './components/login/RegForm.jsx';
import Error from './Error.jsx';
import { compareProductCategory } from './modules/index.jsx';
import './App.css';

const App = () => {

    const [data, setData] = useState({
        loading: false,
        products: [],
        stores: [],
        errorMessage: '',
    })
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState('');

    const search = (products) => {
        return products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
            )
        }

    useEffect(() => {
        setData({...data, loading: true})
        const fetchData = async () => {
            const productData = await fetch('http://localhost:8080/api/products')
            const products = await productData.json();
            const storeData = await fetch('http://localhost:8080/api/store')
            const stores = await storeData.json();
            try {
            setData({
                ...data,
                loading: false,
                products: products.sort(compareProductCategory),
                stores: stores,
                });
            } catch (error) {
                setData({
                ...data,
                loading: false,
                errorMessage: error.message,
                });
            }
        }
        fetchData();
        if (!localStorage.getItem('MY_CART')) {
            localStorage.setItem('MY_CART', JSON.stringify([]))
          }
    },[])
    
    useEffect(()=> {
        const allCategories = data?.products.map(product => product.category);
        const filtered = allCategories?.filter((category, index) => {
            return allCategories.indexOf(category) === index;
        });
        setCategories(filtered.sort());
    }, [data])
    
    return (
        <>
        <Router>
            <Header/>
            {data.errorMessage && (<section className='error'><p>{data.errorMessage}</p></section>)}
            {data.loading && (<section className='loading'><div className='spinner-border text-warning' role='status'>
                <span className='sr-only'></span></div></section>)}
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path='/register' element={<RegForm/>}/>
                <Route exact path='/login' element={<LoginForm/>}/>
                <Route path="*" element={<Error/>}></Route>

                <Route exact path='/home' element={
                    <RequireAuth loginPath={'/'}>
                        <ProductList
                            setQuery={setQuery}
                            products={search(data?.products)}
                            categories={categories}/>
                    </RequireAuth>}/>

                <Route exact path='/stores' element={
                    <RequireAuth loginPath={'/'}>
                        <Stores stores={data?.stores}/>
                    </RequireAuth>}/>

                <Route exact path='/product/store/:id' element={
                    <RequireAuth loginPath={'/'}>
                        <StoreProducts
                            products={data?.products}
                            stores={data?.stores}/>
                    </RequireAuth>}/>

                <Route exact path='/product/:id' element={
                    <RequireAuth loginPath={'/'}>
                        <ProductDetail
                            products={data?.products}
                            stores={data?.stores}/>
                        </RequireAuth>}/>

                <Route exact path='/cart' element={
                    <RequireAuth loginPath={'/'}><Cart/></RequireAuth>}/>

                <Route exact path='/checkout' element={
                    <RequireAuth loginPath={'/'}><Checkout/></RequireAuth>}/>

                <Route exact path='/thankyou' element={
                    <RequireAuth loginPath={'/'}><ThankYou/></RequireAuth>}/>
                    
                <Route exact path='/admin' element={
                    <RequireAuth loginPath={'/'}>
                        <AdminPage
                            data={data}
                            setData={setData}/>
                    </RequireAuth>}/>
            </Routes>
        </Router>
        </>

    )
}

export default App;
