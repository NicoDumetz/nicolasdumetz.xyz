/* React */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"

/* Styles */
import './index.css'

/* Contexts */
import { WindowSizeProvider } from "./contexts/WindowSizeContext/WindowSizeContext"
import { router } from "./router"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WindowSizeProvider>
      <RouterProvider router={router} />
    </WindowSizeProvider>
  </React.StrictMode>,
)
