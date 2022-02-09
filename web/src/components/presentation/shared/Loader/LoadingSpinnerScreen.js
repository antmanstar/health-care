import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const ContentLoading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //background: rgba(255, 255, 255, 0.3);
  background: #00000052;
  z-index: 30;
`;
const StyledLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  width: 100px;
`;

const LoadingSpinnerScreen = ({ type, color }) => (
  <ContentLoading>
    <StyledLoader type={type ? type : 'TailSpin'} color={color ? color : '#F9423A'} />
    <input type="hidden" autoFocus />
  </ContentLoading>
);

export default LoadingSpinnerScreen;
