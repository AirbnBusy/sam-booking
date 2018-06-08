import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Date from '../Date';

configure({ adapter: new Adapter() });

describe('Date Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Date status="available" index={1} />).find('.date').exists()).toBe(true);
  });
});
