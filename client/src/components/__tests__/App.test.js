import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).find('.app').exists()).toBe(true);
  });
});
