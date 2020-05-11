/* eslint-disable react/prop-types */
import React from 'react';
import { LocationsPredictionProvider } from '../context/LocationsPrediction';
import { LocationProvider } from '../context/LocationContext';
import { DarkModeProvider } from '../context/DarkMode';
import { ThemeProvider } from '../context/ThemeProvider';
import { CloudinaryProvider } from '../components/img/Cloudinary';
import { ModalProvider } from '../context/UseModal';
import { CartProvider } from '../context/CartContext';

const Primary = ({ children }) => (
  <LocationsPredictionProvider>
    <LocationProvider>
      <CloudinaryProvider>
        <DarkModeProvider>
          <ThemeProvider>
            <ModalProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </ModalProvider>
          </ThemeProvider>
        </DarkModeProvider>
      </CloudinaryProvider>
    </LocationProvider>
  </LocationsPredictionProvider>
);

export default Primary;
