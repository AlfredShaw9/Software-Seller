import { useEffect } from 'react'
import { Form, useActionData, useNavigate, Link } from 'react-router-dom'
import regImg from '../assets/log-reg.png'

// & Register function
export default function Register(){
  const res = useActionData()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (res?.status === 201) {
      navigate('/login')
    }
  }, [res, navigate])

  return (
    <div className='logRegBg'>
      <div className='window formWindow'>
        <div className="title-bar">
          <div className="title-bar-text">Log in to Software Seller</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <img src={regImg} />
      <Form method="POST" className='dataCont'>
        <div className='dataFormFields'>
          <p className="instructionMsg">Enter your details below to <span>Register</span>:</p>
          <div>
            <label form='username'>Username:</label>
            <input type="text" name="username" placeholder='Username' />
          </div>

          <div>
            <label form='email'>Email:</label>
            <input type="email" name="email" placeholder='Email' />
          </div>

          <div>
            <label form='password'>Password:</label>
            <input type="password" name="password" placeholder='Password' />
          </div>

          <div>
            <label form='password confirm'>Password Conf:</label>
            <input type="password" name="passwordConfirmation" placeholder='Confirm password' />
          </div>
        </div>
          
        <div className='buttonsCont'>
          <Link to ='/login'>
            <button type='submit'>Login</button>
          </Link>
          <button className='loggedOut'>Register</button>
          {res && <p>{res.data.message}</p>}
        </div>
        
      </Form>
      </div>
    </div>
  )
}