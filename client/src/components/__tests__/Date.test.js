import React from 'react';
import { Enzyme, shallow } from 'enzyme';
import Date from '../Date';

const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Date Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Date status="available" index={1} />).find('.date').exists()).toBe(true);
  });
});
