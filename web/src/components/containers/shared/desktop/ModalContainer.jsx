import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import AppointARepresentativeModal from '../../../presentation/modals/desktop/AppointARepresentativeModal';
import ClaimsSupportModal from '../../../presentation/modals/desktop/ClaimsSupportModal';
import ContactCareGuideModal from '../../../presentation/modals/desktop/ContactCareGuideModal';
import MeetCareGuideModal from '../../../presentation/modals/desktop/MeetCareGuideModal';
import RequestInformationModal from '../../../presentation/modals/desktop/RequestInformationModal';
import RequestNewMembershipCardModal from '../../../presentation/modals/desktop/RequestNewMembershipCardModal';
import ScheduleAppointmentModal from '../../../presentation/modals/desktop/ScheduleAppointmentModal';
import SchedulePhoneCallModal from '../../../presentation/modals/desktop/SchedulePhoneCallModal';
import SendAMessageModal from '../../../presentation/modals/desktop/SendAMessageModal';
import SubmitNewSupportRequestModal from '../../../presentation/modals/desktop/SubmitNewSupportRequestModal';
import SubmitProviderFeedbackModal from '../../../presentation/modals/desktop/SubmitProviderFeedbackModal';
import SubmitClaimFeedbackModal from '../../../presentation/modals/desktop/SubmitClaimFeedbackModal';
import SupportRequestModal from '../../../presentation/modals/desktop/SupportRequestModal';
import UpdateCoordinationOfBenefitsModal from '../../../presentation/modals/desktop/UpdateCoordinationOfBenefitsModal';
import UpdatePasswordModal from '../../../presentation/modals/desktop/UpdatePasswordModal';
import UpdateEmailModal from '../../../presentation/modals/desktop/UpdateEmailModal';
import UpdatePersonalInformationModal from '../../../presentation/modals/desktop/UpdatePersonalInformationModal';
import UpdateSecurityQuestionsModal from '../../../presentation/modals/desktop/UpdateSecurityQuestionsModal';
import UploadDocumentModal from '../../../presentation/modals/desktop/UploadDocumentModal';
import SubmissionResponseModal from '../../../presentation/modals/desktop/SubmissionResponseModal';
import UpdateContactPreferences from '../../../presentation/modals/desktop/UpdateContactPreferences';
import RequestMailedCardModal from '../../../presentation/modals/desktop/RequestMailedCardModal';
import ConciergeCareModal from '../../../presentation/modals/desktop/ConciergeCareModal';
import Error500Modal from '../../../presentation/modals/desktop/Error500Modal';
import SubmitClaimFeedbackSuccess from '../../../presentation/modals/desktop/SubmitClaimFeedbackSuccess';
import withStoreData from '../../base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import constants from '@evry-member-app/shared/constants';
import selectors from '@evry-member-app/shared/store/selectors';

const {
  fetchAccountInfo,
  fetchCareGuideInfo,
  fetchMembershipSummary,
  findCases,
  clearSendingFeedback
} = actions;
const {
  foundCases,
  getAccountInfo,
  getAddress,
  getCareGuideInfo,
  getCurrentModal,
  getFamilyMembers,
  getFamilyMemberCOBSummary,
  getEmail,
  getMemberName,
  getModalData,
  getToken,
  isAuthenticated
} = selectors;

const { CONTACT_INFO_UPDATE, CREATED, ESCALATED, SUBMITTED } = constants;

const UpdatePersonalInformationModalWithData = withStoreData(
  UpdatePersonalInformationModal,
  state => ({
    address: getAddress(state),
    email: getEmail(state),
    foundCases: foundCases(state),
    name: getMemberName(state),
    authToken: getToken(state)
  }),
  dispatch => ({
    fetchAccountInfo: token => dispatch(fetchAccountInfo(token)),
    findCases: token =>
      dispatch(
        findCases({
          statuses: [CREATED, ESCALATED, SUBMITTED],
          token,
          types: [CONTACT_INFO_UPDATE]
        })
      ),
    clearSendingFeedback: () => dispatch(clearSendingFeedback())
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: {
      accountInfo: () => {
        dispatchProps.fetchAccountInfo(token);
      },
      findCases: () => {
        dispatchProps.findCases();
      }
    },
    shouldFetch: {
      accountInfo: !stateProps.address,
      findCases: true
    },
    ...stateProps,
    ...ownProps
  })
);

const ContactCareGuideModalWithData = withStoreData(
  ContactCareGuideModal,
  state => ({
    careGuide: getCareGuideInfo(state),
    name: getMemberName(state),
    token: getToken(state)
  }),
  dispatch => ({
    fetchCareGuideInfo: token => dispatch(fetchCareGuideInfo(token))
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: () => dispatchProps.fetchCareGuideInfo(token),
    shouldFetch: isEmpty(stateProps.careGuide),
    ...stateProps,
    ...ownProps
  })
);

const ScheduleAppointmentModalWithData = withStoreData(
  ScheduleAppointmentModal,
  state => ({
    dependents: getFamilyMembers(state),
    token: getToken(state)
  }),
  dispatch => ({
    fetchMembershipSummary: token => dispatch(fetchMembershipSummary(token))
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: () => dispatchProps.fetchMembershipSummary(token),
    shouldFetch: isEmpty(stateProps.dependents),
    ...stateProps,
    ...ownProps
  })
);

const UpdateCoordinationOfBenefitsModalWithData = withStoreData(
  UpdateCoordinationOfBenefitsModal,
  state => ({
    authToken: getToken(state),
    familyMembers: getFamilyMemberCOBSummary(state)
  })
);

const SubmitClaimFeedbackSuccessWithData = withStoreData(
  SubmitClaimFeedbackSuccess,
  state => state,
  dispatch => ({
    clearSendingFeedback: () => dispatch(clearSendingFeedback())
  })
);

const ModalContainer = props => {
  switch (props.currentModal) {
    case 'APPOINT_REPRESENTATIVE':
      return <AppointARepresentativeModal {...props} />;

    case 'CLAIMS_SUPPORT':
      return <ClaimsSupportModal {...props} />;

    case 'CONTACT_CARE_GUIDE':
      return <ContactCareGuideModalWithData {...props} />;

    case 'MEET_CARE_GUIDE':
      return <MeetCareGuideModal {...props} />;

    case 'REQUEST_INFORMATION':
      return <RequestInformationModal {...props} />;

    case 'REQUEST_NEW_MEMBERSHIP_CARD':
      return <RequestNewMembershipCardModal {...props} />;

    case 'SCHEDULE_APPOINTMENT':
      return <ScheduleAppointmentModalWithData {...props} />;

    case 'SCHEDULE_PHONE_CALL':
      return <SchedulePhoneCallModal {...props} />;

    case 'SEND_MESSAGE':
      return <SendAMessageModal {...props} />;

    case 'SUBMIT_NEW_SUPPORT_REQUEST':
      return <SubmitNewSupportRequestModal {...props} />;

    case 'SUBMIT_CLAIM_FEEDBACK':
      return <SubmitClaimFeedbackModal {...props} />;

    case 'SUBMIT_PROVIDER_FEEDBACK':
      return <SubmitProviderFeedbackModal {...props} />;

    case 'SUPPORT_REQUEST':
      return <SupportRequestModal {...props} />;

    case 'UPDATE_COORDINATION_OF_BENEFITS':
      return <UpdateCoordinationOfBenefitsModalWithData {...props} />;

    case 'UPDATE_CONTACT_PREFERENCES':
      return <UpdateContactPreferences {...props} />;

    case 'UPDATE_PASSWORD':
      return <UpdatePasswordModal {...props} />;
      
    case 'UPDATE_EMAIL':
      return <UpdateEmailModal {...props} />;

    case 'UPDATE_PERSONAL_INFORMATION':
      return <UpdatePersonalInformationModalWithData {...props} />;

    case 'UPDATE_SECURITY_QUESTIONS':
      return <UpdateSecurityQuestionsModal {...props} />;

    case 'UPLOAD_DOCUMENT':
      return <UploadDocumentModal {...props} />;

    case 'SUBMISSION_RESPONSE':
      return <SubmissionResponseModal {...props} />;

    case 'REQUEST_MAILED_CARD':
      return <RequestMailedCardModal {...props} />;

    case 'CONCIERGE_CARE':
      return <ConciergeCareModal {...props} />;

    case 'SUBMIT_CLAIM_FEEDBACK_SUCCESS':
      return <SubmitClaimFeedbackSuccess {...props} />;

    case 'ERROR_500':
      return <Error500Modal {...props} />;

    default:
      return null;
  }
};

ModalContainer.propTypes = {
  accountInfo: PropTypes.shape({}),
  isAuthenticated: PropTypes.bool,
  token: PropTypes.string
};

ModalContainer.defaultProps = {
  accountInfo: {},
  token: null
};

const mapStateToProps = state => ({
  accountInfo: getAccountInfo(state),
  currentModal: getCurrentModal(state),
  isAuthenticated: isAuthenticated(state),
  modalData: getModalData(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAccountInfo: token => {
    dispatch(fetchAccountInfo(token));
  },
  hideModal: () => {
    dispatch(actions.hideModal());
  }
});

const mergeProps = (
  { token, isAuthenticated, ...stateProps },
  { fetchAccountInfo, ...dispatchProps },
  ownProps
) => ({
  fetch: () => fetchAccountInfo(token),
  shouldFetch: isEmpty(stateProps.accountInfo) && isAuthenticated,
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

export default withStoreData(ModalContainer, mapStateToProps, mapDispatchToProps, mergeProps);
