// & Imports
// import { formToObj } from '../helpers/common'

// & Functions
export async function getSingleBundle(id){
  const res = await fetch(`/api/bundles/${id}`)
  return res.json()
}