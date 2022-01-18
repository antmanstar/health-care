import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../style/themes';
import { Mobile } from '../../layouts';
import SearchAndFilterBar from '../../presentation/shared/desktop/SearchAndFilterBar';
import MobileClaimsList from '../../presentation/claims/mobile/MobileClaimsList';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import paginate from '../../../utils/pagination';
import withStoreData from '../../containers/base/withStoreData';

const { fetchClaimsList } = actions;
const { getClaimsList, getToken, getClaimsListDataFrame } = selectors;

// MOBILE: Claims History View
// TODO: Wire up Search / Filters
// TODO: Tapping a claim should take you to ClaimsDetails view with appropriate claim info

const { MobileContentWrapper, TrimmedHeader } = defaultTheme.components;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const ColoredTrimmedHeader = styled(TrimmedHeader)`
  margin-bottom: -40px;
  background: ${props => props.theme.gradients.main};
`;

const Spacer = styled.div`
  padding-top: 128px;
`;

const Claims = ({ claimsList, paginator }) => {
  
  const search = ({ query, dateFrom, dateTo }) => {
    const trimmedQuery = query.trim();
    fetchClaimsList({ page: 1, query: trimmedQuery, recordsPerPage: paginator.recordsPerPage, dateFrom, dateTo });
  }

  return (
    <>
      <FixedHeader>
        <ColoredTrimmedHeader />
        <MobileContentWrapper>
          <SearchAndFilterBar placeholder="Search Claims" search={search} bigShadow dateButton filterButton />
        </MobileContentWrapper>
      </FixedHeader>
      <Spacer />
      <MobileContentWrapper>
        <MobileClaimsList claims={claimsList} />
      </MobileContentWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  claimsList: getClaimsList(state),
  claimsListDataFrame: getClaimsListDataFrame(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchClaimsList: args => {
    dispatch(fetchClaimsList(args));
  }
});

const mergeProps = (
  { token, claimsListDataFrame, ...stateProps },
  { fetchClaimsList },
  ownProps
) => {
  const fetch = (args = {}) => {
    fetchClaimsList({ token, ...args });
  };

  return {
    fetch,
    paginator: claimsListDataFrame && paginate(claimsListDataFrame, fetch),
    shouldFetch: !stateProps.claimsList,
    ...stateProps,
    ...ownProps
  };
};

Claims.propTypes = {
  claimsList: PropTypes.arrayOf(PropTypes.shape({}))
};

Claims.defaultProps = {
  claimsList: null
};

const ConnectedClaims = withStoreData(Claims, mapStateToProps, mapDispatchToProps, mergeProps);

const reflection = {
  component: ConnectedClaims,
  layout: Mobile,
  layoutProps: {
    titleWrapperClass: 'none',
    navProps: {
      left: 'back',
      title: 'Claims',
      permanentTitle: true,
      noBg: true
    }
  },
  route: '/claims',
  forAuthorized: true
};

export default ConnectedClaims;

export { reflection };
