import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import BundleSingle from './components/BundleSingle.jsx'
import BundleIndex from './components/BundleIndex.jsx'
import CreateBundle from './components/CreateBundle.jsx'
import EditBundle from './components/EditBundle.jsx'

import { loginUser, registerUser } from './utils/actions/auth.js'
import { getAllBundles, getSingleBundle } from './utils/loaders/bundles.js'
import { createBid, createBundle, editBundle, deleteBundle } from './utils/actions/bundle.js'

import './styles/index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />,
        action: async ({ request }) => registerUser(request)
      },
      {
        path: '/login',
        element: <Login />,
        action: async ({ request }) => loginUser(request)
      },
      {
        path: '/buy',
        element: <BundleIndex />,
        loader: getAllBundles
      },
      {
        path: '/bundles/:bundleId',
        element: <BundleSingle />,
        loader: async ({ params }) => getSingleBundle(params.bundleId),
        action: async ({ request, params }) => createBid(request, params.bundleId),
        action: async ({ params }) => deleteBundle(params.bundleId)
      },
      {
        path: '/bundles/:bundleId/edit',
        element: <EditBundle />,
        loader: async ({ params }) => getSingleBundle(params.bundleId),
        action: async ({ request, params }) => editBundle(request, params.bundleId)
      },
      {
        path: '/sell',
        element: <CreateBundle />,
        action: async ({ request }) => createBundle(request)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
