import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'jest-mock-axios';
import Bookings from '../Bookings/Bookings';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  const wrapperBookings = mount(<Bookings />);

  it('should render without throwing an error', () => {
    expect(wrapperBookings.find('Bookings').exists()).toBe(true);
  });

  it('should fetch listing data', () => {
    const thenFn = jest.fn();
    const catchFn = jest.fn();
    wrapperBookings.instance().getListing().then(thenFn).catch(catchFn);

    const res = {
      data: {
        base_rate_per_night: 224,
        cleaning_fee: 134,
        id: 1001,
        max_guests: 4,
      },
    };
    mockAxios.mockResponse(res);

    expect(thenFn).toHaveBeenCalledWith(res);
  });
});
