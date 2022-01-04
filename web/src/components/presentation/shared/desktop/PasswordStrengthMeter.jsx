import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';

// Password Strength Meter

const Wrapper = styled.div`
  padding: 0 16px;
`;

const ProgressBar = styled.div`
  margin: 0 auto 8px;
  position: relative;
`;

const Background = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  opacity: 1;
`;

const Fill = styled.div`
  position: absolute;
  width: ${props => props.percentage};
  height: 8px;
  top: 0;
  left: 0;
  background: ${props =>
    (props.color === 0 && props.theme.colors.roles.danger) ||
    (props.color === 1 && props.theme.colors.roles.danger) ||
    (props.color === 2 && props.theme.colors.roles.pending) ||
    props.theme.colors.roles.success};
`;

const Strength = styled.div`
  display: flex;
  height: 16px;
  color: ${props => props.theme.colors.shades.gray};

  > * {
    margin: 0 8px 0 0;
    font-size: 14px;
  }
`;

const Label = styled.p`
  color: ${props =>
    (props.color === 0 && props.theme.colors.roles.danger) ||
    (props.color === 1 && props.theme.colors.roles.danger) ||
    (props.color === 2 && props.theme.colors.roles.pending) ||
    props.theme.colors.roles.success};
`;

class PasswordStrengthMeter extends Component {
  createPasswordLabel = score => {
    switch (score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };

  getPercentage = (score, password) => {
    let percentage = (score / 4) * 100;

    if (percentage < 25) {
      percentage = '25%';
    } else {
      percentage = `${percentage}%`;
    }

    if (password.length < 1) {
      percentage = '0%';
    }

    return percentage;
  };

  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);
    const { score } = testedResult;
    return (
      <Wrapper>
        <ProgressBar>
          <Background />
          <Fill percentage={this.getPercentage(score, password)} color={score} />
        </ProgressBar>
        <Strength>
          {password.length >= 1 && (
            <>
              <p>Password Strength:</p>
              <Label color={score}>{this.createPasswordLabel(score)}</Label>
            </>
          )}
        </Strength>
      </Wrapper>
    );
  }
}

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string
};

PasswordStrengthMeter.defaultProps = {
  password: ''
};

export default PasswordStrengthMeter;
