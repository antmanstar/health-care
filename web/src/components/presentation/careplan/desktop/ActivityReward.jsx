import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// DESKTOP: Activity ActivityReward

const Wrapper = styled.div`
  display: flex;
  border-radius: 4px;
  margin-bottom: 10px;

  &.reward {
    width: calc(50% - 10px);
    background: #fafafa;
    flex-direction: column;
    padding: 16px 16px 32px 32px;
    border: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
    @media ${props => props.theme.device.tabletXL} {
      width: calc(50% - 16px);
    }
  }
  &.discount {
    width: 33%;
    background: white;
    flex-direction: row @media ${props => props.theme.device.tabletXL} {
      width: calc(33.33% - 16px);
    }
    align-items: center;
    padding: 0px 0px 0px 32px;
  }

  @media ${props => props.theme.device.tabletXL} {
    margin-bottom: 0;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
`;

const Earned = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.pinkOrange};
  height: 16px;
`;

const Icon = styled.div`
  background: ${props => props.theme.colors.roles.success};
  width: 10px;
  height: 8px;
  border-radius: 4px;
  margin-right: 32px;
`;

const Title = styled.h3`
  width: 100%;
  margin: 0 0 8px;
  font-size: 16px;
  color: ${props => props.theme.colors.shades.darkGray};
  &.reward {
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const Description = styled.p`
  width: 100%;
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  font-family: 'Roboto';
  color: ${props => props.theme.colors.shades.darkGray};
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
  background: ${props => props.theme.colors.shades.tealBlue};
  color: ${props => props.theme.colors.shades.white};
  border: none;
  border-radius: 4px;
  font-weight: 300;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  font-family: 'Roboto';
  margin-top: 12px;

  &:hover {
    background: #1c4c66;
  }
`;

const ActivityReward = React.memo(({ title, description, layoutClass, buttonText, earned }) => {
  return (
    <>
      {layoutClass === 'reward' && (
        <Wrapper className={layoutClass}>
          <Earned>{earned ? `Earn $${earned}` : ''}</Earned>
          <InfoWrapper>
            <div>
              <Title className={layoutClass}>{title}</Title>
              {description && <Description>{description}</Description>}
            </div>
          </InfoWrapper>
          {buttonText && <Button>{buttonText}</Button>}
        </Wrapper>
      )}
      {layoutClass === 'discount' && (
        <Wrapper className={layoutClass}>
          <Icon />
          <Description>{title}</Description>
        </Wrapper>
      )}
    </>
  );
});

ActivityReward.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  layoutClass: PropTypes.string,
  buttonText: PropTypes.string,
  earned: PropTypes.number
};

ActivityReward.defaultProps = {
  description: null
};

export default ActivityReward;
