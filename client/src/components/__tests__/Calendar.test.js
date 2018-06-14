import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import Calendar from '../Calendar/Calendar';

configure({ adapter: new Adapter() });

describe('Calendar Component', () => {
  const incrementCalendar = sinon.spy();
  const decrementCalendar = sinon.spy();

  const shallowCal = shallow(<Calendar
    daysUnav={[2, 3, 4, 5, 6, 7]}
    firstDayPosition={5}
    daysInMonth={30}
    currentYearMonth="June 2018"
    incrementCalendar={incrementCalendar}
    decrementCalendar={decrementCalendar}
    selectedCheckInDate=""
    selectedCheckOutDate=""
    selectDate={() => 'nothing'}
    toggleCalendar={() => 'nothing'}
    currentYear={2018}
    currentMonth={5}
  />);

  const wrapperCal = mount(<Calendar
    daysUnav={[2, 3, 4, 5, 6, 7]}
    firstDayPosition={5}
    daysInMonth={30}
    currentYearMonth="June 2018"
    incrementCalendar={incrementCalendar}
    decrementCalendar={decrementCalendar}
    selectedCheckInDate=""
    selectedCheckOutDate=""
    selectDate={() => 'nothing'}
    toggleCalendar={() => 'nothing'}
    currentYear={2018}
    currentMonth={5}
  />);

  it('should render without throwing an error', () => {
    expect(shallowCal.find('CalendarGrid').exists()).to.equal(true);
  });

  it('should render the total amount of date divs "blank", "available", and "unavailable"', () => {
    expect(wrapperCal.find('CalendarGrid Date').length).to.equal(35);
  });

  it('should respond to click event with increment function call', () => {
    wrapperCal.find('button #forward').simulate('click');
    expect(incrementCalendar).to.have.property('callCount', 1);
  });

  it('should respond to click event with increment function call', () => {
    wrapperCal.find('button #back').simulate('click');
    expect(decrementCalendar).to.have.property('callCount', 1);
  });
});

