// export async function getOneBundle
// & Imports
import axios from 'axios'
import { getToken } from '../helpers/common.js'
import { redirect } from "react-router-dom"

// & Functions

export async function getActiveBundles() {
  const res = await fetch('/api/bundles/active')
  return res.json()
}

export async function getSingleBundle(id){
  const res = await fetch(`/api/bundles/${id}`)
  return res.json()
}

export async function getAllReviews() {
  const res = await fetch('/api/reviews')
  return res.json()
}

// export async function getSingleReview(id){
//   const res = await fetch(`/api/reviews/${id}`)
//   return res.json()
// }

// & Bought user bundles

export async function getBoughtBundles() {
  const res = await axios.get('/api/bought', {
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

// & Sold user bundles

export async function getSoldBundles() {
  const res = await axios.get('/api/sold', {
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
