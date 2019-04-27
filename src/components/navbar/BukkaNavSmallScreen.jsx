import React from 'react';
import PropTypes from 'prop-types';

import SearchPlusMenu from '../icons/SearchPlusMenu';

import './bukkaNavSmallScreen.scss';

const BukkaNavSmallScreen = ({ currentCategory, classNames }) => (
  <div className={`bukka-nav-small d-lg-none ${classNames}`}>
    <nav className="container navbar navbar-light bukka-nav-small-content">
      <div className="current-category">
        <h5 className="current-category-text">{currentCategory}</h5>
      </div>
      <SearchPlusMenu />
    </nav>
  </div>
);

export default BukkaNavSmallScreen;

BukkaNavSmallScreen.defaultProps = {
  classNames: ''
};

BukkaNavSmallScreen.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  classNames: PropTypes.string
};
