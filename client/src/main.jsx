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
import ReviewIndex from './components/ReviewIndex.jsx'
import CreateReview from './components/CreateReview.jsx'
import AllBought from './components/Bought.jsx'
import AllSold from './components/Sold.jsx'
import OwnBids from './components/OwnBids.jsx'
import Profile from './components/Profile.jsx'

import { loginUser, registerUser } from './utils/actions/auth.js'
import { getActiveBundles, getAllReviews, getSingleBundle, getBoughtBundles, getSoldBundles } from './utils/loaders/bundles.js'
import { createBid, createBundle, editBundle, deleteBundle } from './utils/actions/bundle.js'
import { createReview } from './utils/actions/review.js'
import { getOwnBids } from './utils/loaders/bids.js'

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
        loader: getActiveBundles
      },
      {
        path: '/buy/:bundleId',
        element: <BundleSingle />,
        loader: async ({ params }) => getSingleBundle(params.bundleId),
        action: async ({ request, params }) => createBid(request, params.bundleId)
      },
      {
        path: '/buy/:bundleId/createbid',
        action: async ({ request, params }) => createBid(request, params.bundleId)
      },
      {
        path: '/buy/:bundleId/edit',
        element: <EditBundle />,
        loader: async ({ params }) => getSingleBundle(params.bundleId),
        action: async ({ request, params }) => editBundle(request, params.bundleId)
      },
      {
        path: '/buy/:bundleId/delete',
        action: async ({ params }) => deleteBundle(params.bundleId)
      },
      {
        path: '/sell',
        element: <CreateBundle />,
        action: async ({ request }) => createBundle(request)
      },
      {
        path: '/reviews',
        element: <ReviewIndex />,
        loader: getAllReviews
      },
      {
        path: '/reviews/yourOpinion',
        element: <CreateReview />,
        action: async ({ request }) => createReview(request)
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/profile/bought',
        element: <AllBought />,
        loader: async ({ request }) => getBoughtBundles(request)
      },
      {
        path: '/profile/sold',
        element: <AllSold />,
        loader: async ({ request }) => getSoldBundles(request)
      },
      {
        path: '/profile/bids',
        element: <OwnBids />,
        loader: async ({ request }) => getOwnBids(request)
      }   
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
