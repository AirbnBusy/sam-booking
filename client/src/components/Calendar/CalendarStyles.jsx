import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 1;
`;

const DateAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 75px;
  font-size: 17px;
`;

const ArrowButton = styled.button`
  background-color: inherit;
  padding: 3px 8px;
  border-radius: 3px;
  outline: none;
`;

const DaysOfTheWeek = styled.div`
  font-weight: 500;
  font-size: 12px;
  display: grid;
  grid-template-columns: repeat(7, 40px);
  justify-items: center;
  align-items: center;
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-auto-rows: 40px;
  justify-items: center;
  align-items: center;
`;

const Month = styled.span`
  width: 40%;
  text-align: center;
`;

module.exports = {
  Wrapper,
  DateAndButtonWrapper,
  ArrowButton,
  DaysOfTheWeek,
  CalendarGrid,
  Month,
}
