import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import authServices from 'Utilities/authServices';
import Map from 'Components/map';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import Button from 'Components/button/Button';
import AddToCart from 'Components/common/addToCart';
import duration from 'Components/common-navs/inputData/duration';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';

import { validateAField, validateAllFields } from '../validation/validateField';

import SendSecurityKeyForm from './SendSecurityKeyForm';
import chargeUser from '../actionCreators/chargeUser';
import DeliveryAddress from './DeliveryAddress';
import ScheduleSelector from './ScheduleSelector';
import Payment from './Payment';
import ShoppingCart from './ShoppingCart';
import postUserOrder from '../actionCreators/postUserOrder';

import './checkout.scss';

const Checkout = ({
  push,
  chargeUserToSaveCard,
  checkoutUser,
  card,
  amount,
  message,
  data,
  cart,
  bukkaMenu,
  fetchBukkaMenu,
  menuIsFetched,
  bukkaOfMenu,
  day,
  time,
  success,
  cards,
  hasDefaultCard,
  coordinates,
  mode,
}) => {
  const [validationErrors, setValidationErrors] = useState({
    address: '',
    deliveryInstructions: '',
    name: '',
    mobileNumber: ''
  });

  const [deliveryAddressData, setDeliveryAddressData] = useState({
    address: '',
    deliveryInstructions: '',
    name: authServices.getFullName(),
    mobileNumber: ''
  });

  const handleDeliveryAddress = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setDeliveryAddressData({
      ...deliveryAddressData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleDeliveryAddressSave = (e) => {
    e.preventDefault();
    const validation = validateAllFields(deliveryAddressData);
    setValidationErrors({
      ...validationErrors,
      ...validation
    });
  };

  const validateAddress = () => {
    const { errors, passes } = validateAllFields(deliveryAddressData);
    setValidationErrors({
      ...validationErrors,
      ...errors
    });
    return passes;
  };

  useEffect(() => {
    const bukkaMenuToFetch = location.pathname.split('/')[2];
    if (!menuIsFetched || bukkaMenuToFetch !== bukkaOfMenu) {
      window.scrollTo(0, 0);
      fetchBukkaMenu(bukkaMenuToFetch);
    }
    if (success) {
      setDeliveryAddressData({
        address: '',
        deliveryInstructions: '',
        name: '',
        mobileNumber: ''
      });
    }
    if (message === 'Charge attempted') {
      $('#inputSecurityKey').modal('show');
    }
  });

  const handleUserCheckout = () => {
    const user = authServices.getUserSlug();
    const deliveryAddress = { ...deliveryAddressData, user, location: { type: 'Point', coordinates, } };
    checkoutUser({ deliveryAddress, cart: { items: [...cart], user }, day, user, time, deliveryMode: mode });
  };

  const handleCheckout = () => {
    if (cards.length <= 0) {
      swal('Please save your card before proceed to checkout');
    } else if (!hasDefaultCard) {
      swal('Please select your card');
    } else if (!validateAddress()) {
      scrollTo(0, 0);
    } else {
      handleUserCheckout();
    }
  };

  return (
    <>
      <Navbar push={push} />
      <AddToCart />
      <SendSecurityKeyForm cart={cart} deliveryAddress={deliveryAddressData} day={day} time={time} push={push} />
      <Container classNames="relative modal-open">
        <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-column justify-content-between">
          <div className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12">
            <DeliveryAddress
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
              inputData={deliveryAddressData}
              setInputData={setDeliveryAddressData}
              handleDeliveryAddressSave={handleDeliveryAddressSave}
              handleChange={handleDeliveryAddress}
            />
            <ScheduleSelector
              type="time"
              title="Day"
              list={duration.durationList}
            />
            <ScheduleSelector
              type="time"
              title="Time"
              list={duration.sheduleTimeLists}
            />
            <Payment handleClick={chargeUserToSaveCard} cards={cards} message={message} />
            <div className="d-none d-xl-flex d-lg-flex justify-content-end my-5">
              <Button
                type="submit"
                text="CONTINUE"
                classNames="big-button"
                handleClick={() => handleCheckout()}
              />
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-5 col-md-12 col-sm-12 mb-2 px-0 px-md-0
        px-lg-3 mt-0 mt-lg-4 mt-xl-4"
          >
            <div className="card-shadow card mb-3 border">
              <div className="map-address d-none d-lg-block d-xl-block">
                <Map />
              </div>
              <ShoppingCart />
            </div>
            <div className="d-flex d-md-flex d-lg-none d-xl-none mt-1 mb-5 justify-content-center">
              <Button
                type="submit"
                text="CONTINUE"
                classNames="big-button"
                id="charge-user-small"
                handleClick={() => { /* checkoutUser({ card, amount }) */ }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = ({
  manipulateCardDetailsReducer,
  chargeUserReducer: { message, data },
  cartReducer: { totalCost, items },
  fetchBukkaMenuReducer: {
    bukkaMenu,
    status: { fetched }
  },
  getUserCardReducer: { cards, hasDefaultCard },
  finishTransactionReducer: {
    status: { success },
  },
  deliveryModeReducer: { mode },
  selectedLocationReducer: { coordinates },
  deliveryScheduleReducer: { schedule: { day, time } },
}) => ({
  card: manipulateCardDetailsReducer,
  amount: totalCost,
  message,
  data,
  bukkaMenu,
  menuIsFetched: fetched,
  bukkaOfMenu: bukkaMenu[0].bukka,
  cart: items,
  day,
  time,
  success,
  cards,
  hasDefaultCard,
  coordinates,
  mode,
});

export default connect(
  mapStateToProps,
  { chargeUserToSaveCard: chargeUser,
    checkoutUser: postUserOrder,
    fetchBukkaMenu: fetchBukkaMenuAction
  }
)(Checkout);

Checkout.propTypes = {
  push: PropTypes.func.isRequired
};
