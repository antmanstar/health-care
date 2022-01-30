import React, { useState, useEffect, useCallback, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import styled, { withTheme } from 'styled-components';
import Button from '../presentation/shared/desktop/Button';

const WarningText = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.4em;
  justify-content: center;
`;

const LineBreak = styled.div`
  padding: 15px;
  width: 100%;
`;

const WarningTime = styled.span`
  color: ${props => props.theme.colors.shades.pinkRed};
  font-weight: bold;
  font-size: 2.4em;
`;

const { signOut } = actions;
const { getToken } = selectors;

const SessionTimeout = props => {
  const inactivityLimit = 30;
  const warningInterval = 120000;
  const [isOpen, setOpen] = useState();
  const [counter, setCounter] = useState();
  const events = ['click', 'load', 'scroll'];

  const { Scrim, ModalBody, ModalHeader, ModalTitle, ModalWrapper } = props.theme.components;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    const { signOut, token } = props;
    signOut(token);
  };

  const warningTimeout = useRef(null);
  const setWarningTimeout = () => {
    warningTimeout.current = setTimeout(() => {
      setOpen(true);
    }, warningInterval);
  };

  useEffect(() => {
    if (isOpen) setCounter(inactivityLimit);
    clearTimeout(inactivityTimeout.current);
  }, [isOpen]);

  const inactivityTimeout = useRef(null);
  React.useEffect(() => {
    if (counter > 0) inactivityTimeout.current = setTimeout(() => setCounter(counter - 1), 1000);
    else if (counter === 0) {
      handleSignOut();
    }
  }, [counter]);

  const setTimeouts = () => {
    setWarningTimeout();
  };

  const clearTimeouts = () => {
    clearTimeout(warningTimeout.current);
  };

  const resetTimeouts = () => {
    clearTimeouts();
    setTimeouts();
  };

  useEffect(() => {
    events.forEach(event => {
      window.addEventListener(event, resetTimeouts);
    });

    setTimeouts();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimeouts);
      });

      clearTimeouts();
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const renderTimeMinSec = () => {
    let minutes = Math.floor(counter / 60);
    let seconds = counter - minutes * 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <Scrim />
      <ModalWrapper className="narrow">
        <ModalHeader>
          <ModalTitle>Are you still there?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <WarningText>
            <div>For your security you will be signed out in:</div>
            <LineBreak />
            <WarningTime>{renderTimeMinSec()}</WarningTime>
            <LineBreak />
            <Button text="I'd like to stay" onClick={() => handleClose()} />
          </WarningText>
        </ModalBody>
      </ModalWrapper>
    </>
  );
};

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
