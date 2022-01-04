import React, { useState, useEffect, useCallback, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import styled, { withTheme } from 'styled-components';
import Button from '../presentation/shared/desktop/Button';

const WarningText = styled.div`
  font-size: 1.4em;
`;

const WarningTime = styled.span`
  color: ${props => props.theme.colors.shades.pinkRed};
`;

const { signOut } = actions;
const { getToken } = selectors;

const SessionTimeout = (props) => {
  const [ isOpen, setOpen ] = useState(undefined);
  const events = ['click', 'load', 'scroll'];
  const inactivityLimit = 180000;
  const warningInterval = 10000;

  const {
    Scrim,
    ModalBody,
    ModalButtonsRight,
    ModalHeader,
    ModalSectionDivider,
    ModalTitle,
    ModalWrapper
  } = props.theme.components;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    const { signOut, token } = props;
    signOut(token);
  };

  const expirationTimeout = useRef(null);
  const setExpirationTimeout = () => {
    expirationTimeout.current = setTimeout(() => {
      handleSignOut();
    }, inactivityLimit);
  };

  const warningTimeout = useRef(null);
  const setWarningTimeout = () => {
    warningTimeout.current = setTimeout(() => {
      setOpen(true);
    }, inactivityLimit - warningInterval);
  };

  const setTimeouts = () => {
    setExpirationTimeout();
    setWarningTimeout();
  };

  const clearTimeouts = () => {
    clearTimeout(expirationTimeout.current);
    clearTimeout(warningTimeout.current);
  }

  useEffect(() => {
    const resetTimeouts = () => {
      clearTimeouts();
      setTimeouts();
    }
  
    events.forEach((event) => {
      window.addEventListener(event, resetTimeouts);
    });

    setTimeouts();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeouts);
      });
  
      clearTimeouts();
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Scrim />
      <ModalWrapper className="narrow">
        <ModalHeader>
          <ModalTitle>Are you still there?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <WarningText>
            If not, we will log you out in
            <WarningTime>{warningInterval / 1000} seconds</WarningTime>.
          </WarningText>
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <Button text="Dismiss" onClick={() => handleClose()} />
        </ModalButtonsRight>
      </ModalWrapper>
    </>
  );
}

SessionTimeout.propTypes = {
  theme: PropTypes.shape({}),
  token: PropTypes.string,
  signOut: PropTypes.func.isRequired
};

SessionTimeout.defaultProps = {
  token: null
};

const mapStateToProps = state => ({
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  signOut: token => {
    dispatch(signOut(token));
  }
});

const ConnectedSessionTimeout = compose(
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(SessionTimeout);

export default ConnectedSessionTimeout;
