/* eslint-disable max-len */
import React, { Fragment, useEffect } from 'react';

import PropTypes from 'prop-types';

import Container from 'Components/container';
import Row from 'Components/grid/Row';
import Column from 'Components/grid/Column';

import MealCard from 'Components/card/MealCard';


import './bukkaMeals.scss';
import NoResult from '../../../components/not-found/NoResult';
import { useBusinessContext } from '../../../context/BusinessContext';

const BukkaMealsHeader = ({ category, active, setState }) => {
  const activeCatelog = React.useRef();

  const _inViewport = () => {
    // const windowHeight = window.innerHeight;
    const imageTopPosition = activeCatelog.current.getBoundingClientRect().top;

    const buffer = 70;
    if (/* windowHeight * buffer > imageTopPosition && */ buffer > imageTopPosition) {
      return true;
    }
    return false;
  };

  const handleScroll = () => {
    if (activeCatelog.current && _inViewport() && category !== active) {
      setState(category);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [activeCatelog]);

  const resolveValidId = () => category.replace(/ /g, '-').replace(/'/g, '-').replace(/₦/g, '-');

  return (
    <div ref={activeCatelog} className="bukka-meals-header" id={resolveValidId()}>
      <h4 className="header-text">{category}</h4>
    </div>
  );
};

const BukkaMeals = ({
  uniqueCatelogs, searchQuery, isInSearch, hasNoResult, activeCatelog, setActiveCatelog
}) => {
  const { catelogs } = useBusinessContext();

  const onSearch = (uniqueCatelog, catelog) => {
    const isUniqueCatelog = eachCatelog => eachCatelog.category === uniqueCatelog;
    if (Array.isArray(catelog)) {
      return catelog.filter(eachCatelog => isUniqueCatelog(eachCatelog) && isInSearch(eachCatelog));
    }
    return isUniqueCatelog(catelog) && isInSearch(catelog);
  };

  return (
    catelogs &&
    <Container classNames={hasNoResult() ? '' : 'menu-catalogs'}>
      {uniqueCatelogs.map(eachUniqueCatelog => (
        onSearch(eachUniqueCatelog, catelogs).length > 0 &&
        <Fragment key={`store-menu-catelogs-${eachUniqueCatelog}`}>
          <BukkaMealsHeader active={activeCatelog} setState={setActiveCatelog} category={eachUniqueCatelog} />
          <Row classNames="menu-section">
            {catelogs.map(catelog => (
              <Fragment key={`store-menu-catelogs-${catelog.title}-${catelog._id}`}>
                {onSearch(eachUniqueCatelog, catelog) && (
                  <Column id={`catelog-${catelog._id}`} classNames="col-12 col-lg-6 col-xl-6 col-xs-12 col-sm-12 meal-column">
                    <MealCard {...catelog} />
                  </Column>
                )}
              </Fragment>
            ))}
          </Row>
        </Fragment>
      ))}
      {hasNoResult() && <NoResult withPadding text={searchQuery} />}
    </Container>
  );
};

export default BukkaMeals;

BukkaMealsHeader.propTypes = {
  category: PropTypes.string.isRequired
};
