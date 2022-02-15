import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import defaultTheme from '../../../style/themes';
import { Standard } from '../../layouts';
import MySupportSection from '../../presentation/support/desktop/MySupportSection';
import SupportArticlesSection from '../../presentation/support/desktop/SupportArticlesSection';
import SupportRequestsSection from '../../presentation/support/desktop/SupportRequestsSection';
import ActionButtonsContainer from '../../containers/shared/desktop/ActionButtonsContainer';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import constants from '@evry-member-app/shared/constants';
import paginate from '../../../utils/pagination';
import withStoreData from '../../containers/base/withStoreData';
import { Helmet } from 'react-helmet-async';
import LoadingSpinnerScreen from '../../presentation/shared/Loader/LoadingSpinnerScreen';

const {
  fetchCareGuideInfo,
  fetchEvryContactInfo,
  fetchCases,
  showModal,
  fetchSupportArticles
} = actions;
const {
  getCareGuideInfo,
  getCases,
  getCasesDataFrame,
  getEvryContactInfo,
  getToken,
  getSupportArticles,
  getFAQs,
  getCasesObject
} = selectors;

const {
  SUBMITTED,
  CREATED,
  ON_HOLD,
  ESCALATED,
  CLOSED,
  REQUEST_INFORMATION,
  SCHEDULE_APPOINTMENT,
  SCHEDULE_PHONE_CALL,
  SEND_A_MESSAGE_TO_CARE_COORDINATOR,
  PROVIDER_FEEDBACK,
  CLAIM_FEEDBACK,
  ID_CARD_REQUEST,
  ADDRESS_UPDATE,
  PHONE_NUMBER_UPDATE,
  PCP_UPDATE,
  APPOINTED_REPRESENTATIVE_UPDATE,
  COB_UPDATE
} = constants;

const typesToContent = {
  [REQUEST_INFORMATION]: 'Request Information',
  [SCHEDULE_PHONE_CALL]: 'Schedule Phone Call',
  [SCHEDULE_APPOINTMENT]: 'Schedule Appointment'
};

const statusesToMachineNames = {
  [SUBMITTED]: 'submitted',
  [CREATED]: 'created',
  [ON_HOLD]: 'on-hold',
  [ESCALATED]: 'escalated',
  [CLOSED]: 'closed'
};

const caseTypeToMachineNames = {
  [1]: 'Request Information',
  [2]: 'Schedule Appointment',
  [3]: 'Schedule Phone Call',
  [4]: 'Send a Message to Care Coordinator',
  [5]: 'Provider Feedback',
  [6]: 'Claim Feedback',
  [7]: 'ID Card Request via Mail',
  [8]: 'Address Update',
  [9]: 'Phone Number Update',
  [10]: 'PCP Update',
  [11]: 'Appointed Representative Update',
  [12]: 'COB Update'
};

// DESKTOP: Support View
// TODO: API needs to supply articles / faqs from help center
// TODO: Wire up link to help center
// TODO: Wire up link to Concierge Care Article if available
// TODO: Get Support Requests list from API
// WAITING: Currently, Support broadly needs API endpoints to service this app section

const { LayoutWrapper } = defaultTheme.components;

const InnerWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 24px;
`;

const Support = () => {
  const MySupportSectionWithData = withStoreData(
    MySupportSection,
    state => ({
      token: getToken(state),
      careGuide: getCareGuideInfo(state),
      evryContactInfo: getEvryContactInfo(state)
    }),
    dispatch => ({
      fetchCareGuideInfo: token => dispatch(fetchCareGuideInfo(token)),
      fetchEvryContactInfo: token => dispatch(fetchEvryContactInfo(token)),
      showModal: modal => dispatch(showModal(modal))
    }),
    (
      { token, ...stateProps },
      { fetchCareGuideInfo, fetchEvryContactInfo, showModal },
      ownProps
    ) => ({
      fetch: {
        fetchCareGuideInfo: () => fetchCareGuideInfo(token),
        fetchEvryContactInfo: () => fetchEvryContactInfo(token)
      },
      showModal: modal => showModal(modal),
      shouldFetch: {
        fetchEvryContactInfo: isEmpty(stateProps.evryContactInfo),
        fetchCareGuideInfo: isEmpty(stateProps.careGuide)
      },
      ...stateProps,
      ...ownProps
    })
  );

  const SupportRequestsSectionWithData = withStoreData(
    SupportRequestsSection,
    state => {
      return {
        requests: getCases(state),
        requestsDataFrame: getCasesDataFrame(state),
        token: getToken(state),
        caseObject: getCasesObject(state)
      };
    },
    dispatch => ({
      fetchCases: ({
        page,
        query,
        recordsPerPage,
        statuses = [SUBMITTED, CREATED, ON_HOLD, ESCALATED],
        token
      }) =>
        dispatch(
          fetchCases({
            page,
            query,
            statuses,
            recordsPerPage,
            token
          })
        ),
      showModal: modal => dispatch(showModal(modal))
    }),
    ({ requests, requestsDataFrame, token }, { fetchCases, showModal }, ownProps) => {
      const fetch = args => fetchCases({ token, ...args });

      return {
        fetch,
        showCompleted: showCompleted => {
          if (showCompleted) {
            fetch({
              statuses: [CLOSED]
            });
          } else {
            fetch();
          }
        },
        paginator: paginate(requestsDataFrame, fetch),
        requests: requests.map(request => ({
          status: statusesToMachineNames[request.case_status],
          date: moment(request.created_date_utc).format('MM/DD/YYYY'),
          title: typesToContent[request.case_type],
          requestNumber: request.case_id,
          caseType: caseTypeToMachineNames[request.case_type]
        })),
        showModal: modal => showModal(modal),
        shouldFetch: isEmpty(requestsDataFrame),
        requestsDataFrame: requestsDataFrame,
        ...ownProps
      };
    }
  );

  const SupportArticlesSectionWithData = withStoreData(
    SupportArticlesSection,
    state => ({
      faqs: getFAQs(state),
      supportArticles: getSupportArticles(state)
    }),
    dispatch => ({
      fetchSupportArticles: ({
        token,
        page,
        recordsPerPage,
        searchString,
        orderBy,
        orderByDesc,
        supportArticleType
      }) =>
        dispatch(
          fetchSupportArticles({
            token,
            page,
            recordsPerPage,
            searchString,
            orderBy,
            orderByDesc,
            supportArticleType
          })
        )
    }),
    ({ token, ...stateProps }, { fetchSupportArticles }, ownProps) => ({
      fetch: {
        fetchSupportArticles: () => {
          fetchSupportArticles({
            token,
            page: 1,
            recordsPerPage: 3,
            searchString: '',
            orderBy: 'created_date',
            orderByDesc: true,
            supportArticleType: 1
          });
        }
      },
      shouldFetch: { fetchSupportArticles: isEmpty(stateProps.supportArticles) }
    })
  );

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <LayoutWrapper>
        <ActionButtonsContainer type="headerButtons" view="support" />
        <MySupportSectionWithData />
        {/* <SupportArticlesSection /> */}
        <SupportRequestsSectionWithData />
        <InnerWrapper />
      </LayoutWrapper>
    </>
  );
};

const reflection = {
  component: Support,
  layout: Standard,
  layoutProps: {
    title: 'Customer Support'
  },
  route: '/support',
  forAuthorized: true
};

export default Support;

export { reflection };
