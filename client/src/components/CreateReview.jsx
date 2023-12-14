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
    <div className='window formWindow'>
      <div className="title-bar">
        <div className="title-bar-text">Log in to Software Seller</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <h1>Tell us what you think</h1>
      <Form method="POST" className='dataCont'>
        <div className='dataFormFields'>
          <div className="desc">
            <label form='description'>Your review:</label>
            <textarea name="description" placeholder='Write your review here'  onChange={handleChange} value={formData.software}/>
          </div>

          <div>
            <label form='rating'>Rating:</label>
            <select name='rating' id="rating" value={formData.rating} onChange={handleChange}>
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>

        <button type="submit">Submit review</button>
        {res && <p>{res.data.message}</p>}
      </Form>
    </div>
  )
}