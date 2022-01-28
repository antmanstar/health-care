import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
// Desktop Support Profile

const Wrapper = styled.div`
  display: flex;
`;

const ProfileDetails = styled.div`
  margin-left: 30px;
  color: ${props => props.theme.colors.shades.blue};

  > * {
    margin: 0;
  }
`;

const ProfilePic = styled.div`
  max-width: 105px;

  img {
    border-radius: 50%;
    width: 100%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Name = styled.h3`
  margin-bottom: 4px;
  font-weight: 400;
  @media not ${defaultTheme.device.mobile} {
    font-size: 15px;
  }
  @media ${defaultTheme.device.mobile} {
    font-size: 24px;
  }
`;

const Role = styled.h4`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.pinkOrange};
  @media not ${defaultTheme.device.mobile} {
    font-size: 12px;
  }
  @media ${defaultTheme.device.mobile} {
    font-size: 16px;
  }
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.pinkOrange};
    &:hover {
      text-decoration: underline;
    }
    @media not ${defaultTheme.device.mobile} {
      font-size: 10x;
    }
  }
`;
const Email = styled.span`
  font-size: 10px;
  @media ${defaultTheme.device.mobile} {
    font-size: 16px;
  }
`;

const PhoneNumber = styled.span`
  @media not ${defaultTheme.device.mobile} {
    font-size: 10px;
  }
`;

const Icon = styled.i`
  margin-right: 8px;
  color: ${props => props.theme.colors.shades.blue};
  @media not ${defaultTheme.device.mobile} {
    font-size: 18px;
  }
`;

const SupportProfile = React.memo(({ name, roleLabel, number, email, imgSrc }) => (
  <Wrapper>
    <ProfilePic>
      <img src={imgSrc} alt={name} />
    </ProfilePic>
    <ProfileDetails>
      <Name>{name}</Name>
      <Role>{roleLabel}</Role>
      <ContactInfoItem>
        <Icon className="material-icons">phone</Icon>
        <PhoneNumber>{number}</PhoneNumber>
      </ContactInfoItem>
      <ContactInfoItem>
        <Icon className="material-icons">mail_outline</Icon>
        <a href={`mailto:${email}`}>
          <Email>{email}</Email>
        </a>
      </ContactInfoItem>
    </ProfileDetails>
  </Wrapper>
));

SupportProfile.propTypes = {
  name: PropTypes.string.isRequired,
  roleLabel: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
};

export default SupportProfile;
