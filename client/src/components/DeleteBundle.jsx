import { redirect } from "react-router-dom";
import { deleteBundle } from "../utils/actions/bundle";

console.log('rd2')

export default async function action({ params }){
  console.log('rd1')
  await deleteBundle(params.bundleId)
  console.log('rd')
  return redirect('/')
}