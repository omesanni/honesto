import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DefaultLayout = props => (
  <div>
    <header className={'header'}>
      <nav className={'navbar navbar-expand-md p-0'}>
        <strong className={'navbar-brand mb-0'}>
          {'Honesto'}
        </strong>

        <div className={'collapse navbar-collapse'} id={'navbarCollapse'}>
          <ul className={'navbar-nav'}>
            <li className={'nav-item active'}>
              <Link className={'nav-link'} to={'/'}>
                {'Share Feedback'}
              </Link>
            </li>
            <li className={'nav-item'}>
              <a className={'nav-link'}>{'My Feedback'}</a>
            </li>
            <li className={'nav-item'}>
              <a className={'nav-link'}>{'Team Feedback'}</a>
            </li>
            <li className={'nav-item'}>
              <a className={'nav-link'}>{'Teams'}</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <div className={'container'}>
      {props.children}
    </div>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
