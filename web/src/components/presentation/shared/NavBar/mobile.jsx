import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import SideMenu from '../mobile/SideMenu';
import history from '../../../../utils/history';
import { supportsPassive } from '../../../../utils/browser';
import actions from '@evry-member-app/shared/store/actions';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';

const { openNewSupportRequestModal } = actions;

// Mobile Header NavBar

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  background: transparent;
  z-index: 13;
  &.on {
    background: ${props => props.theme.gradients.main};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    height: 16px;
    text-decoration: none;
  }
`;

const Logo = styled.img`
  height: 16px;
  margin-right: auto;
`;

const BackButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  background: none;
  border: none;
  padding: 0;
`;

const Title = styled.p`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  margin: 0;
  text-align: center;
  color: ${props => props.theme.colors.shades.white};
`;

const Hamburger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.shades.white};
  cursor: pointer;
`;

const NewRequestButton = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.white};
  outline: none;
  background: none;
  border: none;
`;

const Icon = styled.i`
  color: ${props => props.theme.colors.shades.white};
`;

// We have to disable/enable some transitions specifically on ios
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class NavBar extends Component {
  static checkScroll() {
    return (window.pageYOffset || document.documentElement.scrollTop) > 28;
  }

  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handlers = {
      handleScroll: this.handleScroll.bind(this),
      toggleDrawer: this.toggleDrawer.bind(this)
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handlers.handleScroll, supportsPassive());
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlers.handleScroll);
  }

  toggleDrawer = open => () => {
    this.setState({ open });
  };

  handleScroll() {
    this.setState({
      scrolled: NavBar.checkScroll()
    });
  }

  render() {
    const { open, scrolled } = this.state;
    const {
      left,
      title,
      right,
      noBg,
      permanentBg,
      permanentTitle,
      openNewSupportRequestModal
    } = this.props;

    return (
      <Wrapper className={!(noBg === true) && (permanentBg || scrolled) ? 'on' : 'off'}>
        <InnerWrapper>
          {(left === 'logo' && (
            <RouterLink to="/">
              <Logo src={logoImg} />
            </RouterLink>
          )) ||
            (left === 'back' && (
              <BackButton type="button" onClick={history.goBack}>
                BACK
              </BackButton>
            ))}
          {(permanentTitle || scrolled) && <Title>{title}</Title>}
          {right === 'menu' && (
            <Hamburger
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handlers.toggleDrawer(true)}
            >
              <Icon className="material-icons">menu</Icon>
            </Hamburger>
          )}
          {right === 'support' && (
            <NewRequestButton
              type="button"
              onClick={() => openNewSupportRequestModal('STANDARD_SUPPORT_REQUEST_START')}
            >
              NEW
            </NewRequestButton>
          )}
        </InnerWrapper>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={open}
          anchor="right"
          onOpen={this.handlers.toggleDrawer(true)}
          onClose={this.handlers.toggleDrawer(false)}
        >
          <SideMenu onClose={this.handlers.toggleDrawer(false)} />
        </SwipeableDrawer>
      </Wrapper>
    );
  }
}

NavBar.propTypes = {
  noBg: PropTypes.bool,
  permanentBg: PropTypes.bool,
  left: PropTypes.oneOf(['logo', 'back', null]),
  right: PropTypes.oneOf(['menu', 'support', null]),
  title: PropTypes.string,
  permanentTitle: PropTypes.bool,
  openNewSupportRequestModal: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  noBg: false,
  permanentBg: false,
  left: null,
  right: null,
  title: undefined,
  permanentTitle: false
};

const mapDispatchToProps = dispatch => ({
  openNewSupportRequestModal: request => {
    dispatch(openNewSupportRequestModal(request));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
