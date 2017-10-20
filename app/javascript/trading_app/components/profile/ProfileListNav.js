import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileListNav = () => {
  return (
    <nav className='nav nav-pills1 flex-column justify-content-left flex-md-column1 align-items-md-center1 side'>
      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/profile'
        exact>접속 상태
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        // activeClassName='active'
        to='/profile/balance'>잔고 현황
      </NavLink>

      <NavLink
        className='nav-link mb-md-3 text-dark'
        to='/profile/address'>주소 설정
      </NavLink>
    </nav>

  );
};

export default ProfileListNav;
