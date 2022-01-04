import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Error Message for general use

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 32px;
  color: ${props => props.theme.colors.shades.pinkRed};
`;

const Icon = styled.i`
  margin-right: 16px;
`;

const Message = styled.p`
  margin: 0;
`;

const Error = styled.div`
width: 100%;
display: flex;
align-items: center;
`;

const ErrorMessage = React.memo(({ message }) => {
  return (
    <Wrapper>
      {
        Array.isArray(message) ?
          message.map(message =>
          (
            <Error>
              <Icon className="material-icons">error_outline</Icon>
              <Message>{message || "This is the default error message. It's not very helpful."}</Message>
            </Error>
          ))
          :
          <>
            <Icon className="material-icons">error_outline</Icon>
            <Message>{message || "This is the default error message. It's not very helpful."}</Message>
          </>
      }
    </Wrapper>
  )
});

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
