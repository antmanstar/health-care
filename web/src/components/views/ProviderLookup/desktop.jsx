import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import defaultTheme from '../../../style/themes';
import { Standard } from '../../layouts';
import ProviderListItem from '../../presentation/providers/desktop/ProviderListItem';
import ProviderLookupSelectedItem from '../../presentation/providers/desktop/ProviderLookupSelectedItem';
import { Helmet } from 'react-helmet-async';
import Pagination from '../../presentation/shared/desktop/Pagination';
import paginate from '../../../utils/pagination';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import ProviderSearchBar from '../../presentation/providers/desktop/ProviderSearchBar';
import SearchingProviders from '../../presentation/providers/desktop/SearchingProviders';

// "Provider Lookup" View

const { LayoutWrapper } = defaultTheme.components;

const { providerSearch, geoCoder, fetchAccountInfo } = actions;
const {
  getToken,
  getProviderSearchData,
  getAddress,
  getLocationData,
  getProviderSearchQuery
} = selectors;

const ProviderLookupResults = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
`;

const PaginationWrapper = styled.div`
  @media screen and (max-width: 600px) {
    margin-right: 0px;
  }
  margin-right: 10px;
  flex: 50%;
`;

const ProviderLookup = ({
  fetchProviders,
  providerSearchData,
  paginator,
  address,
  fetchAccountInfo,
  fetchGeoLocation,
  locationData,
  isLoadingProviders,
  isLoadingAddress
}) => {
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState();
  const [hoveredPinId, setHoveredPinId] = useState();
  const [organizedData, setOrganizedData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(null);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  useEffect(() => {
    !address.isEmpty() &&
      fetchGeoLocation({
        address1: convertAddress(address),
        city: address.city,
        state: address.state,
        zip: address.zip
      });
  }, [address.isEmpty()]);

  useEffect(() => {
    let baseRequest = {
      location: {
        latitude: locationData?.latitude,
        longitude: locationData?.longitude
      },
      bounds: {
        south_west: {},
        north_east: {}
      },
      searchWithinBound: false
    };
    locationData !== null && !locationData?.filter && fetchProviders({ ...baseRequest });
  }, [locationData]);

  useEffect(() => {
    let temp = [];
    providerSearchData?.data?.map(practice => {
      temp.push({
        name: cleanString(
          `${practice.prefix} ${practice.first_name} ${practice.middle_name} ${practice.last_name}${
            practice.suffix !== null ? `, ${practice.suffix}` : ''
          }`
        ),
        distance: cleanString(`${practice.distance.toFixed(2)}`),
        practiceName: cleanString(`${practice.group_name}`),
        address: cleanString(
          `${practice.address1} ${practice.city} ${practice.state} ${practice.zip}`
        ),
        phone: cleanString(`${practice.phone_number}`),
        npiNumber: cleanString(`${practice.npi}`),
        specialties: practice.specialties.map(speciality => speciality.value),
        location: { lat: practice.latitude, lng: practice.longitude }
      });
    });
    setOrganizedData(temp);
  }, [providerSearchData]);

  const checkLoadingStatus = () => {
    if (isLoadingAddress === null) return 'isLoading';
    else if (
      isLoadingAddress ||
      isLoadingProviders ||
      (isLoadingProviders && organizedData.length === 0)
    )
      return 'isLoading';
    else if (!isLoadingAddress && !isLoadingProviders && organizedData.length === 0)
      return 'noResults';
    else return 'foundResults';
  };

  const renderProviderList = () => {
    if (checkLoadingStatus() === 'isLoading') return <SearchingProviders loading={true} />;
    else if (checkLoadingStatus() === 'noResults') return <SearchingProviders noResults={true} />;
    else if (checkLoadingStatus() === 'foundResults')
      return organizedData.map((practiceDetails, i) => {
        return (
          <ProviderListItem
            id={i}
            setHoveredPinId={setHoveredPinId}
            hoveredCardId={hoveredCardId}
            onClick={() => setSelectedProvider(i)}
            {...practiceDetails}
          />
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <LayoutWrapper>
        <ProviderLookupResults>
          <PaginationWrapper>
            {renderProviderList()}
            {console.log(paginator)}
            {paginator?.currentPage && <Pagination paginator={paginator} />}
          </PaginationWrapper>
          <ProviderLookupSelectedItem
            id={selectedProvider}
            hoveredPinId={hoveredPinId}
            setHoveredCardId={setHoveredCardId}
            providerData={organizedData}
            loadingStatus={checkLoadingStatus()}
            {...organizedData[selectedProvider]}
          />
        </ProviderLookupResults>
      </LayoutWrapper>
    </>
  );
};

const convertAddress = address =>
  `${address?.address1} ${address?.address2}`
    .replace('null', '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, ' ');

const cleanString = s =>
  s
    .replaceAll('null', '')
    .replaceAll(/\s+/g, ' ')
    .trim();

ProviderLookup.propTypes = {
  fetchProviders: PropTypes.func.isRequired,
  paginator: PropTypes.shape({})
};

ProviderLookup.defaultProps = {
  providerSearchData: null,
  paginator: null,
  locationData: null,
  isLoadingAddress: null,
  isLoadingProviders: null
};

const mapStateToProps = state => ({
  token: getToken(state),
  address: getAddress(state),
  locationData: getLocationData(state),
  providerSearchData: getProviderSearchData(state),
  providerSearchQuery: getProviderSearchQuery(state),
  isLoadingAddress: state?.app?.providerSearch?.isLoadingAddress,
  isLoadingProviders: state?.app?.providerSearch?.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchProviders: args => {
    console.log(args);
    dispatch(providerSearch(args));
  },
  fetchGeoLocation: args => {
    dispatch(geoCoder(args));
  },
  fetchAccountInfo: token => {
    dispatch(fetchAccountInfo(token));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const fetchProviders = ({
    page,
    recordsPerPage,
    search,
    orderBy,
    desc,
    location,
    bounds,
    languages,
    specialties,
    gender,
    searchWithinBound
  }) => {
    dispatchProps.fetchProviders({
      page,
      recordsPerPage,
      search,
      orderBy,
      desc,
      location,
      bounds,
      languages,
      specialties,
      gender,
      searchWithinBound,
      token
    });
  };
  const fetchGeoLocation = ({ address1, city, state, zip }) => {
    dispatchProps.fetchGeoLocation({ address1, city, state, zip, token });
  };
  const fetchAccountInfo = () => {
    dispatchProps.fetchAccountInfo(token);
  };
  return {
    paginator:
      stateProps.providerSearchData && paginate(stateProps.providerSearchData, fetchProviders),
    ...stateProps,
    ...ownProps,
    fetchProviders,
    fetchGeoLocation,
    fetchAccountInfo
  };
};

const ConnectedProviderLookup = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProviderLookup);

const reflection = {
  component: ConnectedProviderLookup,
  layout: Standard,
  layoutProps: {
    title: 'Provider Lookup',
    searchBar: <ProviderSearchBar />
  },
  route: '/provider-lookup',
  forAuthorized: true
};

export default ConnectedProviderLookup;

export { reflection };
