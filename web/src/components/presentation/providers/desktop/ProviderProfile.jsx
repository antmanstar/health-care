import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import ProviderTag from './ProviderTag';

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

const ProviderProfile = React.memo(
  ({
    name,
    distance,
    practiceName,
    address,
    phone,
    npiNumber,
    network,
    specialties,
    languages
  }) => (
    <Wrapper>
      <MarginBottom>
        <SpaceBetween>
          <h3>{name}</h3>
          <Location>
            <p>{`${distance} miles`}</p>
            <i className="material-icons">location_on</i>
          </Location>
        </SpaceBetween>
      </MarginBottom>
      <ProviderContactInfo>
        {practiceName}
        <br />
        {address}
        <br />
        {phone}
      </ProviderContactInfo>
      <ProviderContactInfo>{`NPI: ${npiNumber} | ${network}`}</ProviderContactInfo>
      <Tags>
        {specialties.map(specialty => (
          <ProviderTag specialty text={specialty} />
        ))}
        {languages.map(language => (
          <ProviderTag text={language} />
        ))}
      </Tags>
    </Wrapper>
  )
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
