import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import CheckIO from '../CheckIO';

configure({ adapter: new Adapter() });

describe('CheckIO Component Tests', () => {
  const calendar = {
    currentCalendarDatesUnavailable: [2, 9, 10, 13, 16],
    firstDayPosition: 5,
    numberOfDaysInMonth: 30,
    currentMonthName: 'June',
    currentMonth: 6,
    currentYear: 2018,
    incrementCalendar: sinon.spy(),
    decrementCalendar: sinon.spy(),
    selectedCheckInDate: '',
    selectedCheckOutDate: '',
    selectCheckInDate: () => 'nothing',
    selectCheckOutDate: () => 'nothing',
  };

  it('should render a calendar when checkIn input is clicked', () => {
    const wrapper = mount(<CheckIO calendar={calendar} />);
    wrapper.find('#checkIn').simulate('click');
    expect(wrapper.find('#inCal').exists()).to.equal(true);
  });

  it('should remove a calendar when checkIn input is clicked twice', () => {
    const wrapper = mount(<CheckIO calendar={calendar} />);
    wrapper.find('#checkIn').simulate('click');
    wrapper.find('#checkIn').simulate('click');
    expect(wrapper.find('#inCal').exists()).to.equal(false);
  });

  it('should switch to outCalendar when checkIn input is clicked then checkOut input is clicked', () => {
    const wrapper = mount(<CheckIO calendar={calendar} />);
    wrapper.find('#checkIn').simulate('click');
    wrapper.find('#checkOut').simulate('click');
    expect(wrapper.find('#outCal').exists()).to.equal(true);
  });
});
