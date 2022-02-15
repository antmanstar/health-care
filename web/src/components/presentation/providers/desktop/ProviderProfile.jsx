import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ProviderTag from './ProviderTag';
import images from '../../../../utils/images';

// Provider Profile for use in "Provider Lookup" View

const { SpaceBetween } = defaultTheme.components;

const Wrapper = styled.div`
  h3,
  p {
    margin: 0;
  }

  h3 {
    color: ${props => props.theme.colors.shades.blue};
    font-size: 1em;
    @media ${props => props.theme.device.desktop} {
      font-size: 1.2em;
    }
  }
`;

const MarginBottom = styled.div`
  margin-bottom: 8px;
`;

const ProviderContactInfo = styled.div`
  font-size: 14px;
  line-height: 1.4em;
  margin-bottom: 8px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.shades.pinkOrange};
  text-transform: uppercase;

  p {
    font-size: 14px;
  }

  i {
    font-size: 20px;
    margin-left: 8px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;

  > * {
    margin-bottom: 8px;
  }
`;

const PinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PinLabel = styled.label`
  position: absolute;
  margin-bottom: 6px;
  z-index: 1;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const Pin = styled.img`
  transform: scale(0.8);
`;

const ProviderProfile = React.memo(
  ({ name, distance, practiceName, address, phone, npiNumber, specialties, id }) => {
    return (
      <Wrapper>
        <MarginBottom>
          <SpaceBetween>
            <h3>{name !== '' ? name : practiceName}</h3>
            <Location>
              <p>{`${distance} miles`}</p>
              <PinWrapper>
                <PinLabel>{id + 1}</PinLabel>
                <Pin src={images[`location_pin`]} />
              </PinWrapper>
            </Location>
          </SpaceBetween>
        </MarginBottom>
        <ProviderContactInfo>
          {name !== '' ? practiceName : undefined}
          {address}
          <br />
          {phone}
        </ProviderContactInfo>
        {/* <ProviderContactInfo>{`NPI: ${npiNumber}`}</ProviderContactInfo> */}
        <Tags>
          {specialties?.map(specialty => (
            <ProviderTag specialty text={specialty} />
          ))}
        </Tags>
      </Wrapper>
    );
  }
);

ProviderProfile.propTypes = {
  name: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  practiceName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  npiNumber: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProviderProfile;
