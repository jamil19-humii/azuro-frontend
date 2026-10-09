import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
// Import the new pages
import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import { CartProvider } from "./CartContext";

import Blog from "./Pages/Blog";
import Footer from "./Components/Footer";

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

import Contact from "./Pages/Contact";
import Shipping from "./Pages/Shipping";
import Returns from "./Pages/Returns";
import FAQ from "./Pages/FAQ";

import BlogDetail from "./Pages/BlogDetail";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";

import { AuthProvider } from "./AuthContext";
import Register from "./Pages/Register";

import Account from "./Pages/Account/index.jsx";
import AccountDetails from "./Pages/Account/AccountDetails";
import OrderHistory from "./Pages/Account/OrderHistory";
import SavedAddresses from "./Pages/Account/SavedAddresses";



const MyContext = createContext();

function App() {
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setselectedCountry] = useState('');
       
    useEffect(() => {
       getCountry("https://countriesnow.space/api/v0.1/countries/");
    }, []);

    const getCountry = async (url) => {
      try { 
        const response = await axios.get(url);
        setCountryList(response.data.data);
        console.log(response.data.data);
      } catch (error) {
         console.error("Could not fetch countries:", error);
      }
    };
    
    const values = {
      countryList,
      setselectedCountry,
      selectedCountry  
    };

    return (
      <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          
<Routes>
  <Route path="/" element={<Home />} />

  {/* Static info pages */}
  <Route path="/contact" element={<Contact />} />
  <Route path="/shipping" element={<Shipping />} />
  <Route path="/returns" element={<Returns />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/checkout" element={<Checkout />} />

  {/* Add this — dedicated shop/search page, no category filter */}
  <Route path="/shop" element={<Shop />} />

  {/* Generic category routes */}
  <Route path="/:category" element={<Shop />} />
  <Route path="/:category/:subcategory" element={<Shop />} />

  {/* Product & Cart */}
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/blogs" element={<Blog />} />
  <Route path="/blog/:id" element={<BlogDetail />} />
  <Route path="/login" element={<Login />} />
  {/*Login and Register routes*/}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


  {/* Account route */}
 
  <Route path="/account" element={<Account />}>
  <Route index element={<AccountDetails />} />
  <Route path="orders" element={<OrderHistory />} />
  <Route path="addresses" element={<SavedAddresses />} />
</Route>


</Routes>
   <Footer />
          
        </MyContext.Provider>
      </BrowserRouter>
      </CartProvider>
      </AuthProvider>
    );
}

export default App;
export { MyContext };