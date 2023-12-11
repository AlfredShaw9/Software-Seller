import { redirect } from "react-router-dom";
import { deleteBundle } from "../utils/actions/bundle";

export default async function action({ params }){
  await deleteBundle(params.bundleId)
  return redirect('/')
}