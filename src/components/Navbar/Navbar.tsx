import React from 'react'
import "./Navbar.css"

export const Navbar: React.FC = () => {
  return (
    <header>
        <h1>Workshop App</h1>
        <nav className="navbar">
            <ul className='nav-link'>
                <li><button className='btn-li'><a href="/">Home</a></button></li>
                <li><button className='btn-li'><a href="/users">Users</a></button></li>
                <li><button className='btn-li'><a href="/orders">Orders</a></button></li>
                <li><button className='btn-li'><a href="/products">Products</a></button></li>
                <li><button className='btn-li'><a href="/categories">Categories</a></button></li>
            </ul>
        </nav>
    </header>
  )
}
