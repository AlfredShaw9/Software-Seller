// & Imports
// import { formToObj } from '../helpers/common'

// & Functions
export async function getSingleBundle(id){
  const res = await fetch(`/api/${id}`)
  return res.json()
}