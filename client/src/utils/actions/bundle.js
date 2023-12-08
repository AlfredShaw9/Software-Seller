import axios from 'axios'
import { formToObj, getToken } from '../helpers/common.js'

// ! Will definitely need to review this part

export async function createBid(request, id) {
  console.log('createBid action reached')
  const data = await formToObj(request)
  data.bundle = id
  console.log(data)
  return await axios.post(`/api/bundles/${id}`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}