import styled from 'styled-components';

const IncrementDecrementButton = styled.button`
  display: flex;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  outline: none;
`;

const IncDecButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
`;

const IncDecWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const GuestSelector = styled.div`
  padding: 15px;
  position: absolute;
  background-color: white;
  border: 1px solid #e4e4e4;
  width: 90%;
`;

const GuestInput = styled.input`
  height: 100%;
  width: 40%;
  font-family: Roboto;
  border: none;
  margin: 6px 10px;
  font-size: 17px;
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 #757575;
  user-select: none;
  borderRadius: 3px;
  padding: 2px;
`;

const GuestInputBorder = styled.div`
  border: 1px solid #e4e4e4;
`;

const FieldLabel = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 600,
`;

const FieldWrapper = styled.div`
  position: relative;
  text-align: left;
  width: 90%;
  color: #484848;
  margin-bottom: 1em;
`;

module.exports = {
  GuestSelector,
  IncrementDecrementButton,
  IncDecButtonWrapper,
  IncDecWrapper,
  GuestInput,
  GuestInputBorder,
  FieldLabel,
  FieldWrapper,
};
