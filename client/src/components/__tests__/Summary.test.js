import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Summary from '../Summary/Summary';

configure({ adapter: new Adapter() });

describe('Summary Component', () => {
  const summary = {
    cleaningFee: 145,
    baseRate: 222,
    numberOfNightsSelected: 3,
    baseRateXNights: 0,
    occupancyTaxes: 0,
    serviceFee: 0,
    totalCost: 0,
  };

  it('should render without throwing an error', () => {
    expect(shallow(<Summary summary={summary} />).find('Summary__Wrapper').exists()).toBe(true);
  });
});
