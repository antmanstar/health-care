import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

export const ButtonLoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButtonLoader = styled(Loader)`
  margin-right: 10px;
`;

export const ButtonLoader = () => {
  return <StyledButtonLoader type="TailSpin" height={20} width={20} color={'#FFFFFF'} />;
};
