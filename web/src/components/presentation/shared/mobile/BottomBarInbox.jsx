import React from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import InboxModal from './InboxModal';
import { iOS } from '../../../../utils/browser';

// Bottom Search input in footer of every mobile view

const Mailbox = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  color: ${props => props.theme.colors.shades.white};
  &:hover,
  &:focus,
  &:active {
    .material-icons {
      filter: brightness(50%);
    }
  }
`;

const Icon = styled.div`
  height: auto;
  color: ${props => props.theme.colors.shades.mediumGray};
  cursor: pointer;
  padding: 8px;
  margin-left: 15px;
  font-size: 26px;
`;

const Badge = styled.div`
  position: absolute;
  left: 16px;
  top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  font-size: 13px;
  background: ${props => props.theme.colors.shades.pinkOrange};
  color: ${props => props.theme.colors.shades.white};
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
`;

class BottomBarInbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handlers = {
      toggleDrawer: this.toggleDrawer.bind(this)
    };
  }

  toggleDrawer = open => () => {
    this.setState({ open });
  };

  render() {
    const { unread } = this.props;
    const { open } = this.state;
    return (
      <>
        <Mailbox onClick={this.handlers.toggleDrawer(true)}>
          <Icon className="material-icons">inbox</Icon>
          {unread > 0 && <Badge>{unread}</Badge>}
        </Mailbox>
        <SwipeableDrawer
          disableBackdropTransition={!iOS()}
          disableDiscovery={iOS()}
          open={open}
          anchor="bottom"
          onOpen={this.handlers.toggleDrawer(true)}
          onClose={this.handlers.toggleDrawer(false)}
        >
          <InboxModal onClick={this.handlers.toggleDrawer(false)} />
        </SwipeableDrawer>
      </>
    );
  }
}

BottomBarInbox.propTypes = {
  unread: PropTypes.number
};

BottomBarInbox.defaultProps = {
  unread: 0
};

export default BottomBarInbox;
