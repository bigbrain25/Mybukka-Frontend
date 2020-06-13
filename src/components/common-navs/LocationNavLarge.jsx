import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { useMediaQuery } from 'react-responsive';
import SearchLocation from 'Components/places-suggest/SearchLocation';
import Field from 'Components/input/Field';
import ChevronVertical from 'Icons/ChevronVertical';
import setDeliveryMode from './actionCreators/setDeliveryMode';
import Container from '../container';
import Button from '../button/Button';
import MapMarker from '../icons/MapMarker';
import Cart from '../icons/Cart';
import Magnifier from '../icons/Magnifier';
import Duration from './Duration';
import CartIconSection from '../cart/CartIconSection';
import {
  ReusableButton,
  ReusableDropdown,
  ReusableWrapper
} from './ReusableNavElements';

import { CategoryLists } from './Categories';
import { useLocationContext } from '../../context/LocationContext';

import './LocationNavLargeScreen.scss';
import './locationnavlarge.scss';
import './LocationNavSmallScreen.scss';

const DeliveryOrPickUp = ({ mode, handleClick, deliveryorpickup }) => (
  <div className="pr-17">
    <div className="position-relative">
      <div className="delivery-or-pickup">
        <div
          className="delivery-or-pickup-mode"
          aria-pressed="false"
          tabIndex="0"
          role="button"
          onClick={() => handleClick('delivery')}
        >
          Delivery
        </div>
        {deliveryorpickup && (
          <Fragment>
            <div className="delivery-or-pickup-divider">or</div>
            <div
              className="delivery-or-pickup-mode"
              aria-pressed="false"
              tabIndex="0"
              role="button"
              onClick={() => handleClick('pickup')}
            >
              Pickup
            </div>
          </Fragment>
        )}
      </div>
      <div
        style={{ left: mode === 'pickup' ? '85px' : '2px' }}
        className="delivery-or-pickup-active"
      />
    </div>
  </div>
);

const SearchInputField = ({ handleChange, value }) => (
  <Field.Input
    type="text"
    value={value}
    name="searchLocation"
    placeholderText="Search items..."
    classNames="text-field form-control searchlocation"
    handleChange={handleChange}
  />
);

const CurrentLocation = ({ focus, handleClick }) => {
  const { selectedLocation } = useLocationContext();
  const [state, setState] = useState('Current Location');

  useEffect(() => {
    const hasLocation = Object.keys(selectedLocation).length > 0;
    if (hasLocation) {
      const location = selectedLocation.structured_formatting;
      setState(location.main_text);
    } else setState('Current Location');
  }, [selectedLocation]);


  return (
    <ReusableWrapper>
      <ReusableButton
        classNames="custom-current-loc"
        handleClick={handleClick}
        focus={focus}
      >
        <span className="current-location-button-icon mr-0">
          <MapMarker />
        </span>
        <div>
          <h2
            className={`current-location-button-text ml-1 ${
              focus ? 'current-loc-h2-text-active' : 'current-loc-h2-text'
            }`}
          >
            {state}
          </h2>
        </div>
      </ReusableButton>
      <ReusableDropdown classNames={`${focus ? '' : 'dropdown--disapear'}`}>
        <SearchLocation
          chevronButtonVisible={false}
          showDeliveryOrPickupNav={false}
        />
      </ReusableDropdown>
    </ReusableWrapper>
  );
};

const Categories = props => (
  <ReusableWrapper>
    <ReusableButton {...props}>
      <div>
        <h2
          className="current-location-button-text text-capitalize"
        >{props.activeItem || 'Categories'}</h2>
      </div>
      <span className="current-location-button-icon custom-mt-minus1 pl-4">
        <ChevronVertical />
      </span>
    </ReusableButton>
    <ReusableDropdown
      classNames={`${props.focus ? 'border-none' : 'dropdown--disapear'}`}
    >
      <CategoryLists
        handleClick={() => {}}
        lists={props.categoryItems}
        classNames="category-dropdown-section"
        maxHeight="category-dropdown-height"
        section={props.section}
      />
    </ReusableDropdown>
  </ReusableWrapper>
);

