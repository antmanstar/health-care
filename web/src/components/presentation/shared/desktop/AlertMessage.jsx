import React from 'react';
import styled from 'styled-components';

const AlertMessageWrapper = styled.div`
  background: #ed5344;
  color: #fff;
  padding: 13px 54px 13px 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  margin-top: 10px;
  max-width: 570px;
`;

const AlertTitle = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 17.58px;
  font-family: 'Roboto';
  font-weight: 700;
`;

const AlertText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 17.58px;
  font-weight: 400;
`;

const AlertMessage = ({ message }) => (
  <AlertMessageWrapper>
    <AlertTitle>Maintenance Schedule </AlertTitle>
    <AlertText>{message}</AlertText>
  </AlertMessageWrapper>
);

export default AlertMessage;
