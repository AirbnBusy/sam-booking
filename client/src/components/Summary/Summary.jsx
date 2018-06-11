import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CostField = styled.div`
  text-align: left;
  width: 100%;
  padding-top: .25em;
  padding-bottom: .5em;
  margin-bottom: .5em;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  font-weight: normal;
`;

const Wrapper = styled.div`{
  width: 90%;
  height: 100%;
`;

const Total = styled.div`
  textAlign: left;
  width: 100%;
  padding-top: .25em;
  display: flex;
  justify-content: space-between;
  font-weight: 800;
`;


const Summary = ({
  summary: {
    cleaningFee,
    baseRate,
    numberOfNightsSelected,
    baseRateXNights,
    occupancyTaxes,
    serviceFee,
    totalCost,
  },
}) => (
  <Wrapper>
    <CostField>
      <span>{`$${baseRate} x ${numberOfNightsSelected} Nights`}</span>
      <span>{`$${baseRateXNights}`}</span>
    </CostField>
    <CostField>
      <span>Cleaning Fee</span>
      <span>{`$${cleaningFee}`}</span>
    </CostField>
    <CostField>
      <span>Service Fee</span>
      <span>{`$${serviceFee}`}</span>
    </CostField>
    <CostField>
      <span>Occupancy Taxes</span>
      <span>{`$${occupancyTaxes}`}</span>
    </CostField>
    <Total>
      <span>Total</span>
      <span>{`$${totalCost}`}</span>
    </Total>
  </Wrapper>
);


Summary.propTypes = {
  summary: PropTypes.shape({
    cleaningFee: PropTypes.number.isRequired,
    baseRate: PropTypes.number.isRequired,
    numberOfNightsSelected: PropTypes.number.isRequired,
    baseRateXNights: PropTypes.number.isRequired,
    occupancyTaxes: PropTypes.number.isRequired,
    serviceFee: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
};

export default Summary;
