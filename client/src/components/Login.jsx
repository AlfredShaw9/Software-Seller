import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { setToken } from '../utils/helpers/common'

// & Login function
export default function Login() {
  const res = useActionData()
  const navigate = useNavigate()

  useEffect(() => {
    if (res?.status === 202){
      setToken(res.data.token)
      navigate('/')
    }
  }, [res, navigate])

  return (
    <>
      <h1>Login</h1>
      <Form method='POST'>
        <input type='email' name='email' placeholder='Email'/>
        <input type='password' name='password' placeholder='Password'/>
        <button type='submit'>Login</button>
        {res && <p>{res.data.message}</p>}
      </Form>
    </>
  )
}