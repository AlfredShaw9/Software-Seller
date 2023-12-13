import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUpload'
import { createBundle } from '../utils/actions/bundle'
import { activeUser } from '../utils/helpers/common'

// & Register function
export default function CreateBundle(){
  const res = useActionData()
  const navigate = useNavigate()
  
  // * Navigate to bundles index page on successful submission
  // ! Could we make this go to the bundle single page? 🤔
  // useEffect(() => {
  //   if (res?.status === 201) {
  //     navigate('/buy')
  //   }
  // }, [res, navigate])


  // & State
  const [ formData, setFormData ] = useState({
    software: '',
    version: '',
    operatingSystem: 'Windows',
    releaseYear: 2000,
    description: '',
    image: '',
    startPrice: 50,
    auctionEnd: '2023-12-12T00:00'
  })


  // & Effects
  useEffect(() => {
    if (!activeUser()) navigate('/login')
  }, [])


  // & Functions
  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e){
    try {
      e.preventDefault()
      const response = await createBundle(formData)
      console.log('Response: ',response.status)
      if (response?.status === 201) {
        navigate('/buy')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <h1>Sell a bundle</h1>
      {/* <Form method="POST"> */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="software" placeholder='Software name'  onChange={handleChange} value={formData.software}/>
        <input type="text" name="version" placeholder='Version'  onChange={handleChange}  value={formData.version}/>
        <input type="number" name="releaseYear" placeholder='Release Year'  onChange={handleChange}  value={formData.releaseYear}/>
        <select name="operatingSystem" id="operatingSystem" onChange={handleChange}  value={formData.operatingSystem}>
          <option value="Windows">Windows</option>
          <option value="macOS">macOS</option>
          <option value="Windows, macOS">Windows, macOS</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="description" placeholder='Descripton'  onChange={handleChange}  value={formData.description}/>
        <input type="datetime-local" name="auctionEnd" onChange={handleChange}  value={formData.auctionEnd}/>
        <input type="number" name="startPrice" placeholder='Starting Price'  onChange={handleChange}  value={formData.startPrice}/>
        <ImageUploadField setFormData={setFormData} formData={formData} />
        {/* <input type="text" hidden='true' name="status" defaultValue="active"></input> */}
        <button type="submit">Start auction</button>
        {/* {res && <p>{res.data.message}</p>} */}
      </form>
      {/* </Form> */}
    </>
  )
}