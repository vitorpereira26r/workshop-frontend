import React from 'react'
import "./Navbar.css"

export const Navbar: React.FC = () => {
  return (
    <header>
        <h1>Workshop App</h1>
        <nav className="navbar">
            <ul className='nav-link'>
                <li><button className='btn-li'><a href="/">Home</a></button></li>
                <li><button className='btn-li'><a href="#">Button 2</a></button></li>
                <li><button className='btn-li'><a href="#">Button 3</a></button></li>
                <li><button className='btn-li'><a href="#">Button 4</a></button></li>
            </ul>
        </nav>
        <a className='cta' href="#"><button className='btn-out'>About</button></a>
    </header>
  )
}
