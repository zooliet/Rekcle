import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const AccountListNav = () => {
  return (
    <nav className='nav nav-pills1 flex-column justify-content-left flex-md-column1 align-items-md-center1 side'>
      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/account'
        exact>기본 정보
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/account/balance'>잔고 현황
      </NavLink>

      {/* <NavLink
        className='nav-link mb-md-3 text-dark'
        to='/account/connections'>접속 이력
      </NavLink> */}
    </nav>

  );
};

export default AccountListNav;
