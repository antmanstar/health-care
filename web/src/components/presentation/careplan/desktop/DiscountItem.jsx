import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import getWidth from '../../../../utils/getWidth';

// DESKTOP: Discount Item of Reward Section

const Wrapper = styled.div`
  display: flex;
  width: 104px;
  height: 84px;
  flex-direction: column;

  border: 0.5px solid #97979788;
  box-sizing: border-box;
  border-radius: 3px;

  align-items: center;
  padding: 8px;

  justify-content: space-between;
`;

const Logo = styled.img``;

const Description = styled.p`
  width: 100%;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: background: #252526;
  ${({ width }) => ellipsis(`${width * 0.8}px`)}

  @media ${props => props.theme.device.tablet} {
    ${({ width }) => ellipsis(`${0.35 * width}px`)}
  }
`;

const DiscountItem = React.memo(({ title }) => {
  const width = getWidth();
  return (
    <Wrapper>
      <Logo />
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
