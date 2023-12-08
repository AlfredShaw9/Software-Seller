import axios from "axios"
export default function ImageUploadField({ formData, setFormData }){

  async function handleImageUpload(e){
    const preset = import.meta.env.VITE_UPLOAD_PRESET
    const file = e.target.files[0]
    const endpoint = import.meta.env.VITE_UPLOAD_URL
  

    // Create form
    const data = new FormData()
    data.append('file',file)
    data.append('upload_preset',preset)

    // formData to Cloudinary endpoint
    const { data: { secure_url } } = await axios.post(endpoint, data)
    // ! Below formData is not being set correctly
    setFormData({ ...FormData, image: secure_url})
    console.log('Form data: ',formData)
  }

  return (
    <>
      {formData.image ?
      <img src = {formData.image} alt="Image"/>
      :
      <input type='file' name='image' onChange={handleImageUpload} />
      }
    </>
  )
}