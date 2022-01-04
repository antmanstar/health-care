import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import CareGuideModalStart from './CareGuideModalStart';
import SupportRequestModalStart from './SupportRequestModalStart';
import RequestInformationContent from './RequestInformationContent';
import SendMessageContent from './SendMessageContent';
import SchedulePhoneCallContent from './SchedulePhoneCallContent';
import ScheduleAppointmentContent from './ScheduleAppointmentContent';
import withStoreData from '../../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { getToken, getDependents, getPhoneNumbers } = selectors;
const { fetchMembershipSummary, fetchAccountInfo } = actions;

// MOBILE: New Support Request Modal

const { MobileContentWrapper } = defaultTheme.components;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  top: 0;
  left: 0;
  position: fixed;
  background: linear-gradient(to bottom right, rgba(2, 38, 57, 0.98), rgba(0, 60, 92, 0.98));
  color: ${props => props.theme.colors.shades.white};
  min-height: 100vh;
  z-index: 1000;
  text-align: left;
`;

const ScheduleAppointmentContentWithData = withStoreData(
  ScheduleAppointmentContent,
  state => ({
    token: getToken(state),
    members: getDependents(state)
  }),
  dispatch => ({
    fetchMembershipSummary: token => dispatch(fetchMembershipSummary(token))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    fetch: () => dispatchProps.fetchMembershipSummary(stateProps.token),
    shouldFetch: isEmpty(stateProps.members),
    ...stateProps,
    ...ownProps
  })
);

const SchedulePhoneCallContentWithData = withStoreData(
  SchedulePhoneCallContent,
  state => ({
    phoneNumbers: getPhoneNumbers(state)
  }),
  dispatch => ({
    fetchAccountInfo: token => dispatch(fetchAccountInfo(token))
  }),
  ({ token, ...stateProps }, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchAccountInfo(token);
    },
    shouldFetch: isEmpty(stateProps.phoneNumbers),
    ...stateProps,
    ...ownProps
  })
);

class NewSupportRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content
    };

    this.handlers = {
      handleClose: this.handleClose.bind(this)
    };
  }

  updateContent = content => {
    this.setState({ content });
  };

  handleClose() {
    const { closeNewSupportRequestModal } = this.props;
    closeNewSupportRequestModal();
  }

  renderRequestContent = content => {
    const { phoneNumber, careGuide } = this.props;

    switch (content) {
      case 'CARE_GUIDE_START':
        return (
          <CareGuideModalStart
            careGuide={careGuide}
            updateContent={this.updateContent}
            handleClose={this.handlers.handleClose}
          />
        );
      case 'STANDARD_SUPPORT_REQUEST_START':
        return (
          <SupportRequestModalStart
            phoneNumber={phoneNumber}
            updateContent={this.updateContent}
            handleClose={this.handlers.handleClose}
          />
        );
      case 'REQUEST_INFORMATION':
        return <RequestInformationContent handleClose={this.handlers.handleClose} />;
      case 'SEND_A_MESSAGE':
        return <SendMessageContent handleClose={this.handlers.handleClose} />;
      case 'SCHEDULE_PHONE_CALL':
        return <SchedulePhoneCallContentWithData handleClose={this.handlers.handleClose} />;
      case 'SCHEDULE_APPOINTMENT':
        return <ScheduleAppointmentContentWithData handleClose={this.handlers.handleClose} />;
      default:
        return null;
    }
  };

  render() {
    const { content } = this.state;

    return (
      <Wrapper>
        <MobileContentWrapper>{this.renderRequestContent(content)}</MobileContentWrapper>
      </Wrapper>
    );
  }
}

NewSupportRequest.propTypes = {
  content: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  careGuide: PropTypes.shape({}).isRequired,
  closeNewSupportRequestModal: PropTypes.func.isRequired
};

NewSupportRequest.defaultProps = {
  content: null
};

export default NewSupportRequest;
