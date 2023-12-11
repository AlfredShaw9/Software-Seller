import { useState, useEffect } from 'react'
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUpload'
import { editBundle } from '../utils/actions/bundle'


// & Register function
export default function EditBundle(){
  const res = useActionData()
  const bundle = useLoaderData()
  const navigate = useNavigate()
  
  // * Navigate to bundles index page on successful submission
  // ! Could we make this go to the bundle single page? 🤔
  // useEffect(() => {
  //   if (res?.status === 200) {
  //     navigate(`/buy/${res.data._id}`)
  //   }
  // }, [res, navigate])

  const [ formData, setFormData ] = useState({
    software: bundle.software,
    version: bundle.version,
    operatingSystem: bundle.operatingSystem,
    releaseYear: bundle.releaseYear,
    description: bundle.description,
    image: bundle.ImageUploadField,
    startPrice: bundle.startPrice,
    auctionEnd: bundle.auctionEnd
  })

  //  Reformats auctionEnd datetime so it can be accepted as default value in form below
  const auctionEndArray = bundle.auctionEnd.split('')
  auctionEndArray.length = 16
  const auctionEndInput = auctionEndArray.join('')

  // Set state on handle change
  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value, status: "active"  })
  }

  // Use handleSubmit function instead of react router dom page action; enables image to be changed
  async function handleSubmit(e){
    try {
      e.preventDefault()
      const response = await editBundle(formData, bundle._id )
      console.log('Response: ',response.status)
      if (response?.status === 200) {
        navigate(`/buy/${bundle._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Edit a live bundle</h1>
      {/* <Form method="POST"> */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="software" placeholder='Software name' defaultValue={bundle.software}   onChange={handleChange} />
        <input type="text" name="version" placeholder='Version' defaultValue={bundle.version}   onChange={handleChange} />
        <input type="number" name="releaseYear" placeholder='Release Year' defaultValue={bundle.releaseYear}   onChange={handleChange} />
        <select name="operatingSystem" id="operatingSystem" defaultValue={bundle.operatingSystem}   onChange={handleChange} >
          <option value="Windows">Windows</option>
          <option value="macOS">macOS</option>
          <option value="Windows, macOS">Windows, macOS</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="description" placeholder='Descripton' defaultValue={bundle.description}   onChange={handleChange} />
        <input type="datetime-local" name="auctionEnd" defaultValue={auctionEndInput}   onChange={handleChange} />
        <ImageUploadField setFormData={setFormData} formData={formData}   onChange={handleChange} />
        <input type="hidden" name="status" defaultValue="active"  onChange={handleChange} ></input>
        <button type="submit">Continue auction</button>
        {res && <p>{res.data.message}</p>}
      {/* </Form> */}
      </form>
    </>
  )
}