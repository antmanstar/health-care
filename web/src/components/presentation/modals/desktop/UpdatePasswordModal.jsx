import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';

import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';
import ErrorMessage from '../../shared/desktop/ErrorMessage';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';
import styled from 'styled-components';

// MODAL - Update Your Password

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  Input,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

const Label = styled.div`
  margin-bottom: 5px;
`;

const NewPWLabel = styled.div`
  margin-top: 15px;
  margin-bottom: 5px; 
`;

class UpdateYourPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errors: [],
      showLoader: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleErrors = response => {
    this.setState({ showLoader: false, errors: response.response.data.messages });
  }

  submitModal = e => {
    this.setState({ showLoader: true });

    apis.passwordChange({
      token: this.props.token,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.confirmPassword
    }).then(this.props.hideModal).catch(this.handleErrors);
  }

  render() {
    return (
      <>
        <Scrim onClick={this.props.hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Update your password.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Label>Current Password</Label>
            <Input
              name="oldPassword"
              type="password"
              placeholder="Enter your current password."
              value={this.state.oldPassword}
              onChange={this.handleChange}
            />
            <NewPWLabel>New Password</NewPWLabel>
            <Input
              name="newPassword"
              type="password"
              placeholder="Enter a new password."
              value={this.state.newPassword}
              onChange={this.handleChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password."
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" onClick={this.submitModal} />
            <SmallButton text="Cancel" negative onClick={this.props.hideModal} />
          </ModalButtonsRight>
          {this.state?.errors?.length > 0 && <ErrorMessage message={this.state.errors} />}
          {this.state.showLoader && <LoadingSpinnerScreen />}
        </ModalWrapper>
      </>
    );
  }
}

UpdateYourPasswordModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  // handleSubmit: payload => {
  //   dispatch(actions.updateContactPreferences(payload));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateYourPasswordModal);