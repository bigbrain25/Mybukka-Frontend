import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setDeliveryMode from './actionCreators/setDeliveryMode';

import './deliveryorpickupnav.scss';

const DeliveryOrPickupNav = ({ mode, setDeliveryModeAction }) => (
  <div className="btn-group" role="group">
    <button
      type="button"
      className={`btn-delivery ${
        mode === 'delivery' ? 'delivery-mode-active' : ''
      }`}
      onClick={() => setDeliveryModeAction('delivery')}
    >
      delivery
    </button>
    <button
      type="button"
      className={`btn-pickup ${
        mode === 'pickup' ? 'delivery-mode-active' : ''
      }`}
      onClick={() => setDeliveryModeAction('pickup')}
    >
      pickup
    </button>
  </div>
);

const mapStateToProps = ({ deliveryModeReducer: { mode } }) => ({
  mode
});

export default connect(
  mapStateToProps,
  { setDeliveryModeAction: setDeliveryMode }
)(DeliveryOrPickupNav);

DeliveryOrPickupNav.defaultProps = {
  mode: 'delivery'
};

DeliveryOrPickupNav.propTypes = {
  mode: PropTypes.string,
  setDeliveryModeAction: PropTypes.func.isRequired
};
