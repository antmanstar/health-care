import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// The Mailbox Button opens a drawer containing an inbox of alerts and messages.
// takes an "unread" prop that displays a badge if >0;

const Mailbox = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  color: ${props => props.theme.colors.shades.white};
`;

const Badge = styled.div`
  position: absolute;
  left: -50%;
  top: -30%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  background: ${props => props.theme.colors.shades.pinkOrange};
  color: ${props => props.theme.colors.shades.white};
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const MailboxButton = React.memo(({ unread }) => (
  <Mailbox>
    <i className="material-icons">inbox</i>
    {unread > 0 && <Badge>{unread}</Badge>}
  </Mailbox>
));

MailboxButton.propTypes = {
  unread: PropTypes.number
};

MailboxButton.defaultProps = {
  unread: 0
};

export default MailboxButton;
