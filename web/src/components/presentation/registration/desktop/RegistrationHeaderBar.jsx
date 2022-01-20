import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';
import { Link as RouterLink } from 'react-router-dom';

const { signOut } = actions;
const { getSupportPhoneNumber, isAuthenticated, getToken } = selectors;

// Like a navbar minus the nav. Only used during registration.

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;

  background: ${props => props.theme.gradients.main};
  z-index: 1000;

  @media ${props => props.theme.device.mobile} {
    z-index: 1;
    background: linear-gradient(90deg, #02283c, #022f48);
  }

  @media ${props => props.theme.device.desktop} {
    z-index: unset;
    background: unset;
  }
`;

const Logo = styled.img`
  height: 24px;
`;

const PhoneNumber = styled.div`
  margin-right: 8px;
  display: none;
  align-items: center;
  color: ${props => props.theme.colors.shades.white};
  font-size: 16px;
  font-weight: 300;
  @media ${props => props.theme.device.tabletXL} {
    display: flex;
  }
`;

const PhoneGraphic = styled.i`
  fill: ${props => props.theme.colors.shades.white};
  margin: 0 4px 0 16px;
`;

const Link = styled.li`
  display: inline-block;
  position: relative;
  margin-left: 16px;
  color: ${props => props.theme.colors.shades.grayTeal};
  font-size: 16px;
  font-weight: 300;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.shades.grayTeal};
  border-radius: 5px;
  padding: 5px;

  &:hover {
    color: ${props => props.theme.colors.shades.white};
    border-color: ${props => props.theme.colors.shades.white};
  }
`;

const RegistrationHeaderBar = ({ phoneNumber, isAuthenticated, signOut }) => (
  <Wrapper>
    <RouterLink to="/">
      <Logo src={logoImg} />
    </RouterLink>
    {phoneNumber && (
      <PhoneNumber>
        <p>Need Help?</p>
        <PhoneGraphic className="material-icons">phone</PhoneGraphic>
        <p>{`1-${phoneNumber}`}</p>
        {isAuthenticated ? <Link onClick={() => signOut()}>Sign Out</Link> : undefined}
      </PhoneNumber>
    )}
  </Wrapper>
);

RegistrationHeaderBar.defaultProps = {
  isAuthenticated: false
};

RegistrationHeaderBar.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  phoneNumber: getSupportPhoneNumber(state),
  isAuthenticated: isAuthenticated(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  signOut: token => {
    dispatch(signOut(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationHeaderBar);
