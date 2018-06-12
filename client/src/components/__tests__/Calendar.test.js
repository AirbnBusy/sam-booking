import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import chai from 'chai';
import Calendar from '../Calendar';

configure({ adapter: new Adapter() });

const { expect } = chai;

describe('Calendar Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Calendar
      daysUnav={[2, 3, 4, 5, 6, 7]}
      firstDayPosition={5}
      daysInMonth={30}
      currentYearMonth="June 2018"
      incrementCalendar={() => 'nothing'}
      decrementCalendar={() => 'nothing'}
    />).find('.calendar').exists()).to.equal(true);
  });

  it('should render the total amount of date divs "blank", "available", and "unavailable"', () => {
    const wrapper = mount(<Calendar
      daysUnav={[2, 3, 4, 5, 6, 7]}
      firstDayPosition={5}
      daysInMonth={30}
      currentYearMonth="June 2018"
      incrementCalendar={() => 'nothing'}
      decrementCalendar={() => 'nothing'}
    />);
    expect(wrapper.find('.calendar').children().length).to.equal(35);
  });

  it('should respond to click event with increment function call', () => {
    const incrementCalendar = sinon.spy();

    const wrapper = shallow(<Calendar
      daysUnav={[2, 3, 4, 5, 6, 7]}
      firstDayPosition={5}
      daysInMonth={30}
      currentYearMonth="June 2018"
      incrementCalendar={incrementCalendar}
      decrementCalendar={() => 'nothing'}
    />);
    wrapper.find('button #forward').simulate('click');
    expect(incrementCalendar).to.have.property('callCount', 1);
  });

  it('should respond to click event with increment function call', () => {
    const decrementCalendar = sinon.spy();

    const wrapper = shallow(<Calendar
      daysUnav={[2, 3, 4, 5, 6, 7]}
      firstDayPosition={5}
      daysInMonth={30}
      currentYearMonth="June 2018"
      incrementCalendar={() => 'nothing'}
      decrementCalendar={decrementCalendar}
    />);
    wrapper.find('button #back').simulate('click');
    expect(decrementCalendar).to.have.property('callCount', 1);
  });
});
