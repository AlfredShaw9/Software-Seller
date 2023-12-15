import axios from 'axios'
import { formToObj, getToken } from '../helpers/common.js'
import { redirect } from 'react-router-dom'

// & Create Bid

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

//  & Create Bundle

export async function createBundle(data) {
  console.log('createBundle action reached')
  return await axios.post('/api/bundles/', data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

//  & Edit Bundle

export async function editBundle(data, id) {
  console.log('editBundle action reached')
  return await axios.put(`/api/bundles/${id}`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

//  & Delete Bundle

export async function deleteBundle(id){
  await axios.delete(`/api/bundles/${id}`, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return redirect('/buy')
}