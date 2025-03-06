import { Route, Routes } from "react-router-dom"
import Cart from "./Pages/Cart/Cart"
import  Product from "./Pages/Products/Product"
import Singleproduct from "./Pages/Singleproductdetails/Singleproduct"
function App() {
  return (
    <>
      <Routes>
      <Route path="/products" element={<Product/>} />
      <Route path="/productsdetails/:id" element={<Singleproduct/>} />
      <Route path="/cart" element={<Cart/>} />
    </Routes>
    </>
  )
}

export default App
