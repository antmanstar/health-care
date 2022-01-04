import React from 'react';
import styled from 'styled-components';
import ProviderProfile from './ProviderProfile';

// Provider Lookup List Item

const Wrapper = styled.div`
  width: 100%;
  margin: 0 0 8px;
  padding: 24px 32px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.shades.blue};
  }
`;

const ProviderListItem = React.memo(() => (
  <Wrapper>
    <ProviderProfile
      name="Jacob Jefferson, M.D."
      distance="0.8"
      practiceName="Clearstone Family Medicine"
      address="2310 Spring Valley Rd. Plano, TX 75023"
      phone="469-345-9284"
      npiNumber="123456789"
      network="Evry Premier Network"
      specialties={['Family Medicine']}
      languages={['English']}
    />
  </Wrapper>
));

export default ProviderListItem;
