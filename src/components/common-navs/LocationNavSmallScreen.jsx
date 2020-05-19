import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Clock from 'Icons/Clock';
import ChevronVertical from '../icons/ChevronVertical';
import DismissModal from '../modal/DismissModal';
import Modal from '../modal';
import Button from '../button/Button';
import SearchLocation from '../places-suggest/SearchLocation';
import DeliveryOrPickupNav from './DeliveryOrPickupNav';
import ChevronRight from '../icons/ChevronRight';
import MapMarker from '../icons/MapMarker';
import { ConnectedDurationContent } from './Duration';

import './LocationNavSmallScreen.scss';

import Cancel from '../icons/Cancel';
import { useLocationContext } from '../../context/LocationContext';

const CancelScheduleBtn = ({ handleClick }) => (
  <div
    className="dismiss-modal"
    tabIndex="0"
    role="button"
    aria-pressed="false"
    onClick={handleClick}
  >
    <Cancel />
  </div>
);

export const SelectLocationModal = ({ delivery, currentSchedule, mode }) => {
  const [schedule, setSchedule] = useState(false);
  return (
    <Modal
      classNames="select-delivery-pickup"
      dataTarget="small-location-nav"
      largeOnSmallScreen
    >
      <div className="small-search-container">
        {!schedule && <DismissModal />}
        {schedule &&
        <CancelScheduleBtn handleClick={() => setSchedule(false)} />}
        <div className="small-search-wrapper">
          <div className="dropdown-suggestion">
            {!schedule &&
            <Fragment>
              <DeliveryOrPickupNav delivery={delivery} />
              <SuggestionsDropdown handleClick={() => {}} />
              <div className="carousel-divider mb-0" />
              <Button type="button" classNames="schedule-later-btn" handleClick={() => setSchedule(true)}>
                <span className="col-10 text-left">
                  <span className="top--1">
                    <Clock />
                  </span>
                  <span className="pl-3 align-bottom">Schedule for Later</span>
                </span>
                <span className="col-2">
                  <ChevronVertical />
                </span>
              </Button>
            </Fragment>
            }
            {schedule && <ConnectedDurationContent mode={mode} currentSchedule={currentSchedule} />}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const SuggestionsDropdown = () => (
  <div className="suggestion-dropdown">
    <SearchLocation
      chevronButtonVisible={false}
      showDeliveryOrPickupNav={false}
      showDropdown
    />
  </div>
);

const ButtonText = ({ mode }) => {
  const { selectedLocation } = useLocationContext();

  return (
    <h2 className="inline-text">
      {mode === 'delivery' && <span>Delivery to</span>}
      {mode === 'pickup' && <span>PICKUP NEAR</span>}
      <span className="text">
        {Object.keys(selectedLocation).length > 0
          ? selectedLocation.structured_formatting.secondary_text.split(',')[0]
          : 'Current Location'}
        <span className="chevron-down">
          <ChevronRight />
        </span>
      </span>
    </h2>
  );
};

const BukkaButtonText = () => (
  <h2 className="inline-text">
    <span className="bukka-inline-text">
      <span className="chevron-down pr-1">
        <MapMarker />
      </span>
    </span>
  </h2>
);

const CurrentLocation = ({ handleClick, mode, bukka }) => (
  <Button
    type="button"
    classNames="small-nav-btn container pl-10"
    handleClick={handleClick}
  >
    {!bukka && <ButtonText mode={mode} />}
    {bukka && <BukkaButtonText />}
  </Button>
);

const LocationNavSmallScreen = ({ mode, bukka }) => {
  const { selectedLocation } = useLocationContext();
  return (
    <Fragment>
      <div
        className="d-block d-sm-block d-md-none
      d-lg-none d-xl-none gutter-bg-clor"
      >
        <div className="location-navbar-content container">
          <div className="options-center col-lg-12 px-0">
            <div className="options-wrapper">
              <div className="options">
                <div className="btn-location">
                  <div className="small-location-nav" data-target="#small-location-nav" data-toggle="modal">
                    <CurrentLocation
                      mode={mode}
                      bukka={bukka}
                      handleClick={() => {}}
                      selectedLocation={selectedLocation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode }
}) => ({
  mode,
});

export default connect(mapStateToProps)(LocationNavSmallScreen);

LocationNavSmallScreen.defaultProps = {
  bukka: false,
};

LocationNavSmallScreen.propTypes = {
  mode: PropTypes.string.isRequired,
  bukka: PropTypes.bool
};

ButtonText.propTypes = {
  mode: PropTypes.string.isRequired
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  bukka: PropTypes.bool.isRequired
};

SelectLocationModal.defaultProps = {
  delivery: false
};

SelectLocationModal.propTypes = {
  delivery: PropTypes.bool
};

CancelScheduleBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
};
