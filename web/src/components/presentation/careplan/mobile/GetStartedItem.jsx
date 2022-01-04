import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import images from '../../../../utils/images';


// MOBILE - Get Started Item

const { MobileContainer, MobileSectionBackground, SpaceBetween } = defaultTheme.components;

const EditedSpaceBetween = styled(SpaceBetween)`
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
  margin: 0;

  &.completed-title {
    margin-bottom: 8px;
  }
`;

const Description = styled.p`
  margin: 0;
  /* padding-right: 32px; */
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.gray};
`;

const Reward = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.pinkOrange};
  margin: 0;
`;

const GetStartedItem = React.memo(({ title, reward, desc, completed }) => (
  <MobileSectionBackground>
    <MobileContainer>
      {completed ? (
        <>
          <SpaceBetween>
            <div>
              <Title className="completed-title">{title}</Title>
              <Description>{desc}</Description>
            </div>
            <img src={images["check-in-circle"]} alt="Item Completed" />
          </SpaceBetween>
        </>
      ) : (
        <>
          <EditedSpaceBetween>
            <Title>{title}</Title>
            <Reward>{`Earn ${reward}`}</Reward>
          </EditedSpaceBetween>
          <Description>{desc}</Description>
        </>
      )}
    </MobileContainer>
  </MobileSectionBackground>
));

GetStartedItem.propTypes = {
  title: PropTypes.string.isRequired,
  reward: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  completed: PropTypes.bool
};

GetStartedItem.defaultProps = {
  completed: false
};

export default GetStartedItem;