const Search = props => (
  <ReusableWrapper>
    <ReusableButton {...props}>
      <span className="current-location-button-icon custom-mt-minus19">
        <Magnifier />
      </span>
      <div>
        <div className="current-location-button-text">
          <SearchInputField value={props.value} handleChange={props.handleChange} />
        </div>
      </div>
    </ReusableButton>
  </ReusableWrapper>
);

const LocationNavLarge = ({
  mode,
  setDeliveryModeAction,
  classNames,
  deliveryorpickup,
  scheduleTime,
  cartItemsQuantity,
  categoryItems,
  activeItem,
  handleSearch,
  section
}) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const wrapperRef = React.createRef();
  const [state, setState] = useState('');

  const emitOnChange = (e) => {
    setState(e.target.value);
    handleSearch(e);
  };

  const unFocus = {
    location: false,
    duration: false,
    categories: false,
    search: false,
    cart: false,
  };
  const [isFocused, setFocus] = useState({
    location: false,
    duration: false,
    categories: false,
    search: false,
    cart: false
  });

  const handleClick = (name) => {
    setFocus({
      ...unFocus,
      [name]: true
    });
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus({
        ...isFocused,
        ...unFocus
      });
    }
  };

  useEffect(() => {
    if (!deliveryorpickup && mode !== 'delivery') {
      setDeliveryModeAction('delivery');
    }
  }, [deliveryorpickup, mode]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={`location-navbar d-none d-sm-none d-md-block
      d-lg-block d-xl-block ${classNames}`}
    >
      <Container classNames="location-navbar-content">
        <Container classNames="pl-0 location-navbar-delivery-pickup-section">
          <div className="navbar-delivery-pickup">
            {!isFocused.search && (
              <Fragment>
                <DeliveryOrPickUp
                  handleClick={setDeliveryModeAction}
                  mode={mode}
                  deliveryorpickup={deliveryorpickup}
                />
                <div className="delivery-or-pickup-vertical-divider" />
                <CurrentLocation
                  handleClick={() => handleClick('location')}
                  focus={isFocused.location}
                />
                <div className="delivery-or-pickup-vertical-divider" />
                {scheduleTime && (
                  <Fragment>
                    <Duration
                      handleClick={() => handleClick('duration')}
                      focus={isFocused.duration}
                    />
                    <div className="delivery-or-pickup-vertical-divider" />
                  </Fragment>
                )}
                <Categories
                  handleClick={() => handleClick('categories')}
                  focus={isFocused.categories}
                  categoryItems={categoryItems}
                  section={section}
                  activeItem={activeItem}
                />
                <div className="delivery-or-pickup-vertical-divider" />
              </Fragment>
            )}
            <Search
              handleClick={() => handleClick('search')}
              focus={isFocused.search}
              value={state}
              handleChange={emitOnChange}
            />
          </div>
        </Container>
        {isBigScreen &&
        <div className="location-navbar-view-map">
          <div className="position-relative">
            <Button
              type="button"
              classNames="cart-button border"
              handleClick={() => handleClick('cart')}
            >
              <span className="cart-icon">
                <Cart />
              </span>
              <span className="cart-divider" />
              {cartItemsQuantity} cart
            </Button>
            <CartIconSection
              focus={isFocused.cart}
            />
          </div>
        </div>}
      </Container>
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  cartReducer: { items },
}) => {
  const qty = items.reduce((val, itm) => val + itm.quantity, 0);
  return ({
    mode,
    cartItemsQuantity: qty,
  });
};

export default connect(
  mapStateToProps,
  {
    setDeliveryModeAction: setDeliveryMode,
  }
)(LocationNavLarge);

LocationNavLarge.defaultProps = {
  classNames: '',
  deliveryorpickup: false,
  scheduleTime: false,
  handleSearch: () => {},
};

LocationNavLarge.propTypes = {
  cartItemsQuantity: PropTypes.number.isRequired,
  scheduleTime: PropTypes.bool,
  classNames: PropTypes.string,
  deliveryorpickup: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  setDeliveryModeAction: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
};

CurrentLocation.propTypes = {
  focus: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

Categories.propTypes = {
  focus: PropTypes.bool.isRequired
};

DeliveryOrPickUp.propTypes = {
  deliveryorpickup: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

SearchInputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
