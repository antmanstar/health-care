import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import ProviderProfile from '../../providers/desktop/ProviderProfile';
import FeedbackSubmission from '../../providers/desktop/FeedbackSubmission';
import SmallButton from '../../shared/desktop/SmallButton';
import { connect } from 'react-redux';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
// MODAL - Submit Provider Feedback

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

const { submitProviderFeedbackCase } = actions;
const { getToken } = selectors;

const SubmitProviderFeedbackModal = ({
  hideModal,
  modalData,
  token,
  submitProviderFeedbackCase,
  sentFeedback
}) => {
  const [message, setMessage] = useState();
  const [feedbackChoice, setFeedbackChoice] = useState(modalData.feedbackChoice);

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleClick = choice => {
    setFeedbackChoice(choice);
  };

  const handleSubmit = () => {
    submitProviderFeedbackCase({
      type: 5,
      metadata: [
        {
          name: 'provider_npi',
          value: modalData.provider.npiNumber,
          value_type: 11
        },
        {
          name: 'rate',
          value: feedbackChoice,
          value_type: 11
        },
        {
          name: 'comment',
          value: message,
          value_type: 11
        }
      ],
      token: token
    });
  };

  return (
    <>
      <Scrim onClick={hideModal} />
      <ModalWrapper className="narrow">
        <ModalHeader>
          <ModalTitle>Submit Provider Feedback.</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ProviderProfile
            name={modalData.provider.name}
            distance={modalData.provider.distance}
            practiceName={modalData.provider.practiceName}
            address={modalData.provider.address}
            phone={modalData.provider.phone}
            npiNumber={modalData.provider.npiNumber}
            network={modalData.provider.network}
            specialties={modalData.provider.specialties}
            languages={modalData.provider.languages}
            id={modalData.provider.id}
          />
          <FeedbackSubmission choice={feedbackChoice} type="provider" handleClick={handleClick} />
          <FormLabel>How could this provider be better?</FormLabel>
          <ModalTextArea
            name="message"
            type="text"
            placeholder="Type your message here."
            onChange={e => handleChange(e)}
            value={message}
          />
          {sentFeedback ? (
            <p style={{ color: 'green' }}>Your feedback has been sent successfully!</p>
          ) : (
            ''
          )}
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <SmallButton text="Submit Feedback" onClick={() => handleSubmit()} />
          <SmallButton text="Cancel" negative onClick={hideModal} />
        </ModalButtonsRight>
      </ModalWrapper>
    </>
  );
};

SubmitProviderFeedbackModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    feedbackChoice: PropTypes.string,
    provider: PropTypes.shape({})
  }).isRequired
};

const mapStateToProps = state => {
  return {
    sentFeedback: state?.user?.feedbackSended,
    token: getToken(state)
  };
};

const mapDispatchToProps = dispatch => ({
  submitProviderFeedbackCase: args => {
    dispatch(
      submitProviderFeedbackCase({
        ...args
      })
    );
  }
});

const ConnectedSubmitProviderFeedbackModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitProviderFeedbackModal);

export default ConnectedSubmitProviderFeedbackModal;
