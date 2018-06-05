import React from 'react';
import { Enzyme, shallow } from 'enzyme';
import App from '../App';

const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('App Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).find('.app').exists()).toBe(true);
  });
});
