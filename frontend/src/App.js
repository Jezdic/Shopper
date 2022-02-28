import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import PlaceOrder from "./pages/PlaceOrder";
import EditUser from "./pages/EditUser";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shipping' element={<Shipping />} />
        {/* <Route path='/placeorder' element={<PlaceOrder />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductPage />} />
        {/* <Route path='/admin/'>
          <Route path='users' element={<UsersPage />} />
        </Route> */}
        <Route path='/admindashboard/'>
          <Route path='' element={<Dashboard />} />
          <Route path='user/:id' element={<EditUser />} />
          <Route path='product/:id' element={<EditProduct />} />
        </Route>
        <Route path='/success' element={<PaymentSuccess />} />
        <Route path='/cart/'>
          <Route path='' element={<Cart />} />
          <Route path=':id' element={<Cart />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
