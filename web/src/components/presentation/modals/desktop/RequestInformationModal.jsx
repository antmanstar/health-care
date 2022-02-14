import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import constants from '@evry-member-app/shared/constants';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';
// MODAL - Request Information

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

const {
  requestInformationReset,
  completeRequestInformationCase,
  createRequestInformationCase,
  setModalData,
  showModal,
  fetchCases
} = actions;

const { getToken, getRequestInformationCase } = selectors;

const { SUBMITTED, CREATED, ON_HOLD, ESCALATED } = constants;

const FormError = styled.div`
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

const StyledOption = styled.option`
  width: 100%;
  overflow-x: auto;
  `;

const StyledModalWrapper = styled(ModalWrapper)`
  @media ${defaultTheme.device.tablet}{
    max-width: 1000px;
    width: 850px;
  }
`;

class RequestInformationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      errorMesages: null,
      isSubmitting: false
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { type, message } = event.target.elements;

    let errors = [];
    if (type.value.trim().length === 0) {
      errors.push('*You must select a type of information.');
    }
    if (message.value.trim().length === 0) {
      errors.push('*Message cannot be blank.');
    }

    if (errors.length > 0) {
      this.setState({ errorMesages: errors });
      return;
    }
    this.setState({ isSubmitting: true });
    this.props.createCase(type.value, message.value, this.props.token);
  }

  componentDidMount() {
    this.props.resetCase();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.requestInformationCase &&
      prevProps.requestInformationCase.status === null &&
      this.props.requestInformationCase.status === 'OPEN'
    ) {
      this.props.completeCase(this.props.requestInformationCase.id, this.props.token);
    } else if (
      prevProps.requestInformationCase &&
      prevProps.requestInformationCase.status === 'OPEN' &&
      this.props.requestInformationCase.status === 'COMPLETE'
    ) {
      this.setState({ isSubmitting: false });
      this.props.fetchCases(this.props.token);
      this.props.setModalData({
        type: 'SUCCESS',
        title: 'Submitted!',
        message: "Great! We'll get to work on that and send you a confirmation once complete."
      });
      this.props.showModal('SUBMISSION_RESPONSE');
    } else if (
      prevProps.requestInformationCase &&
      prevProps.requestInformationCase.status === 'OPEN' &&
      this.props.requestInformationCase.status.includes('ERROR')
    ) {
      this.setState({ isSubmitting: false });
      this.props.fetchCases(this.props.token);
      this.props.setModalData({
        type: 'ERROR',
        title: 'Error',
        message: 'Something went wrong. Please try again or give us a call!'
      });
      this.props.showModal('SUBMISSION_RESPONSE');
    }
  }

  render() {
    const { type, message, isSubmitting } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <StyledModalWrapper>
          <ModalHeader>
            <ModalTitle>Request Information.</ModalTitle>
          </ModalHeader>
          <form onSubmit={this.handlers.handleSubmit}>
            <ModalBody>
              <Select
                name="type"
                placeholder="Information Type"
                value={type}
                onChange={this.handlers.handleChange}
              >
                <option>
                  I need assistance checking if my doctor is in-network or finding a new doctor.
                </option>
                <option>I want to request a doctor is added to the network.</option>
                <option>I have a question about a current or previous claim.</option>
                <option>I’d like help submitting a prior authorization request.</option>
                <option>
                  I’d like to check the status of an already submitted prior authorization request.
                </option>
                <option>I have a question about whether something is a covered benefit.</option>
                <option>I have a question about a copay, coinsurance, or my deductible.</option>
                <option>I need help with Coordination of Benefits.</option>
                <option>I’d like to update information I submitted during enrollment.</option>
                <option>
                  I have a question about my Evry Care Plan or a specific wellness program.
                </option>
                <option>I’m experiencing a problem with my member portal or mobile app.</option>
                <option>
                  I’d like to receive a new copy of the member handbook, my member ID card, or the
                  provider directory.
                </option>
                <option>I’d like to see if a drug is covered or check the price of a drug.</option>
                <option>I need help with my Evry Reward Card</option>
                <option>I’m encountering problems with the telehealth service.</option>
                <option>Other (my issue is not listed).</option>
              </Select>
              <ModalTextArea
                name="message"
                type="text"
                placeholder="Type a message here."
                value={message}
                onChange={this.handlers.handleChange}
              />
              {this.state.errorMesages &&
                this.state.errorMesages.map(message => <FormError>{message}</FormError>)}
            </ModalBody>
            <ModalSectionDivider />
            <ModalButtonsRight>
              <SmallButton type="submit" text="Submit Request" disabled={isSubmitting} />
              <SmallButton text="Cancel" negative onClick={hideModal} disabled={isSubmitting} />
            </ModalButtonsRight>
          </form>
          {isSubmitting && <LoadingSpinnerScreen />}
        </StyledModalWrapper>
      </>
    );
  }
}

RequestInformationModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    token: getToken(state),
    requestInformationCase: getRequestInformationCase(state)
  };
};

const mapDispatchToProps = dispatch => ({
  createCase: (informationType, message, token) => {
    dispatch(createRequestInformationCase({ informationType, message, token }));
  },
  resetCase: () => {
    dispatch(requestInformationReset());
  },
  completeCase: (caseID, token) => {
    dispatch(completeRequestInformationCase({ caseID, token }));
  },
  setModalData: modalData => {
    dispatch(setModalData(modalData));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  },
  fetchCases: token => {
    dispatch(
      fetchCases({
        direction: undefined,
        orderBy: undefined,
        statuses: [SUBMITTED, CREATED, ON_HOLD, ESCALATED],
        token
      })
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestInformationModal);
