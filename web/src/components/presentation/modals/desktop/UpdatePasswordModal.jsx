import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';

import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';
import actions from '@evry-member-app/shared/store/actions';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';
import ErrorMessage from '../../shared/desktop/ErrorMessage';

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

class UpdateYourPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errors: []
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  handleChangeResponse = response => {
    if (response.data.result) {
      this.props.hideModal();
    } else {
      this.setState({ errors: response.data.error });
    }
  }

  submitModal = e => {
    apis.passwordChange({
      token: this.props.token,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.confirmPassword
    }).then(handleChangeResponse);
  }

  render() {
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Update your password.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Input
              name="oldPassword"
              type="password"
              placeholder="Enter your current password."
              value={oldPassword}
              onChange={this.handlers.handleChange}
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="Enter a new password."
              value={newPassword}
              onChange={this.handlers.handleChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password."
              value={confirmPassword}
              onChange={this.handlers.handleChange}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" onClick={this.submitModal} />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
          {this.state?.errors?.length > 0 && <ErrorMessage message={this.state.errors} />}
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