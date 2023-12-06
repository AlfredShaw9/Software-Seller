import { useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'

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
    <>
      <h1>Register</h1>
      <Form method="POST">
        <input type="text" name="username" placeholder='Username' />
        <input type="email" name="email" placeholder='Email' />
        <input type="password" name="password" placeholder='Password' />
        <input type="password" name="passwordConfirmation" placeholder='Confirm password' />
        <button type="submit">Register</button>
        {res && <p>{res.data.message}</p>}
      </Form>
    </>
  )
}