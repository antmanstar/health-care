import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import ContactPreference from '../../shared/desktop/ContactPreference';
import SmallButton from '../../shared/desktop/SmallButton';
import { connect } from 'react-redux';
import selectors from '@evry-member-app/shared/store/selectors';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';
import ErrorMessage from '../../shared/desktop/ErrorMessage';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';

import actions from '@evry-member-app/shared/store/actions';
const { setModalData, showModal } = actions;

// MODAL - Update Your Contact Preferences
// TODO: Need intial state from contact pref data .. then need to send new state back

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

class UpdateContactPreferences extends Component {
  constructor(props) {
    super(props);

    const prefs = props.accountInfo.contact_preferences;

    this.state = {
      paperless: prefs.paperless,
      email: prefs.receive_emails,
      text: prefs.receive_text_messages,
      call: prefs.receive_phone_calls,
      showLoader: false,
      errors: []
    };
  }

  generateClickHandler = key => () => {
    this.setState(prevState => ({
      [key]: !prevState[key]
    }));
  };

  handleErrors = response => {
    this.setState({ showLoader: false, errors: response?.response?.data?.messages });
  }

  createSuccessModal = () => {
    this.setState({ showLoader: false });

    this.props.setModalData({
      type: 'SUCCESS',
      title: 'Success!',
      message: "Your contact preferences have been changed!"
    });
    this.props.showModal('SUBMISSION_RESPONSE');
  }

  submitChanges = e => {
    e.preventDefault();
    
    this.setState({ showLoader: true });

    apis.updateContactPreferences({
      token: this.props.token,
      paperless: this.state.paperless,
      receive_emails: this.state.email,
      receive_text_messages: this.state.text,
      receive_phone_calls: this.state.call
    }).then(this.createSuccessModal).catch(this.handleErrors);
  }

  render() {
    const { paperless, email, text, call } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Update your contact preferences.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <ContactPreference
              text="Paperless"
              toggledOn={paperless}
              handleClick={this.generateClickHandler('paperless')}
            />
            <ContactPreference
              text="Receive Emails"
              toggledOn={email}
              handleClick={this.generateClickHandler('email')}
            />
            <ContactPreference
              text="Receive Text Messages"
              toggledOn={text}
              handleClick={this.generateClickHandler('text')}
            />
            <ContactPreference
              text="Receive Phone Calls"
              toggledOn={call}
              handleClick={this.generateClickHandler('call')}
            />
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" onClick={this.submitChanges} />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
          {this.state?.errors?.length > 0 && <ErrorMessage message={this.state.errors} />}
          {this.state.showLoader && <LoadingSpinnerScreen />}
        </ModalWrapper>
      </>
    );
  }
}

UpdateContactPreferences.propTypes = {
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactPreferences);
