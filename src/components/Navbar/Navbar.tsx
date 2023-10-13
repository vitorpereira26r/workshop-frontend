import React from 'react'
import "./Navbar.css"

export const Navbar: React.FC = () => {
  return (
    <header>
        <h1 className='title-navbar'>Workshop App</h1>
        <nav className="navbar-me">
            <ul className='nav-link-me'>
                <li><button className='btn-li-navbar'><a href="/">Home</a></button></li>
                <li><button className='btn-li-navbar'><a href="/users">Users</a></button></li>
                <li><button className='btn-li-navbar'><a href="/orders">Orders</a></button></li>
                <li><button className='btn-li-navbar'><a href="/products">Products</a></button></li>
                <li><button className='btn-li-navbar'><a href="/categories">Categories</a></button></li>
            </ul>
        </nav>
    </header>
  )
}
