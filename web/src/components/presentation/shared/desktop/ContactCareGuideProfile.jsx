import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';
// Contact Care Guide Profile (For Contact Care Guide Modal)

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
  max-width: 128px;

  img {
    border-radius: 50%;
    width: 100%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }
`;
const DefaultPic = styled.div`
  max-width: 105px;

  img {
    border-radius: 50%;
    width: 50%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.theme.colors.shades.blue};
    padding: 15px;
    min-width: 35px;
  }
`;

const Name = styled.h3`
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: 400;
`;

const Role = styled.h4`
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.blue};
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
  }
`;

const Icon = styled.i`
  margin-right: 8px;
  color: ${props => props.theme.colors.shades.blue};
`;

const DefaultMessage = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.pinkOrange};
  @media ${props => props.theme.device.mobile} {
    font-size: 16px;
  }
`;

const ContactCareGuideProfile = React.memo(({ name, roleLabel, number, email, imgSrc }) => (
  <Wrapper>
    {imgSrc && imgSrc.length > 0 ? (
      <ProfilePic>
        <img src={imgSrc} alt={name} />
      </ProfilePic>
    ) : (
      <DefaultPic>
        <img src={images['white_icons/care-guide']} alt={name} />
      </DefaultPic>
    )}

    {name && name.length > 0 ? (
      <ProfileDetails>
        <Name>{name}</Name>
        <Role>{roleLabel}</Role>
        <ContactInfoItem>
          <Icon className="material-icons">phone</Icon>
          <span>{number}</span>
        </ContactInfoItem>
        <ContactInfoItem>
          <Icon className="material-icons">mail_outline</Icon>
          <a href={`mailto:${email}`}>{email}</a>
        </ContactInfoItem>
      </ProfileDetails>
    ) : (
      <ProfileDetails>
        <Name>Your Care Guide</Name>
        <DefaultMessage>We're looking for the right care guide for your needs.</DefaultMessage>
      </ProfileDetails>
    )}
  </Wrapper>
));

ContactCareGuideProfile.propTypes = {
  name: PropTypes.string.isRequired,
  roleLabel: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
};

export default ContactCareGuideProfile;
