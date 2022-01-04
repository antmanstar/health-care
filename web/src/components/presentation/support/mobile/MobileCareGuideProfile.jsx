import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MOBILE - Care Guide Profile for Support View

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  z-index: 1;
`;

const ProfilePic = styled.div`
  max-width: 96px;
  margin: 0 auto 4px;

  img {
    border-radius: 50%;
    width: 100%;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Name = styled.h1`
  margin: 0 0 2px;
  font-size: 24px;
  font-weight: 400;
  color: ${props =>
    props.inverse ? props.theme.colors.shades.white : props.theme.colors.shades.blue};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  color: ${props =>
    props.inverse ? props.theme.colors.shades.white : props.theme.colors.shades.pinkOrange};
`;

const MobileCareGuideProfile = React.memo(({ name, imgSrc, inverse }) => (
  <Wrapper>
    <ProfilePic>
      <img src={imgSrc} alt={name} />
    </ProfilePic>
    <Name inverse={inverse}>{name}</Name>
    <Subtitle inverse={inverse}>Your Care Guide</Subtitle>
  </Wrapper>
));

MobileCareGuideProfile.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  inverse: PropTypes.bool
};

MobileCareGuideProfile.defaultProps = {
  inverse: false
};

export default MobileCareGuideProfile;
