// src/Routes.js
import { Routes, Route } from 'react-router-dom';
import HOME from './pages/home';
import Produtos from './pages/produtos/index.jsx';
import Login from './../src/pages/login/login.jsx';
import Painel from './../src/pages/painel/painel.jsx';

export default function AppRoutes({ cart, setCart }) {
  return (
    <Routes>
      <Route path="/" element={<HOME setCart={setCart} />}   />
      <Route path="/produtos" element={<Produtos cart={cart} setCart={setCart}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Painel' element={<Painel/>}/>

    </Routes>
  );
}

