import React from 'react';
import PropTypes from 'prop-types';

import './personalizedheader.scss';

const PersonalizedHeader = ({ title }) => (
  <div>
    <div className="personalized-header">
      <div className="personalized-header-text">
        {title}
      </div>
      <a
        className="personalized-header-link"
        href="/support/buyer"
      >
        <span>View all</span>
      </a>
    </div>
    <div className="personalized-header-divider" />
  </div>

);

export default PersonalizedHeader;

PersonalizedHeader.propTypes = {
  title: PropTypes.string.isRequired
};
