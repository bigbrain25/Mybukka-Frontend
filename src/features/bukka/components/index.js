import React from 'react';

import PropTypes from 'prop-types';

import Footer from 'Components/footer/Footer';
import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';

import AddToCart from '../addToCart';
import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
import BukkaMeals from './BukkaMeals';

import { bukkaMeals } from './mealData.json';

const BukkaMenuScene = ({ push }) => (
  <div className="bukka-menu">
    <AddToCart />
    <PrimaryNavbar push={push} />
    <BukkaImageSection imageUrl="https://res.cloudinary.com/dn93xk5ni/image/upload/v1549932720/bake-baked-basil-236798_vvo5pq.jpg" />
    <BukkaDetailsSection bukkaName="Chipottle Fresh Bukka" />
    <BukkaMeals mealsData={bukkaMeals} />
    <Footer />
  </div>
);

export default BukkaMenuScene;

BukkaMenuScene.defaultProps = {
  push: () => {},
};

BukkaMenuScene.propTypes = {
  push: PropTypes.func,
};
