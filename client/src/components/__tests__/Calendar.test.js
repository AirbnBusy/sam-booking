import React from 'react';
import { Enzyme, shallow } from 'enzyme';
import Calendar from '../Calendar';

const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Calendar Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Calendar
      daysUnav={[2, 3, 4, 5, 6, 7]}
      firstDayPosition={4}
      daysInMonth={30}
      currentYearMonth="June 2018"
    />).find('.calendar').exists()).toBe(true);
  });
});
