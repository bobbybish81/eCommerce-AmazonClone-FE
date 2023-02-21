import { compareProductCategory } from '../modules/index.jsx';
import { useFormik } from 'formik';
import axios from 'axios';
import './Admin.css';

const AdminProduct = ({ product, data, setData, role }) => {

    const onSubmit = async (values) => {  
      if (values.delete) {
        try {
          const response = await axios.delete(`http://localhost:8080/api/store/${product.storeId}/products/${product.id}`);
          alert(`${product.title} deleted from store!`)
          setData({
            ...data,
            products: response?.data.sort(compareProductCategory),
            });
          } catch (error) {
            setData({
              ...data,
              errorMessage: error.response?.data.message,
              });
          }
      } else {
        try {
            const response = await axios.patch(`http://localhost:8080/api/store/${product.storeId}/products/${product.id}`, values);
            if (values.price !== product.price) {
              alert(`${product.title} price changed to ${values.price}`)
            }
            if (values.quantity !== product.quantity) {
              alert(`${product.title} quantity changed to ${values.quantity}`)
            }
            setData({
              ...data,
              products: response?.data.sort(compareProductCategory),
              });
            } catch (error) {
              alert(`${error.response?.data.message}`);
            }
      }
    }

    const formik = useFormik({
        initialValues: {
        price: product.price,
        quantity: product.quantity,
        storeId: product.storeId,
        delete: false,
        role: role,
      },
        onSubmit,
    });

    return (
        <>
          <form onSubmit={formik.handleSubmit}>
              <h6 className='admin-header mb-3'>{product.category}</h6>
              <h6 className='d-flex align-items-center justify-content-center' style={{height: '3rem'}}>{product.title}</h6>
              <img src={product.imageUrl} alt={'product to appear'}/>
              <div className='admin-product-update'>
                  <label>Enter New Price</label>
                  <input
                      type='text'
                      name='price'
                      pattern='^\$?[0-9]+(\.[0-9][0-9])?$'
                      placeholder={product.price}
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      maxLength={10}/>
              </div>
              <div className='admin-product-update'>
                  <label>Enter New Quantity</label>
                  <input
                      type='number'
                      name='quantity'
                      placeholder={product.quantity}
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      min={0}/>
              </div>
              <div>
                  <label>Delete Product</label>
                  <input
                      className='checkbox'
                      type='checkbox'
                      name='delete'
                      value={formik.values.delete}
                      onChange={formik.handleChange}/>
              </div>
              <button type='submit'>Submit Changes</button>
          </form>
        </>
    )
}

export default AdminProduct;