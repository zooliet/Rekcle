import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const StockListNav = () => {
  return (
    <nav className='nav nav-pills1 flex-column justify-content-left flex-md-column1 align-items-md-center1 side'>
      <NavLink
        className='nav-link mb-md-3 text-dark'
        to='/stocks'
        exact>전체 종목        
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        to='/stocks/me'>보유 종목
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/stocks/watchlist'
        exact>관심 종목
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/stocks/recommended'>추천 종목
      </NavLink>
    </nav>

  );
};

export default StockListNav;
