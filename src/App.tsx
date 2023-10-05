import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import { UsersPage } from './pages/UsersPage/UsersPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/users' element={<UsersPage/>}/>
      </Routes>
    </Router>
  )
}
export default App
