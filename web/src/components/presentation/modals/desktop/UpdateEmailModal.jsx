import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';

import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';
import ErrorMessage from '../../shared/desktop/ErrorMessage';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';

// MODAL - Update Your Email

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

class UpdateYourEmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: '',
      password: '',
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

    apis.emailChange({
      token: this.props.token,
      email_address: this.state.email_address,
      password: this.state.password
    }).then(this.props.hideModal).catch(this.handleErrors);
  }

  render() {
    return (
      <>
        <Scrim onClick={this.props.hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Update your email</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>New Email</p>
            <Input
              name="email_address"
              type="text"
              placeholder="Enter an email address"
              value={this.state.email_address}
              onChange={this.handleChange}
            />
            <p>Confirm Password</p>
            <Input
              name="password"
              type="password"
              placeholder="Enter your current password"
              value={this.state.password}
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

UpdateYourEmailModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateYourEmailModal);