import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import './Forms.css';

function RegForm() {

  const navigate = useNavigate();

  const [registration, setRegistration] = useState({
    email: '',
    registered: false,
    alreadyRegistered: false,
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPwd = () => setShowConfirmPwd((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('https://saltazon-online.cyclic.app/user/register', values);
      setRegistration(response.data)
      setTimeout(() => navigate('/login'), 5000);
    }
    catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message)
    }
  }

  const formik = useFormik({
    initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    uniqueStoreId: '',
  },
    onSubmit,
  });

  return (
    <main className='reg-page pt-5'>
      {!registration.registered ? 
      <form
        onSubmit={formik.handleSubmit}
        className='reg-form'>
        <CloseIcon
          className='close-icon'
          onClick={() => navigate('/')}/>
        <p className='pt-4'>Sign up to</p>
        <h3 className='mb-4'>SALTAZON</h3>
        <p className='text-muted'>Please complete the form below</p>
        <div className='mx-auto px-5 mb-4'>
          <input
            className='text-input w-100 p-2'
            type='email'
            name='email'
            placeholder='Add email address'
            value={formik.values.email}
            onChange={formik.handleChange}
            onClick={()=> setShowMessage(false)}
            autoComplete='off'
            maxLength={35}
            required/>
        </div>
        <div className='mx-auto px-5 mb-4'>
          <div className='text-input w-100 d-flex p-0 bg-white'>
            <input
              className='w-100 p-2 m-0'
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Add password'
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
              value={formik.values.password}
              onChange={formik.handleChange}
              onClick={()=> setShowMessage(true)}
              autoComplete='off'
              maxLength={50}
              required/>
            <IconButton
              className='py-0' 
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        {showMessage ? 
          <div className='pwd-message mb-4'>
            <p>Password must contain the following:</p>
            <p>
              A <b>lowercase </b>letter; A <b>capital (uppercase)</b> letter; A <b>number</b>; Minimum <b>8 characters</b>
            </p>
          </div> : null}
        <div className='mx-auto px-5 mb-4'>
          <div className='text-input w-100 d-flex p-0 bg-white'>
            <input
              className='w-100 p-2 m-0'
              type={showConfirmPwd ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onClick={()=> setShowMessage(false)}
              autoComplete='off'
              maxLength={50}
              required/>
            <IconButton
              className='py-0' 
              aria-label='toggle password visibility'
              onClick={handleClickShowConfirmPwd}
              onMouseDown={handleMouseDownPassword}>
              {showConfirmPwd ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        <div className='roles d-flex justify-content-between mx-auto px-5 mb-4'>
          <select className='p-2' name='role' onChange={formik.handleChange} value={formik.values.role}>
            <option selected disabled>Select role</option>
            <option>user</option>
            <option>admin</option>
          </select>
          <input
            className='w-30 d-flex p-2 bg-white'
            type='number'
            name='uniqueStoreId'
            placeholder='Add store id'
            value={formik.values.uniqueStoreId}
            onChange={formik.handleChange}
            onClick={()=> setShowMessage(false)}
            min={1}
            max={10}
            autoComplete='off'
            required/>
        </div>
        <p className='error-message m-0'>{error}</p>
        <button
          className='form-btn'
          type='submit'>
          Submit
        </button>
      </form> :
      <div className='reg-form p-5'>
        <h5 className='text-center m-auto'>{`Welcome to Saltazon ${registration.email} !`}</h5>
        <p className='text-center m-4'>You will be now redirected to the login page</p>
      </div>}
    </main>
  )
}

export default RegForm;