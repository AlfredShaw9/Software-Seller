import { redirect } from "react-router-dom";
import { createBid } from "../utils/actions/bundle";

export default async function action({ request, params }){
  console.log('Create bid route reached')
  await createBid(request, params.bundleId)
  return redirect('/buy')
}