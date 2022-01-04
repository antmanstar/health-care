import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';

// These are big buttons for the care plan suggestion slide

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 166px;
  width: 306px;
  color: ${props => props.suggested ? props.theme.colors.shades.white : props.theme.colors.shades.blue};
  font-size: 16px;
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.suggested ? props.theme.gradients.main : ''};
  border: ${props => props.suggested ? 'none' : '1px solid #f4f4f4'};
  box-shadow: ${props => props.suggested ? '0 20px 40px rgba(0, 0, 0, 0.1)' : ''};
`;

const Icon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-bottom: 16px;
  background-image: ${props => props.suggested ? `url(${images[`${props.icon}-active`]})` : (props.icon ? `url(${images[`${props.icon}-blue`]})` : '')};
`;

const Title = styled.p`
  margin: 0;
`;

class CarePlanBoxBig extends Component {
  render() {
    return (
      <Wrapper suggested={this.props.suggested} >
        <Icon icon={this.props.icon} suggested={this.props.suggested} />
        <Title>{this.props.title}</Title>
      </Wrapper>
    );
  }
}

CarePlanBoxBig.propTypes = {
  title: PropTypes.string.isRequired
};

export default CarePlanBoxBig;
