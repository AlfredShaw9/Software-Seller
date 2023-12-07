// export async function getOneBundle
// & Imports
// import { formToObj } from '../helpers/common'

// & Functions

export async function getAllBundles() {
  const res = await fetch('/api/bundles')
  return res.json()
}


export async function getSingleBundle(id){
  const res = await fetch(`/api/${id}`)
  return res.json()
}
