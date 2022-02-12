import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ellipsis } from 'polished';
import styled from 'styled-components';

// DESKTOP: Activity ActivityReward

const Wrapper = styled.div`
  display: flex;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
  width: 100%;
  background: #fafafa;
  padding: 16px 32px;

  width: calc(50% - 10px);
  border: 1px solid
    ${props =>
      props.isBecome ? props.theme.colors.roles.success : props.theme.colors.shades.nearlyWhite};
  @media ${props => props.theme.device_up.tablet} {
    width: 100%;
    padding: 12px;
  }

  @media ${props => props.theme.device.tabletXL} {
    width: calc(50% - 16px);
  }

  @media ${props => props.theme.device_up.desktop} {
    margin-bottom: 0;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  @media ${props => props.theme.device_up.tablet} {
    margin: 0;
    align-items: flex-start;
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0 0 8px;
  font-size: 16px;
  color: ${props =>
    props.isComing ? props.theme.colors.shades.darkGray : props.theme.colors.shades.blue};
`;

const Description = styled.p`
  width: ${props => (props.isBecome ? '80%' : '100%')};
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  font-family: 'Roboto';
  color: ${props =>
    props.isComing ? props.theme.colors.shades.mediumGray : props.theme.colors.shades.darkGray};

  &.collapsed {
    ${ellipsis(undefined, 3)};
  }

  @media ${props => props.theme.device_up.tablet} {
    display: none;
  }

  @media ${props => props.theme.device_up.mobile} {
    width: 100%;
  }
`;

const Earned = styled.div`
  display: flex;
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  right: 16px;
  height: 16px;
  min-width: ${props => (props.isBecome ? '120px' : '60px')};
  margin-top: ${props => (props.isBecome ? '16px' : '0')};
  color: ${props =>
    props.isBecome
      ? props.theme.colors.roles.success
      : props.isBecome
      ? props.theme.colors.shades.darkGray
      : props.theme.colors.shades.pinkOrange};

  @media ${props => props.theme.device_up.tablet} {
    flex-direction: column;
    justify-content: center;
    height: ${props => (props.isBecome ? 'auto' : '16px')};
    margin-top: 0;
    min-width: 60px;
  }

  @media ${props => props.theme.device_up.mobile} {
    margin-left: 10px;
    position: unset;
  }
`;

const EarnedText = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const Link = styled.a`
  margin-top: 4px;
  color: ${props => props.theme.colors.shades.tealBlue};
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  text-decoration: underline;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  @media (max-width: 850px) {
    width: 300px;
  }

  @media ${props => props.theme.device_up.mobile} {
    width: 100%;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 160px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  background: ${props =>
    props.isComing ? props.theme.colors.shades.darkGray : props.theme.colors.shades.tealBlue};
  color: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  font-weight: 300;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  font-family: 'Roboto';
  flex-direction: column;
  margin-right: 18px;
  pointer-events: ${props => (props.isComing ? 'none' : 'unset')};

  @media ${props => props.theme.device_up.tablet} {
    margin: 0;
  }

  &:hover {
    background: #1c4c66;
  }
`;

const ComingText = styled.div`
  color: ${props => props.theme.colors.shades.darkGray};
  font-weight: bold;
  text-align: center;

  @media ${props => props.theme.device_up.tablet} {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 3px solid
    ${props =>
      props.isComing ? props.theme.colors.shades.darkGray : props.theme.colors.roles.success};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  @media ${props => props.theme.device_up.tablet} {
    margin-left: 0;
    margin-top: 8px;
  }
`;

const ActivityReward = React.memo(
  ({ title, description, buttonText, earned, date, id, ctaType, action }) => {
    const [expanded, setExpanded] = useState(false);

    const isBecomeAnEvryMember = title === 'Become an Evry Member'; // or id === '583278'
    const isComing =
      isBecomeAnEvryMember || date === null || new Date(date) < new Date() ? false : true;

    const handleOnClick = (e, buttonText, link) => {
      if (buttonText == 'View Wellness Programs') {
        const element = document.getElementById('meetyourgoals');
        const y = element.getBoundingClientRect().top + window.pageYOffset - 65;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.open(link);
      }
    };

    return (
      <Wrapper isBecome={isBecomeAnEvryMember}>
        <InfoWrapper>
          <div>
            <Title isComing={isComing}>{title}</Title>
            {description && (
              <Description
                isComing={isComing}
                className={expanded ? '' : 'collapsed'}
                isBecome={isBecomeAnEvryMember}
              >
                {description}
              </Description>
            )}
          </div>
          <Link onClick={() => setExpanded(!expanded)}>{expanded ? 'Read Less' : 'Read More'}</Link>
          {!isBecomeAnEvryMember && (
            <ButtonWrapper>
              {buttonText && (
                <Button
                  isComing={isComing}
                  onClick={e => handleOnClick(e, buttonText, action)}
                  id={id}
                >
                  {buttonText}
                </Button>
              )}
              {isComing && <ComingText>Coming Soon...</ComingText>}
            </ButtonWrapper>
          )}
        </InfoWrapper>
        <Earned isBecome={isBecomeAnEvryMember} isComing={isComing}>
          <EarnedText>{earned ? `Earn $${earned}` : ''}</EarnedText>
          {isBecomeAnEvryMember && (
            <IconWrapper isComing={!isBecomeAnEvryMember}>
              <i className="material-icons">check</i>
            </IconWrapper>
          )}
        </Earned>
      </Wrapper>
    );
  }
);

ActivityReward.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  earned: PropTypes.number,
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  ctaType: PropTypes.number.isRequired,
  action: PropTypes.string
};

ActivityReward.defaultProps = {
  description: null
};

export default ActivityReward;
