// & Imports
import axios from 'axios'
import { getToken } from '../helpers/common.js'
import { redirect } from "react-router-dom"

// & User bids

export async function getOwnBids() {
  const res = await axios.get('/api/ownBids', {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  if (!getToken()) {
    return redirect("/login");
  }
  return res.data
}