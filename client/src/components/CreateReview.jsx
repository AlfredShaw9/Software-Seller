import { useState, useEffect } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import { activeUser } from '../utils/helpers/common'

export default function createReview(){
  const res = useActionData()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (res?.status === 201) {
      navigate('/reviews')
    }
  }, [res, navigate])

  useEffect(() => {
    if (!activeUser()) navigate('/login')
  }, [])

  const [ formData, setFormData ] = useState({
    description: '',
    rating: '',
  })

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>Tell us what you think</h1>
      <Form method="POST">
        <input type="text" name="description" placeholder='Write your review here'  onChange={handleChange} value={formData.software}/>
        <select name='rating' id="rating" value={formData.rating} onChange={handleChange}>
          <option value='All'>All</option>
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <button type="submit">Submit review</button>
        {res && <p>{res.data.message}</p>}
      </Form>
    </>
  )
}