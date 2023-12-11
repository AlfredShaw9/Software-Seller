// export async function getOneBundle
// & Imports
// import { formToObj } from '../helpers/common'

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

export async function getSingleReview(id){
  const res = await fetch(`/api/reviews/${id}`)
  return res.json()
}
