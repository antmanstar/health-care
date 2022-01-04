import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SideMenuListItem from './SideMenuListItem';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';

const { signOut } = actions;
const { getToken } = selectors;

const Wrapper = styled.div`
  width: 80vw;
`;

const UpperSection = styled.div`
  background: ${props => props.theme.gradients.main};
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 24px;
  margin-left: 25px;
`;

const SideMenuList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const CloseWrapper = styled.div`
  display: inline-block;
  margin-right: 25px;
  cursor: pointer;
  i {
    color: ${props => props.theme.colors.white};
  }
`;

const Icon = styled.i`
  color: ${props => props.theme.colors.shades.white};
`;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handlers = {
      handleSignOut: this.handleSignOut.bind(this)
    };
  }

  handleSignOut() {
    const { signOut, token } = this.props;
    signOut(token);
  }

  render() {
    const { onClose } = this.props;
    return (
      <Wrapper>
        <UpperSection>
          <Logo src={logoImg} />
          <CloseWrapper onClick={onClose} onKeyDown={onClose}>
            <Icon className="material-icons">close</Icon>
          </CloseWrapper>
        </UpperSection>
        <SideMenuList>
          <SideMenuListItem label="Home" link="/" icon="home" svgIcon={false} onClick={onClose} />
          <SideMenuListItem label="My Plan" link="/plan" icon="plan-icon-heart" onClick={onClose} />
          <SideMenuListItem
            label="My Claims"
            link="/claims"
            icon="claims-circle"
            onClick={onClose}
          />
          <SideMenuListItem
            label="My Coverage"
            link="/coverage"
            icon="chrome_reader_mode"
            svgIcon={false}
            onClick={onClose}
          />
          <SideMenuListItem
            label="Customer Support"
            link="/support"
            icon="question_answer"
            svgIcon={false}
            onClick={onClose}
          />
          <SideMenuListItem
            label="Document Center"
            link="/documents"
            icon="insert_drive_file"
            svgIcon={false}
            onClick={onClose}
          />
          <SideMenuListItem
            label="Member Tools"
            link="/member-tools"
            icon="calculator"
            onClick={onClose}
          />
          <SideMenuListItem
            label="Account Settings"
            link="/account"
            icon="settings"
            svgIcon={false}
            onClick={onClose}
          />
          <SideMenuListItem
            label="Sign Out"
            link="/"
            icon="power_settings_new"
            svgIcon={false}
            onClick={this.handlers.handleSignOut}
          />
        </SideMenuList>
      </Wrapper>
    );
  }
}

SideMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string,
  signOut: PropTypes.func.isRequired
};

SideMenu.defaultProps = {
  token: null
};

const mapStateToProps = state => ({ token: getToken(state) });

const mapDispatchToProps = dispatch => ({
  signOut: token => {
    dispatch(signOut(token));
  }
});

const ConnectedSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default ConnectedSideMenu;
