import styled from 'styled-components';

const CheckIOInput = styled.input`
  height: 100%;
  width: 40%;
  font-family: Roboto;
  border: none;
  margin: 8px 10px;
  font-size: 17px;
  outline: none;
  color: transparent;
  text-shadow: ${props => (props.calendarOpen ? '0 0 0 #118488' : '0 0 0 #757575')};
  background-color: ${props => (props.calendarOpen ? '#9CEDE6' : 'inherit')};
  user-select: none;
  border-radius: 3px;
  padding: 2px;
`;

const CheckIOInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e4e4e4;
`;

module.exports = {
  CheckIOInput,
  CheckIOInputWrapper,
};
