import { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import ImageUploadField from './ImageUpload'
import { createBundle } from '../utils/actions/bundle'
import { activeUser } from '../utils/helpers/common'
import createImg from '../assets/Create.png'

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



  // const auctionEndDT = parseInt((new Date().getTime() / (1000)))
  // const auctionEndDate = new Date().toDateString()
  const auctionEndYear = new Date().getFullYear()
  let auctionEndMonth = new Date().getMonth() + 1
  if (auctionEndMonth === 13) auctionEndMonth = 12
  const auctionEndDay = new Date().getDate()
  const auctionEndHour = new Date().getHours() + 1
  const auctionEndMinute = new Date().getMinutes()

  const auctionEnd = `${auctionEndYear}-${auctionEndMonth}-${auctionEndDay}T${auctionEndHour}:${auctionEndMinute}`

  // & State
  const [ formData, setFormData ] = useState({
    software: '',
    version: '',
    operatingSystem: 'Windows',
    releaseYear: 2000,
    description: '',
    image: '',
    startPrice: 50,
    auctionEnd: auctionEnd
    // auctionEnd: '2023-12-12T00:00'
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
    <div className='window formWindow'>
      <div className="title-bar">
        <div className="title-bar-text">Log in to Software Seller</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <img src={createImg} />
      <form className='dataCont' onSubmit={handleSubmit}>
        <div className='dataFormFields'>
          <p className="instructionMsg">Fields with * are required.</p>
          <div>
            <label form='software'>Software:*</label>
            <input type="text" name="software" placeholder='Software name'  onChange={handleChange} value={formData.software}/>
          </div>

          <div>
            <label form='version'>Version:*</label>
            <input type="text" name="version" placeholder='Version'  onChange={handleChange}  value={formData.version}/>
          </div>

          <div>
            <label form='releaseYear'>Release Year:</label>
            <input type="number" name="releaseYear" placeholder='Release Year'  onChange={handleChange}  value={formData.releaseYear}/>
          </div>

          <div>
            <label form='operatingSystem'>OS:*</label>
            <select name="operatingSystem" id="operatingSystem" onChange={handleChange}  value={formData.operatingSystem}>
              <option value="Windows">Windows</option>
              <option value="macOS">macOS</option>
              <option value="Windows, macOS">Windows, macOS</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="desc">
          <label form='description'>Description:</label>
          <textarea name="description" placeholder='Descripton'  onChange={handleChange}  value={formData.description}/>
          {/* <input type="text" name="description" placeholder='Descripton'  onChange={handleChange}  value={formData.description}/> */}
          </div>

          <div>
            <label form='auctionEnd'>Auction End:*</label>
            <input type="datetime-local" name="auctionEnd" onChange={handleChange}  value={formData.auctionEnd}/>
          </div>

          <div>
            <label form='startingPrice'>Start Price:*</label>
            <input type="number" name="startPrice" placeholder='Starting Price'  onChange={handleChange}  value={formData.startPrice} step=".01"/>
          </div>

          <div>
            <label form='imageUpload'>Image Upload:</label>
            <ImageUploadField setFormData={setFormData} formData={formData} />
          </div>

          {/* <input type="text" hidden='true' name="status" defaultValue="active"></input> */}
        </div>

        <div className='buttonsCont'>
          <button type="submit">Start auction</button>
          {res && <p>{res.data.message}</p>}
          {console.log(res?.data)}
        </div>

      </form>
    </div>
  )
}