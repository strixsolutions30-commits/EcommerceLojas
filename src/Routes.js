import { Routes, Route } from 'react-router-dom';
import HOME from './pages/home';
import Produtos from './pages/produtos/index.jsx';
import Login from './../src/pages/login/login.jsx';
import EstoqueRoupas from './../src/pages/estoque/estoque.jsx';
import Sidebar from './comp_painel/sidebar.jsx';

export default function AppRoutes({ cart, setCart }) {
  return (
    <Routes>
      <Route path="/" element={<HOME setCart={setCart} />}   />
      <Route path="/produtos" element={<Produtos cart={cart} setCart={setCart}/>}/>
      <Route path='/login' element={<Login/>}/>
     <Route  path='/estoque' element={<Sidebar><EstoqueRoupas /></Sidebar>}/>
    </Routes>
  );
}

