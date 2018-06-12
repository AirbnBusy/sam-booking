import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import CheckIO from '../CheckIO/CheckIO';

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
    wrapper.find('CheckInInput').simulate('click');
    expect(wrapper.find('Calendar').exists()).to.equal(true);
  });

  it('should remove a calendar when checkIn input is clicked twice', () => {
    const wrapper = mount(<CheckIO calendar={calendar} />);
    wrapper.find('CheckInInput').simulate('click');
    wrapper.find('CheckInInput').simulate('click');
    expect(wrapper.find('Calendar').exists()).to.equal(false);
  });

  it('should toggleCalendar when available date is clicked†', () => {
    const wrapper = mount(<CheckIO calendar={calendar} />);
    wrapper.find('CheckInInput').simulate('click');
    wrapper.find('AvailableDate').first().simulate('click');
    expect(wrapper.find('Calendar').exists()).to.equal(false);
  });
});
