import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const StrategyNav = () => {
  return (
    <nav className='nav nav-pills1 flex-column justify-content-left flex-md-column1 align-items-md-center1 side'>
      <NavLink
        className='nav-link mb-md-3 text-dark'
        to='/strategy/kiwooms'
        exact>검색식별
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/strategy/stocks'
        exact>종목별
      </NavLink>


      {/* <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/strategy/buying/rules'
        exact>매수 방식
      </NavLink> */}

      {/* <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/strategy/selling/rules'
        exact>매도 방식
      </NavLink> */}

    </nav>

  );
};

export default StrategyNav;
