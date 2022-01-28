import React from 'react';
import styled from 'styled-components';
import ProviderProfile from './ProviderProfile';

// Provider Lookup List Item

const Wrapper = styled.div`
  margin: 0 0 8px;
  padding: 24px 32px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  border-color: ${props => (props.hovered ? props.theme.colors.shades.pinkOrange : 'none')};

  &:hover {
    border-color: ${props => props.theme.colors.shades.blue};
  }
`;

const ProviderListItem = React.memo(
  ({
    name,
    distance,
    practiceName,
    address,
    phone,
    npiNumber,
    specialties,
    onClick,
    hoveredCardId,
    id,
    setHoveredPinId
  }) => {
    return (
      <Wrapper
        onClick={onClick}
        hovered={id === hoveredCardId ? true : false}
        onMouseEnter={() => setHoveredPinId(id)}
        onMouseLeave={() => setHoveredPinId(null)}
      >
        <ProviderProfile
          id={id}
          name={name}
          distance={distance}
          practiceName={practiceName}
          address={address}
          phone={phone}
          npiNumber={npiNumber}
          specialties={specialties}
        />
      </Wrapper>
    );
  }
);

export default ProviderListItem;
