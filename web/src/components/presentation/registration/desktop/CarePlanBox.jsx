import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';
// These are like big buttons for choosing a care plan on the selection slide

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 166px;
  width: 100%;
  border: 1px solid #f4f4f4;
  color: #bdbdbd;
  font-size: 16px;
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;

  @media ${props => props.theme.device.mobile} {
    width: 178px;
  }

  &:hover,
  &.active {
    background: ${props => props.theme.gradients.main};
    border: none;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    color: ${props => props.theme.colors.shades.white};
  }

  &:hover #icon {
    filter: brightness(100%);
  }
`;

const Icon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 16px;
  /*background: #f4f4f4;*/
  background-image: ${props => (props.icon ? `url(${images[props.icon]})` : '')};
  filter: ${props => (props.active ? `` : `brightness(80%)`)};
`;

const Title = styled.p`
  margin: 0;
`;

const CarePlanBox = ({ active, icon, onClick, title }) => (
  <Wrapper className={active ? 'active' : ''} onClick={onClick}>
    <Icon id="icon" active={active} icon={icon} />
    <Title>{title}</Title>
  </Wrapper>
);

CarePlanBox.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired
};

CarePlanBox.defaultProps = {
  active: false,
  onClick: () => {}
};

export default CarePlanBox;
