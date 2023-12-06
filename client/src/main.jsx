import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './components/Home.jsx'

import '../styles/index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
