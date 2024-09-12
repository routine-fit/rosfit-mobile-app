import styled from 'styled-components/native';

export const StepContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 55px;
  margin-vertical: 5px;
`;

export const Dot = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  z-index: 1;
`;

export const Line = styled.View`
  width: 3px;
  height: 50px;
  background-color: gray;
  position: absolute;
  left: 8px;
  top: 33px;
`;

export const StepContent = styled.View`
  margin-left: 30px;
`;
