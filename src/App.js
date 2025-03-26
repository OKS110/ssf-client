import './styles/style.css';
import './styles/style2.css';
import './styles/style3.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; //react-router-dom에서 제공하는 컴포넌트
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx'
import Carts from './pages/Carts.jsx';
import Person from './pages/Person.jsx';
import DetailProducts from './pages/DetailProducts.jsx';
import Order from './pages/Order.jsx';
import { AuthProvider } from './auth/AuthContext.js';
import { ProductProvider } from './context/ProductContext.js';
import ScrollToTop from './location/scrollToTop.js';
import { CustomersProvider } from './context/CustomersContext.js';
import { GuestProvider } from './context/GuestContext.js';
import { OrderProvider } from './context/OrderContext.js';
import { DetailProductProvider } from './context/DetailProductContext.js';
import SearchPage from './components/Search/SearchPage.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import PaymentCancel from './pages/PaymentCancel.jsx';
import PaymentFail from './pages/PaymentFail.jsx';

function App() {
  return (
    <>
    <DetailProductProvider>
    <OrderProvider>
    <CustomersProvider>
    <GuestProvider>
    <ProductProvider>
    <AuthProvider>
        <BrowserRouter>
        <ScrollToTop/> {/* 화면이 렌더링 될 때 스크롤을 최상단으로 이동시키는 함수 */}
          <Routes>
            <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>    
                    <Route path='/signup' element={<Signup/>}></Route>    
                    <Route path='/carts' element={<Carts/>}></Route>    
                    <Route path='/person' element={<Person/>}></Route>
                    <Route path={`/detail/:pid`} element={<DetailProducts/>}></Route>
                    <Route path='/order/:pid' element={<Order/>}></Route>
                    <Route path='/cart/order' element={<Order />} /><Route/>
                    <Route path='/searchPage' element={<SearchPage />}></Route>
                    <Route path='/payment/success' element={<PaymentSuccess />}></Route>
                    <Route path='/payment/cancel' element={<PaymentCancel />}></Route>
                    <Route path='/payment/fail' element={<PaymentFail />}></Route>  
            </Route>
          </Routes>
        </BrowserRouter>
     </AuthProvider>
     </ProductProvider>
     </GuestProvider>
     </CustomersProvider>
     </OrderProvider>
     </DetailProductProvider>
    </>
  );
}

export default App;
