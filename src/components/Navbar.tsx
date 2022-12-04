import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Cocktail List</Link>
          </li>
          <li>
            <Link to='/random-quote'>Random Cocktail</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
