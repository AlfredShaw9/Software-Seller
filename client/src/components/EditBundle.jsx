import { useState, useEffect } from 'react'
import { Form, useActionData, useLoaderData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUpload'
import { editBundle } from '../utils/actions/bundle'
import editImg from '../assets/Edit.png'


// & Register function
export default function EditBundle(){
  const res = useActionData()
  const bundle = useLoaderData()
  const navigate = useNavigate()
  
  // * State
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
    <div className='window formWindow'>
      <div className="title-bar">
        <div className="title-bar-text">Log in to Software Seller</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <img src={editImg} />
      <form className='dataCont' onSubmit={handleSubmit}>
        <div className='dataFormFields'>
          <p className="instructionMsg">Fields with * are required.</p>
          <div>
            <label form='software'>Software:*</label>
            <input type="text" name="software" placeholder='Software name'  onChange={handleChange} value={bundle.software}/>
          </div>

          <div>
            <label form='version'>Version:*</label>
            <input type="text" name="version" placeholder='Version'  onChange={handleChange}  value={bundle.version}/>
          </div>

          <div>
            <label form='releaseYear'>Release Year:</label>
            <input type="number" name="releaseYear" placeholder='Release Year'  onChange={handleChange}  value={bundle.releaseYear}/>
          </div>

          <div>
            <label form='operatingSystem'>OS:*</label>
            <select name="operatingSystem" id="operatingSystem" onChange={handleChange}  value={bundle.operatingSystem}>
              <option value="Windows">Windows</option>
              <option value="macOS">macOS</option>
              <option value="Windows, macOS">Windows, macOS</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="desc">
          <label form='description'>Description:</label>
          <textarea name="description" placeholder='Descripton'  onChange={handleChange}  value={bundle.description}/>
          {/* <input type="text" name="description" placeholder='Descripton'  onChange={handleChange}  value={formData.description}/> */}
          </div>

          <div>
            <label form='auctionEnd'>Auction End:*</label>
            <input type="datetime-local" name="auctionEnd" onChange={handleChange} value={auctionEndInput}/>
          </div>

          <div>
            <label form='imageUpload'>Image Upload:</label>
            <ImageUploadField setFormData={setFormData} formData={formData} onChange={handleChange} />
          </div>

          {/* <input type="text" hidden='true' name="status" defaultValue="active"></input> */}
        </div>

        <input type="hidden" name="status" defaultValue="active" onChange={handleChange} ></input>

        <div className='buttonsCont'>
          <button type="submit">Start auction</button>
          {res && <p>{res.data.message}</p>}
        </div>

        {/* <input type="text" name="software" placeholder='Software name' defaultValue={bundle.software}   onChange={handleChange} />
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
        {res && <p>{res.data.message}</p>} */}
      </form>
    </div>
  )
}