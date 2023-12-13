import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { setToken } from '../utils/helpers/common'
import { Link } from 'react-router-dom'

// & Login function
export default function Login() {
  const res = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    if (res?.status === 202){
      setToken(res.data.token)
      console.log(res.data.message.replace('Welcome back ',''))
      localStorage.setItem('ss-username',res.data.message.replace('Welcome back ',''))
      navigate('/')
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
        <h1>Login</h1>
        <Form method='POST' className='dataCont'>
          <div className='dataFormFields'>
            <div>
              <label form='email'>Email:</label>
              <input type='email' id='email' name='email'/>
            </div>

            <div>
              <label form='password'>Password:</label>
              <input type='password' id='password' name='password'/>
            </div>
          </div>

          <div className='buttonsCont'>
            <button type='submit'>Login</button>
            <Link to ='/register' className='loggedOut'>Register</Link>
          </div>

          {res && <p>{res.data.message}</p>}
        </Form>
      </div>
    </div>
  )
}