import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import AddedItems from '../components/AddedItems';

const initialState = {
  changeAuthenticationPageReducer: { type: 'Sign In', },
  deliveryModeReducer: { mode: 'delivery', },
  checkoutModeReducer: { mode: true },
  locationsPredictionReducer: { predictions: [3.7474, 3.4848] },
  businessReducer: {
    fetchedBukka: {},
    status: {
      fetched: false,
      error: false,
    },
  },
  productsReducer: {
    bukkaMenu: [
      {
        title: 'title',
        imageUrl: 'www.imageUrl.com',
        description: 'your description',
        price: 4454,
        category: 'african',
        slug: 'any-way-slug'
      }
    ],
    cart: [
      {
        title: 'name',
        price: 90,
        slug: 'jdj-dfj'
      }
    ]
  }
};

const store = mockStore(initialState);

describe.skip('Area to explore component', () => {
  const props = {
    handleClick: jest.fn()
  };
  const wrapper = render(
    <Provider store={store}>
      <MemoryRouter>
        <AddedItems {...props} />
      </MemoryRouter>
    </Provider>
  );

  it.skip('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
