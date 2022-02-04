import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import getWidth from '../../../../utils/getWidth';

// DESKTOP: Discount Item of Reward Section

const Wrapper = styled.div`
  display: flex;
  border-radius: 4px;
  margin-bottom: 20px;
  position: relative;

  background: white;
  align-items: center;
  padding: 0px 0px 0px 32px;

  @media ${props => props.theme.device_up.tablet} {
    width: 100%;
  }
`;

const Icon = styled.div`
  background: ${props => props.theme.colors.roles.success};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 26px;
`;

const Description = styled.p`
  width: 100%;
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  font-family: 'Roboto';
  color: ${props => props.theme.colors.shades.darkGray};
  ${({ width }) => ellipsis(`${width * 0.8}px`)}

  @media ${props => props.theme.device.tablet} {
    ${({ width }) => ellipsis(`${0.35 * width}px`)}
  }
`;

const DiscountItem = React.memo(({ title }) => {
  const width = getWidth();
  return (
    <Wrapper>
      <div>
        <Icon />
      </div>
      <Description width={width}>{title}</Description>
    </Wrapper>
  );
});

DiscountItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  earned: PropTypes.number
};

DiscountItem.defaultProps = {
  description: null
};

export default DiscountItem;
