import axios from 'axios';
import { useFormik } from 'formik';
import './Admin.css';

function AddProductForm({ data, setData, displayForm, setDisplayForm, role, storeId }) {

    const onSubmit = async (values) => {
      setDisplayForm(false)
        try {
        const response = await axios.post(`http://localhost:8080/api/store/${storeId}/products`, values);
        alert(`${values.title} added to store`)
        setData({
          ...data,
          products: response?.data.sort(compareProductCategory),
          });
        window.location.reload();
        } catch (error) {
          setData({
            ...data,
            errorMessage: error.response?.data.message,
            });
          window.location.reload();
        }
    }

    const formik = useFormik({
        initialValues: {
        title: '',
        description: '',
        imageUrl: 'https://dummyimage.com/100x100/DCC97E/000000.png&text=Saltazon+Online+Stores',
        category: '',
        price: '',
        quantity: '',
        role: role,
      },
        onSubmit,
    });

    return (
        <form
            className='product-form'
            style={{height: displayForm ? 'fit-content' : '0rem'}}
            onSubmit={formik.handleSubmit}>
          <input
            className='input'
            type='text'
            name='title'
            placeholder='Enter Product Name'
            value={formik.values.title}
            onChange={formik.handleChange}
            required/>
          <input
            className='input'
            type='text'
            name='description'
            placeholder='Enter Product Description'
            value={formik.values.description}
            onChange={formik.handleChange}
            required/>
          <input
            className='input'
            type='text'
            name='imageUrl'
            placeholder='Enter Image URL'
            value={formik.values.imageUrl}
            onChange={formik.handleChange}/>
          <div className='split-div'>
            <input 
              className='split-input-left'
              type='text'
              name='category'
              placeholder='Enter Product Category'
              value={formik.values.category}
              onChange={formik.handleChange}
              required/>
            <p className='storeId'>Store Id: {storeId}</p>
          </div>
          <div className='split-div'>
            <input
              className='split-input-left'
              type='text'
              name='price'
              placeholder='Enter Price $'
              value={formik.values.price}
              onChange={formik.handleChange}
              required/>
            <input
              className='split-input-right'
              type='number'
              name='quantity'
              placeholder='Enter Quantity'
              value={formik.values.quantity}
              onChange={formik.handleChange}
              required/>
          </div>
          <div className='addProduct-div'>
            <button
              className='addProduct-btn'
              type='submit'>Submit</button>
          </div>
        </form>
    )
}

export default AddProductForm;