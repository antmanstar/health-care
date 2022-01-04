import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import defaultTheme from '../../../style/themes';
import { Mobile } from '../../layouts';
import MobileCareGuideProfile from '../../presentation/support/mobile/MobileCareGuideProfile';
import MobileActionButton from '../../presentation/shared/mobile/MobileActionButton';
import MobileButton from '../../presentation/shared/mobile/MobileButton';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../../presentation/shared/Loader/Loader';
import withStoreData from '../../containers/base/withStoreData';

const { fetchCareGuideInfo, openNewSupportRequestModal } = actions;
const { getToken, getCareGuideInfo } = selectors;

// MOBILE: Customer Support View

const { MobileContentWrapper } = defaultTheme.components;

const ProfileWrapper = styled.div`
  margin-bottom: 16px;
  background: ${props => props.theme.colors.shades.white};

  p {
    padding: 0 16px;
    font-size: 14px;
  }
`;

const Background = styled.div`
  height: 112px;
  margin-bottom: -56px;
  background: ${props => props.theme.gradients.main};
  clip-path: polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 50% 100%, 50% 100%, 0 80%, 0 0);
  z-index: 0;
`;

const ButtonGroupWrapper = styled(MobileContentWrapper)`
  > *:first-child {
    margin-bottom: 16px;
  }
`;

const StyledLink = styled(RouterLink)`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const Support = ({ careGuide, openNewSupportRequestModal }) => (
  <>
    <ProfileWrapper>
      <Background />
      {!careGuide ? (
        <Loader />
      ) : (
        <MobileCareGuideProfile
          name={`${careGuide.first_name} ${careGuide.last_name}`}
          imgSrc="https://randomuser.me/api/portraits/women/58.jpg"
        />
      )}
      <p>
        Your personal care guide is here to take care of all your health insurance needs. Whether
        you have questions about your care plan, need to schedule an appointment, or just want to
        follow up on a claim, we are here to help.
      </p>
    </ProfileWrapper>
    <ButtonGroupWrapper>
      <MobileActionButton
        text={careGuide ? `Contact ${careGuide.first_name}` : 'Contact Care Guide'}
        type="action"
        onClick={() => openNewSupportRequestModal('CARE_GUIDE_START')}
      />

      <StyledLink to="/contact-evry">
        <MobileButton text="Evry's Contact Information" />
      </StyledLink>
      <StyledLink to="/support-requests">
        <MobileButton text="Support Requests" />
      </StyledLink>
      <MobileButton text="Help Center" />
    </ButtonGroupWrapper>
  </>
);

Support.propTypes = {
  careGuide: PropTypes.shape({}).isRequired,
  openNewSupportRequestModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  careGuide: getCareGuideInfo(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCareGuideInfo: token => {
    dispatch(fetchCareGuideInfo(token));
  },
  openNewSupportRequestModal: content => {
    dispatch(openNewSupportRequestModal(content));
  }
});

const mergeProps = (
  { token, ...stateProps },
  { fetchCareGuideInfo, ...dispatchProps },
  ownProps
) => ({
  fetch: () => fetchCareGuideInfo(token),
  shouldFetch: !stateProps.careGuide,
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

const ConnectedSupport = withStoreData(Support, mapStateToProps, mapDispatchToProps, mergeProps);

const reflection = {
  component: ConnectedSupport,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    footer: true,
    navProps: {
      left: 'back',
      right: 'menu',
      title: 'Customer Support',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/support',
  forAuthorized: true
};

export default ConnectedSupport;

export { reflection };
