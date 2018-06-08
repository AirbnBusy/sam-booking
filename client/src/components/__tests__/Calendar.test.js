import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../Calendar';

configure({ adapter: new Adapter() });

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
