import styled from 'styled-components';

const Price = styled.span`
  font-size: 22px;
  font-weight: 800;
`;

const PriceWrapper = styled.div`
  text-align: left;
  width: 90%;
  padding-top: .75em;
  padding-bottom: 1em;
  margin-bottom: .5em;
  borderBottom: 1px solid #e4e4e4;
`;

const BookButtonWrapper = styled.div`
  text-align: left;
  width: 90%;
  padding-top: .75em;
  padding-bottom: 1em;
  margin-bottom: .5em;
`;

const PerNight = styled.span`
  margin: 3px;
  font-size: 12px;
  font-weight: 600;
`;

const AppWrapper = styled.div`
  border: 1px solid #e4e4e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  padding: .5em;
  font-family: Roboto;
  color: #484848;
`;

const BookButton = styled.button`
  background-color: #FF5A5F;
  color: #ffffff;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 600;
  outline: none;
`;

module.exports = {
  Price,
  PerNight,
  AppWrapper,
  PriceWrapper,
  BookButtonWrapper,
  BookButton,
};
