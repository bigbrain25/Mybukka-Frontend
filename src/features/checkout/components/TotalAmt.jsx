import React from 'react';

import Container from 'Components/container';
import './suggestedItems.scss';

const totalAmount = () => (
  <Container classNames="total-amount-section">
    <div className="before-grand-total-section">
      <div className="d-flex justify-content-between">
        <h5 className="text-sub-total">Subtotal</h5>
        <h5 className="tbd-price">TBD</h5>
      </div>
      <div className="d-flex justify-content-between">
        <h5 className="text-sub-total">Tax & Fees</h5>
        <h5 className="tbd-price">TBD</h5>
      </div>
      <div className="d-flex justify-content-between">
        <h5 className="text-sub-total">Delivery</h5>
        <h5 className="tbd-price">TBD</h5>
      </div>
    </div>
    <div className="d-flex justify-content-between mt-3 mb-1">
      <h5 className="text-sub-total">Total</h5>
      <h5 className="tbd-price">TBD</h5>
    </div>
  </Container>
);

export default totalAmount;