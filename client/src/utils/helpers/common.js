
const tokenName = 'SOFTWARE-SELLER-TOKEN'


export async function formToObj(request) {
  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}

export function setToken(token){
  localStorage.setItem(tokenName, token)
}

export function getToken(){
  return localStorage.getItem(tokenName)
}

export function removeToken(){
  localStorage.removeItem(tokenName)
  localStorage.removeItem('ss-username')
}

//& Return id of active user
export function activeUser(){
  const token = getToken()
  if(!token) return null

  // Retrieve middle part
  const b64 = token.split('.')[1]
  // Convert to JSON
  const payload = JSON.parse(atob(b64))
  // * The below is only required if the logins have expiries
  // const exp = payload.exp
  // // Check expiry date not passed
  // if ( exp > (Date.now()/1000)){
    return payload.sub
  // }
}