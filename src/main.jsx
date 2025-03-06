import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import ShoppingcartContext from "./Contextprovider/Myshoppingprovider.jsx"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShoppingcartContext>
      <App />
    </ShoppingcartContext>
  </BrowserRouter>
)
