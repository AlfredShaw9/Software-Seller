// & Imports
import axios from 'axios'
import { getToken } from '../helpers/common.js'

// & User bids

export async function getOwnBids() {
  const res = await axios.get('/api/ownBids', {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return res.data
}