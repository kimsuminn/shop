import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Product from './pages/Product';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Cart from './pages/Cart';

import './App.css';

function App() {

  const loginState = useSelector(state => state.login.status);

  const DetailPage = () => {
    return loginState ? <Detail /> : <Navigate to='/login' />
  }

  const CartPage = () => {
    return loginState ? <Cart /> : <Navigate to='/login' />
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<DetailPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
