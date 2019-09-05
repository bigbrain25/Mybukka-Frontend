import React from 'react';

import PropTypes from 'prop-types';
import toggleAddToCartModal from 'Redux/toggleAddToCartModal';

import Column from 'Components/grid/Column';
import Cancel from 'Components/icons/Cancel';

import './mealImage.scss';

const MealImage = ({ imageUrl, toggleAddToCart }) => (
  <Column classNames="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-7 img-column">
    <div
      role="button"
      arai-pressed="false"
      tabIndex="0"
      className="cancel-modal-meal d-lg-none"
      onClick={() => toggleAddToCart(false)}
    >
      <Cancel />
    </div>
    <img src={imageUrl} className="image-details img-fluid" alt="" />
  </Column>
);

export default MealImage;

MealImage.propTypes = {
  imageUrl: PropTypes.string.isRequired
};
