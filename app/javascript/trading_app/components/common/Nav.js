import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return(
    // <nav className='nav nav-pills nav-fill1 nav-tabs1 justify-content-center justify-content-between1 flex-column flex-sm-row'>
    <nav className='nav nav-pills nav-fill justify-content-center top'>
      <NavLink
        className='nav-link'
        to='/'
        exact>자동매매
      </NavLink>

      <NavLink
        className='nav-link'
        to='/strategy'>매매전략
      </NavLink>

      <NavLink
        className='nav-link'
        // activeClassName='active'
        to='/watchlist'>종목관리
      </NavLink>

      <NavLink
        className='nav-link'
        // activeClassName='active'
        to='/account'>계정정보
      </NavLink>
    </nav>
  )
}

export default Nav
