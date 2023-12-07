
export async function getAllBundles() {
  const res = await fetch('/api/bundles')
  return res.json()
}

// export async function getOneBundle