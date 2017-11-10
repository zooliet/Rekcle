import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const WatchListNav = () => {
  return (
    <nav className='nav nav-pills1 flex-column justify-content-left flex-md-column1 align-items-md-center1 side'>
      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/watchlist'
        exact>관심 종목
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        to='/watchlist/registration'>종목 추가
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/watchlist/recommended'>추천 설정
      </NavLink>
    </nav>

  );
};

export default WatchListNav;
