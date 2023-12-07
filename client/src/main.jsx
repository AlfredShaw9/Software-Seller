import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import BundleSingle from './components/BundleSingle.jsx'

import { loginUser, registerUser } from './utils/actions/auth.js'
import { createBid } from './utils/actions/bundle.js'
import { getSingleBundle } from './utils/loaders/bundles.js'

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
        path: '/bundles/:bundleId',
        element: <BundleSingle />,
        loader: async ({ params }) => getSingleBundle(params.bundleId),
        action: async ({ request, params }) => createBid(request, params.bundleId)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
