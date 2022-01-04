import React, { Component } from 'react';
import styled from 'styled-components';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';

// MOBILE: Update Password
// TODO: Check old password

const { MobileContentWrapper, MobileFixedBottomButton, MobileInput } = defaultTheme.components;

const EditedMobileContentWrapper = styled(MobileContentWrapper)`
  padding-top: 64px;
`;

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      changesMade: false
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);

    this.setState({ changesMade: true });
  }

  render() {
    const { oldPassword, newPassword, confirmPassword, changesMade } = this.state;

    return (
      <>
        <EditedMobileContentWrapper>
          <MobileInput
            name="oldPassword"
            type="password"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={this.handlers.handleChange}
          />
          <MobileInput
            name="newPassword"
            type="password"
            placeholder="Enter a new password"
            value={newPassword}
            onChange={this.handlers.handleChange}
          />
          <MobileInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={this.handlers.handleChange}
          />
        </EditedMobileContentWrapper>
        {changesMade && (
          <MobileFixedBottomButton>
            <MobileActionButton type="action" text="Submit Change" />
          </MobileFixedBottomButton>
        )}
      </>
    );
  }
}

const reflection = {
  component: UpdatePassword,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Update Password',
      permanentTitle: true,
      permanentBg: true
    }
  },
  route: '/update-password',
  forAuthorized: true
};

export default UpdatePassword;

export { reflection };
