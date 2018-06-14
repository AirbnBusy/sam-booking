import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'jest-mock-axios';
import sinon from 'sinon';
import App from '../App/App';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  const wrapperApp = mount(<App />);

  it('should render without throwing an error', () => {
    expect(wrapperApp.find('App').exists()).toBe(true);
  });

  it('should fetch listing data', () => {
    const thenFn = jest.fn();
    const catchFn = jest.fn();
    wrapperApp.instance().getListing().then(thenFn).catch(catchFn);

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
