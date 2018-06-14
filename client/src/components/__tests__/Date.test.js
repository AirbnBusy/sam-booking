import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Date from '../Date/Date';

configure({ adapter: new Adapter() });

describe('Date Component', () => {
  const selectDate = sinon.spy();
  const toggleCalendar = sinon.spy();

  const shallowDate = shallow(<Date
    status="available"
    day={5}
    month={5}
    year={2018}
    selectDate={selectDate}
    toggleCalendar={toggleCalendar}
  />);

  const wrapperDate = mount(<Date
    status="available"
    day={5}
    month={5}
    year={2018}
    selectDate={selectDate}
    toggleCalendar={toggleCalendar}
  />);

  it('should call selectDate and toggleCalendar on click', () => {
    shallowDate.find('AvailableDate').simulate('click');
    expect(selectDate).to.have.property('callCount', 1);
    expect(toggleCalendar).to.have.property('callCount', 1);
  });

  it('should toggleHover when date is hovered', () => {
    expect(wrapperDate.state().hovered).to.equal(false);
    wrapperDate.find('AvailableDate').simulate('mouseEnter');
    expect(wrapperDate.state().hovered).to.equal(true);
    wrapperDate.find('AvailableDate').simulate('mouseEnter');
    expect(wrapperDate.state().hovered).to.equal(false);
  });
});
