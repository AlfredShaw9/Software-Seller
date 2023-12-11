import axios from 'axios'
import { formToObj, getToken } from '../helpers/common.js'

//  & Create Bundle

export async function createReview(request) {
  const data = await formToObj(request)
  return await axios.post('/api/reviews/', data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}