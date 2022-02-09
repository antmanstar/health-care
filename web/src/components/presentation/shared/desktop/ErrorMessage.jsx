import React, { useEffect, useState } from 'react';
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

const extractEmails = text => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
};
const convertMsg2Redable = msg => {
  // User name justin.viola@o2m.systems already exists. Email address justin.viola@o2m.systems already exists.
  const emails = extractEmails(msg);
  if (msg.includes('already exists') && emails.length > 0) {
    return `Email address ${emails[0]} is already registered to another account`;
  }

  switch (msg) {
    case 'The eligibility_id field is required.':
      return 'Member ID is required';
    case 'The field eligibility_id must be a string with a minimum length of 1 and a maximum length of 50.':
      return 'Member ID must be between 1 and 50 characters.';
    case 'The last_4_digits_ssn field is required.':
      return 'Last 4 digits of your social security number is required.';
    case 'The field last_4_digits_ssn must be a string with a minimum length of 4 and a maximum length of 4.':
      return 'Your social security number must be 4 digits.';
    case 'The password field is required.':
      return 'Password is required.';
    case 'The field password must be a string with a minimum length of 8 and a maximum length of 64.':
      return 'Password must be between 8 and 64 characters.';
    case 'The email_address field is required.':
      return 'Email is required.';
    case 'The field email_address must be a string with a minimum length of 3 and a maximum length of 128.':
      return 'Email must be between 3 and 128 characters.';
    case 'The email_address field is not a valid e-mail address.':
      return 'Email is not a valid email address.';
    case 'The field password must be a string with a minimum length of 4 and a maximum length of 64.':
      return 'Password must be between 4 and 64 characters.';
    case 'The two_way_factor_token field is required.':
      return 'The 2FA token is required.';
    case 'The identification_code field is required.':
      return 'The identification code is required.'
    case 'The field identification_code must be a string with a minimum length of 6 and a maximum length of 6.':
      return 'The code must be 6 characters long.';
    case 'Identification code you entered is not valid':
      return 'The code you entered is not valud';
    case 'The new_password field is required':
      return 'The new password field is required';
    case 'The field new_password must be a string with a minimum length of 4 and a maximum length of 64.':
      return 'The new password field must be between 4 and 64 characters';
    case 'The new_password_confirm field is required.':
      return 'The confirm new password field is required';
    case 'The field new_password_confirm must be a string with a minimum length of 4 and a maximum length of 64.':
      return 'The confirm new password field must be between 4 and 64 characters';
    case 'The password_reset_token field is required.':
      return 'The password reset token field is required';
    case 'The field password_reset_token must be a string with a minimum length of 36 and a maximum length of 40.':
      return 'The password reset token must be between 36 and 40 characters';
    case 'The old_password field is required.':
      return 'The old password field is required.';
    case 'The field old_password must be a string with a minimum length of 8 and a maximum length of 64.':
      return 'The old password field must be between 8 and 64 characters.';
    case 'The new_password field is required.':
      return 'The new password field is required.';
    case 'The field new_password must be a string with a minimum length of 8 and a maximum length of 64.':
      return 'The new password field must be between 8 and 64 characters.';
    case 'The new_password_confirm field is required.':
      return 'The confirm new password field is required.';
    case 'The field new_password_confirm must be a string with a minimum length of 8 and a maximum length of 64.':
      return 'The confirm new password field must be between 8 and 64 characters.'
    case 'The password_confirm field is required.':
      return '';
    case 'The field password_confirm must be a string with a minimum length of 4 and a maximum length of 64.':
      return '';
    default:
      return msg;
  }
};
const ErrorMessage = React.memo(({ message }) => {
  let msgs = message?.map(text => convertMsg2Redable(text))
                     .filter(item => item.length > 0 && !item.includes('password_confirm'))

  return (
    <Wrapper>
      {msgs?.map(msg => (
        <Error>
          <Icon className="material-icons">error_outline</Icon>
          <Message>{msg || "This is the default error message. It's not very helpful."}</Message>
        </Error>
      ))}
    </Wrapper>
  );
});

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
