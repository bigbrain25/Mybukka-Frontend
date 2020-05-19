import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import { useLocationContext } from '../../context/LocationContext';
import ChooseAreaToExploreSection
  from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import fetchBukkasAction from '../feed/actionCreators/fetchBukkas';
import getPromotedBukkasAction from '../feed/actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../feed/actionCreators/getRestaurantCuisineAction';
import useUpdateEffect from '../../hooks/useUpdateEffect';


const Home = React.memo(({
  history: { push },
  fetchNearbyBukkas,
  getPromotedBukkas,
  getRestaurantCuisine,
}) => {
  const { coordinates } = useLocationContext();

  useUpdateEffect(() => {
    new Promise(async (resolve) => {
      resolve(fetchNearbyBukkas(coordinates));
    }).then(() => getRestaurantCuisine(coordinates))
      .then(() => getPromotedBukkas(coordinates))
      .then(() => push('/feed', { showMap: true }));
  }, [coordinates]);

  return (
    <Fragment>
      <div className="home">
        <IntroSection push={push} />
        <DiscoverSection />
        <ChooseAreaToExploreSection />
        <ReadyToOrderSection />
        <Footer />
      </div>
    </Fragment>
  );
});

export default connect(
  () => ({}),
  {
    fetchNearbyBukkas: fetchBukkasAction,
    getPromotedBukkas: getPromotedBukkasAction,
    getRestaurantCuisine: getRestaurantCuisineAction
  },
)(Home);

Home.defaultProps = {
  errorMessage: '',
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  getPromotedBukkas: PropTypes.func.isRequired,
  getRestaurantCuisine: PropTypes.func.isRequired,
};
