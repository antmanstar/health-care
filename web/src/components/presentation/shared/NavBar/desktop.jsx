import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import MainNavigation from '../desktop/MainNavigation';
import MailboxButton from '../desktop/MailboxButton';
import NotificationCenter from '../../notifications/desktop/NotificationCenter';
import withStoreData from '../../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { supportsPassive } from '../../../../utils/browser';
import elasticDataFrame from '../../../../utils/elasticDataFrame';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';
import StyledLoadingSpinner from '../Loader/StyledLoadingSpinner';

const { fetchNotifications, markNotificationsAsRead, signOut } = actions;
const {
  getNotifications,
  getNotificationsDataFrame,
  getNotificationsMarkedQueue,
  getSupportPhoneNumber,
  getToken,
  getUnreadNotifications,
  isSigningOut
} = selectors;

// Desktop Header NavBar

const mainBreakPoint = `1200px`;
const bigScreens = `1388px`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
  padding: 0 16px;
  width: calc(100% - 32px);
  transition: all 0.5s;
  z-index: 11;
  &.on {
    background: ${props => props.theme.gradients.main};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .right-wrapper-number {
    display: none;
  }

  .center-wrapper-number {
    display: flex;
  }

  @media (max-width: ${mainBreakPoint}) {
    padding: 0;
    width: 100%;
    .right-wrapper-number {
      display: flex;
      margin-right: 30px;
    }

    .center-wrapper-number {
      display: none;
    }
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: ${mainBreakPoint}) {
    max-width: 960px;
    height: auto;
    margin-top: 20px;
  }
  @media (max-width: 991px) {
    max-width: 94%;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: ${mainBreakPoint}) {
    order: 1;
  }
`;

const Logo = styled.img`
  height: 24px;
  margin-right: auto;

  @media (max-width: ${mainBreakPoint}) {
    height: 20px;
    padding-top: 2px;
  }
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 960px;
  width: 100%;

  @media (max-width: ${mainBreakPoint}) {
    order: 3;
  }

  @media ${props => props.theme.device.desktopXL} {
    max-width: 1024px;
  }
`;

const PhoneNumber = styled.div`
  height: 64px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${props => props.theme.colors.shades.white};
  font-size: 16px;
  font-weight: 300;

  i {
    margin-right: 8px;
  }

  @media (max-width: ${mainBreakPoint}) {
    height: auto;
    p {
      margin: 0;
    }
  }
`;

const RightWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${mainBreakPoint}) {
    order: 2;
  }
`;

const Icon = styled.i`
  color: ${props => props.theme.colors.shades.white};
`;

const AccountMenuDropdown = styled.div`
  height: 24px;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  line-height: 32px;
  margin-left: 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 300;

  > i {
    display: none;
  }

  @media (min-width: ${bigScreens}) {
    border: 1px solid ${props => props.theme.colors.shades.white};
    border-radius: 4px;
    margin-left: 16px;
    padding: 0 8px 0 16px;

    i {
      display: block;
      padding-left: 8px;
      color: ${props => props.theme.colors.shades.white};
      &.smaller {
        font-size: 18px;
        margin: 0 3px;
      }
    }
  }

  div {
    transition: all 0.1s ease-in-out;
    span.account-label {
      display: none;
      @media (min-width: ${bigScreens}) {
        display: block;
      }
    }
    i {
      display: block;
      margin-right: 8px;
      @media (max-width: ${mainBreakPoint}) {
        margin-right: 0;
      }
      @media (min-width: ${bigScreens}) {
        display: none;
      }
    }
  }

  @media (max-width: 1370px) {
    i {
      transition: all 0.1s ease-in-out;
    }
    &:hover {
      div,
      i {
        transform: scale(1.1);
      }
    }
  }

  .close-outline {
    border: solid 1px white;
    border-radius: 15px;
    font-size: 22px;
  }
`;

const DropdownModal = styled.ul`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 85%;
  right: 0;
  padding: 16px 32px;
  list-style: none;
  background: white;
  border-radius: 4px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  text-align: right;
`;

const Link = styled.li`
  display: inline-block;
  margin-right: 32px;
  color: ${props =>
    props.active ? props.theme.colors.shades.white : props.theme.colors.shades.grayTeal};
  border-bottom: ${props =>
    props.active ? `3px solid ${props.theme.colors.shades.pinkOrange}` : 'none'};
  font-size: 12px;
  font-weight: 400;
  line-height: 32px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.shades.white};
  }
`;

const DropdownLink = styled(Link)`
  margin: 0;
  display: block;
  a {
    color: ${props => props.theme.colors.shades.blue};
    text-shadow: none;
    text-decoration: none;
    display: block;
    line-height: 2rem;
    &:hover {
      color: ${props => props.theme.colors.shades.pinkOrange};
    }
  }
`;

const Mailbox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.shades.white};
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0;
`;

const MailboxButtonWithBadge = withStoreData(MailboxButton, state => ({
  unread: getUnreadNotifications(state)
}));

const NotificationCenterWithData = withStoreData(
  NotificationCenter,
  state => ({
    notifications: getNotifications(state),
    notificationsDataFrame: getNotificationsDataFrame(state),
    notificationsMarkedQueue: getNotificationsMarkedQueue(state),
    token: getToken(state)
  }),
  dispatch => ({
    fetchNotifications: args => dispatch(fetchNotifications(args)),
    markNotificationsAsRead: args => dispatch(markNotificationsAsRead(args))
  }),
  (
    { notifications, notificationsDataFrame, notificationsMarkedQueue, token },
    { fetchNotifications, markNotificationsAsRead },
    ownProps
  ) => {
    const fetch = args => fetchNotifications({ token, ...args });
    return {
      fetch,
      markNotificationsAsRead: ({ ids = [], ...args }) => {
        let uniqueIds = [... new Set(ids.concat(notificationsMarkedQueue))].map(String)
        markNotificationsAsRead({ ids: [uniqueIds], token, ...args })
      },
      notifications:
        notifications &&
        notifications.map(notification => ({
          ref: React.createRef(),
          ...notification
        })),
      notificationsDataFrame: elasticDataFrame(notificationsDataFrame, fetch),
      shouldFetch: () => true,
      ...ownProps
    };
  }
);

class NavBar extends Component {
  static checkScroll() {
    return (window.pageYOffset || document.documentElement.scrollTop) > 28;
  }

  constructor(props) {
    super(props);

    this.state = {
      clicked: props.clicked || false,
      open: false
    };

    this.handlers = {
      handleScroll: this.handleScroll.bind(this),
      handleToggleClick: this.handleToggleClick.bind(this),
      handleSignOut: this.handleSignOut.bind(this),
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

  handleToggleClick() {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }

  handleSignOut() {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    const { clicked, open, scrolled } = this.state;
    const { permanentBg, phoneNumber, isSigningOut } = this.props;

    return (
      <Wrapper className={permanentBg || scrolled ? 'on' : 'off'}>
        <InnerWrapper>
          <LeftWrapper>
            <RouterLink to="/">
              <Logo src={logoImg} />
            </RouterLink>
          </LeftWrapper>
          <CenterWrapper>
            <MainNavigation />
            {phoneNumber && (
              <PhoneNumber className="center-wrapper-number">
                <i className="material-icons">phone</i>
                <p>{`1-${phoneNumber}`}</p>
              </PhoneNumber>
            )}
          </CenterWrapper>
          <RightWrapper>
            {phoneNumber && (
              <PhoneNumber className="right-wrapper-number">
                <i className="material-icons">phone</i>
                <p>{`1-${phoneNumber}`}</p>
              </PhoneNumber>
            )}
            <Mailbox
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handlers.toggleDrawer(true)}
            >
              <MailboxButtonWithBadge />
            </Mailbox>
            <AccountMenuDropdown clicked={clicked} onClick={this.handlers.handleToggleClick}>
              <div>
                <span className="account-label">My Account</span>
                <Icon className="material-icons">
                  {clicked ? <span className="close-outline">close</span> : 'account_circle'}
                </Icon>
              </div>
              {clicked ? (
                <i className="material-icons smaller">close</i>
              ) : (
                <i className="material-icons">keyboard_arrow_down</i>
              )}
              <DropdownModal show={clicked}>
                <DropdownLink>
                  <RouterLink to="/account">Account Settings</RouterLink>
                </DropdownLink>
                <DropdownLink>
                  <RouterLink to="/" onClick={this.handlers.handleSignOut}>
                    Sign Out
                  </RouterLink>
                </DropdownLink>
              </DropdownModal>
            </AccountMenuDropdown>
          </RightWrapper>
        </InnerWrapper>
        <SwipeableDrawer
          open={open}
          anchor="right"
          onOpen={this.handlers.toggleDrawer(true)}
          onClose={this.handlers.toggleDrawer(false)}
        >
          <NotificationCenterWithData handleClick={this.handlers.toggleDrawer(false)} />
        </SwipeableDrawer>
        {
          isSigningOut && <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />
        }
      </Wrapper>
    );
  }
}

NavBar.propTypes = {
  clicked: PropTypes.bool,
  permanentBg: PropTypes.bool,
  signOut: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired
};

NavBar.defaultProps = {
  clicked: false,
  permanentBg: false
};

const mapStateToProps = state => ({
  token: getToken(state),
  phoneNumber: getSupportPhoneNumber(state),
  isSigningOut: isSigningOut(state)
});

const mapDispatchToProps = dispatch => ({
  signOut: token => {
    dispatch(signOut(token));
  }
});

const mergeProps = ({ token, ...stateProps }, { signOut }, ownProps) => ({
  signOut: () => signOut(token),
  ...stateProps,
  ...ownProps
});

const ConnectedNavBar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NavBar);

export default withRouter(ConnectedNavBar);
