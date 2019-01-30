import React from 'react';
import Navlink from '../Navlink';

describe('Navlink component', () => {
  const props = { text: 'signIn', href: '/back' };
  const wrapper = shallow(<Navlink {...props} />);

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
