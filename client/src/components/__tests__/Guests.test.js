import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import Guests from '../Guests/Guests';

configure({ adapter: new Adapter() });

describe('Guests Component', () => {
  const guests = {
    currentGuestSum: 2,
    currentAdultSum: 2,
    currentChildSum: 0,
    currentInfantSum: 0,
    incrementGuests: sinon.spy(),
    decrementGuests: sinon.spy(),
    maxGuests: 4,
    adultDecButtonActive: true,
    childDecButtonActive: false,
    infantDecButtonActive: false,
    allIncButtonsActive: true,
  };

  it('should render without throwing an error', () => {
    expect(shallow(<Guests guests={guests} />).find('FieldWrapper').exists()).to.equal(true);
  });

  it('should render 3 Guests Incrementers/Decrementers When Input Clicked', () => {
    const wrapper = mount(<Guests guests={guests} />);
    wrapper.find('GuestInput').simulate('click');
    expect(wrapper.find('IncDecWrapper').length).to.equal(3);
  });

  it('incrementer should be called when adult + button clicked', () => {
    const wrapper = mount(<Guests guests={guests} />);
    wrapper.find('GuestInput').simulate('click');
    wrapper.find('IncrementButton').first().simulate('click');
    expect(guests.incrementGuests).to.have.property('callCount', 1);
  });

  it('decrementer should be called when adult - button clicked', () => {
    const wrapper = mount(<Guests guests={guests} />);
    wrapper.find('GuestInput').simulate('click');
    wrapper.find('DecrementButton').first().simulate('click');
    expect(guests.decrementGuests).to.have.property('callCount', 1);
  });
  
  it('should render 2 Guests as opposed to 2 Guest when given a value greater than 1', () => {
    const wrapper = mount(<Guests guests={guests} />);
    expect(wrapper.find('GuestInput').props()).to.have.property('value', '2 Guests');
  });
});
