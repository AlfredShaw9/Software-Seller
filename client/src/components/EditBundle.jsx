import { useState, useEffect } from 'react'
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUpload'


// & Register function
export default function editBundle(){
  const res = useActionData()
  const bundle = useLoaderData()
  const navigate = useNavigate()
  
  // * Navigate to bundles index page on successful submission
  // ! Could we make this go to the bundle single page? 🤔
  useEffect(() => {
    if (res?.status === 202) {
      navigate(`/bundles/${res.data._id}`)
    }
  }, [res, navigate])

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

  return (
    <>
      <h1>Edit a live bundle</h1>
      <Form method="POST">
        <input type="text" name="software" placeholder='Software name' defaultValue={bundle.software} />
        <input type="text" name="version" placeholder='Version' defaultValue={bundle.version} />
        <input type="number" name="releaseYear" placeholder='Release Year' defaultValue={bundle.releaseYear} />
        <select name="operatingSystem" id="operatingSystem" defaultValue={bundle.operatingSystem} >
          <option value="Windows">Windows</option>
          <option value="macOS">macOS</option>
          <option value="Windows, macOS">Windows, macOS</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="description" placeholder='Descripton' defaultValue={bundle.description} />
        <input type="datetime-local" name="auctionEnd" defaultValue={auctionEndInput} />
        <ImageUploadField setFormData={setFormData} formData={formData} />
        <button type="submit">Continue auction</button>
        {res && <p>{res.data.message}</p>}
      </Form>
    </>
  )
}