import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import { UsersPage } from './pages/UsersPage/UsersPage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { CategoriesPage } from './pages/CategoriesPage/CategoriesPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path='/orders' element={<OrdersPage/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/categories' element={<CategoriesPage/>}/>
      </Routes>
    </Router>
  )
}
export default App
