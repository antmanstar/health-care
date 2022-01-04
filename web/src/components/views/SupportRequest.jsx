import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import { Mobile } from '../layouts';
import MobileButton from '../presentation/shared/mobile/MobileButton';
import ContactSupportDetails from '../presentation/shared/mobile/ContactSupportDetails';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import withStoreData from '../containers/base/withStoreData';

const { fetchEvryContactInfo } = actions;
const { getSupportPhoneNumber, getToken } = selectors;

// MOBILE: Individual Support Request View
// TODO: Bring info from prior view (Support Requests History / List; PREREQUISITE: Jong's endpoints)
// TODO: Wire Up Actions (PREREQUISITE: Jong's endpoints)

const { MobileContentWrapper, MobileListTitle, TrimmedHeader } = defaultTheme.components;

const ContentWrapper = styled(MobileContentWrapper)`
  z-index: 1;
`;

const ColoredTrimmedHeader = styled(TrimmedHeader)`
  margin-bottom: -40px;
  background: ${props => props.theme.colors.roles.danger};

  &.completed {
    background: ${props => props.theme.colors.roles.success};
  }
  &.pending {
    background: ${props => props.theme.colors.roles.pending};
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  z-index: 0;
`;

class SupportRequest extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
  }

  render() {
    const { request } = this.state;
    const { phoneNumber } = this.props;
    return (
      <>
        <FlexColumn>
          <ColoredTrimmedHeader className={request.status} />
          <ContentWrapper>
            <ContactSupportDetails
              title={request.title}
              number={request.requestNumber}
              details={
                request.status === 'action required'
                  ? 'Please contact us below.'
                  : 'No action is required. If you have questions or concerns, please contact us below.'
              }
              dateSent={request.dateSent}
              status={request.status}
            />
            <MobileListTitle>Contact Customer Support</MobileListTitle>
            <MobileButton icon="message" text="Send a Message" />
            <MobileButton icon="access_time" text="Schedule a Phone Call" />
            <MobileButton icon="phone" text={phoneNumber && `1-${phoneNumber}`} arrow={false} />
          </ContentWrapper>
        </FlexColumn>
      </>
    );
  }
}

SupportRequest.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({})
  }).isRequired,
  phoneNumber: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: getToken(state),
  phoneNumber: getSupportPhoneNumber(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEvryContactInfo: token => {
    dispatch(fetchEvryContactInfo(token));
  }
});

const mergeProps = ({ token, ...stateProps }, { fetchEvryContactInfo }, ownProps) => ({
  fetch: () => fetchEvryContactInfo(token),
  shouldFetch: !stateProps.phoneNumber,
  ...stateProps,
  ...ownProps
});

const ConnectedSupportRequest = withStoreData(
  SupportRequest,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
);

const reflection = {
  component: ConnectedSupportRequest,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Support Request',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/support-request',
  forAuthorized: true
};

export default ConnectedSupportRequest;

export { reflection };
