import axios from 'axios'
import { formToObj } from '../helpers/common.js'

export async function registerUser(request) {
  const data = await formToObj(request)
  return await axios.post('/api/register', data, {
    validateStatus: () => true,
  })
}

export async function loginUser(request) {
  const data = await formToObj(request)
  return await axios.post('/api/login', data, {
    validateStatus: () => true,
  })
}