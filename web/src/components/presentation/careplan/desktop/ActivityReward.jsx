import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// DESKTOP: Activity ActivityReward

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;

  &.half {
    width: 100%;
    @media ${props => props.theme.device.tabletXL} {
      width: calc(50% - 16px);
    }
  }

  &.third {
    width: 100%;
    @media ${props => props.theme.device.tabletXL} {
      width: calc(33.33% - 16px);
    }
  }

  @media ${props => props.theme.device.tabletXL} {
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.blue};
`;

const Description = styled.p`
  width: 100%;
  margin: 0;
  font-size: 14px;
  font-weight: 300;
`;

const Icon = styled.i`
  margin-top: -3px;
  color: ${props => props.theme.colors.roles.success};
  margin-right: 16px;
`;

const ActivityReward = React.memo(({ title, description, layoutClass }) => (
  <Wrapper className={layoutClass}>
    <Icon className="material-icons">check</Icon>
    <div>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </div>
  </Wrapper>
));

ActivityReward.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  layoutClass: PropTypes.string
};

ActivityReward.defaultProps = {
  description: null,
  layoutClass: ''
};

export default ActivityReward;
