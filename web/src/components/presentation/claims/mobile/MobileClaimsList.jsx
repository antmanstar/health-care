import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import withStoreData from '../../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import ListClaim from './ListClaim';

const { fetchClaimDetail } = actions;
const { getToken, getClaimDetail } = selectors;

const ClaimWithData = withStoreData(
  ListClaim,
  (state, { claimNumber }) => ({
    token: getToken(state),
    claimDetail: getClaimDetail(state, claimNumber)
  }),
  (dispatch, { claimNumber }) => ({
    fetchClaimDetail: token => dispatch(fetchClaimDetail(token, claimNumber))
  }),
  ({ token, ...stateProps }, { fetchClaimDetail }, ownProps) => ({
    fetch: () => fetchClaimDetail(token),
    shouldFetch: isEmpty(stateProps.claimDetail),
    ...stateProps,
    ...ownProps
  })
);

// MOBILE - Claims List

const MobileClaimsList = React.memo(({ claims }) => (
  <>
    {claims &&
      claims.map &&
      claims.map(
        ({
          claim_number: claimNumber,
          claim_status: claimStatus,
          dos,
          provider_name: providerName,
          provider_addresses: providerAddresses
        }) => {
          const dateOfService = new Date(dos);
          const [primaryProviderAddress] = providerAddresses;

          return (
            <ClaimWithData
              dateOfService={`${dateOfService.getMonth()}/${dateOfService.getDate()}/${dateOfService.getFullYear()}`}
              claimNumber={claimNumber}
              status={claimStatus}
              provider={{
                name: `${providerName.prefix || ''} ${providerName.first_name ||
                  ''} ${providerName.middle_name || ''} ${providerName.last_name || ''}`,
                practice: '',
                address: primaryProviderAddress
                  ? String(primaryProviderAddress)
                  : 'No address data found'
              }}
            />
          );
        }
      )}
  </>
));

MobileClaimsList.propTypes = {
  claims: PropTypes.arrayOf(PropTypes.shape({}))
};

MobileClaimsList.defaultProps = {
  claims: []
};

export default MobileClaimsList;
