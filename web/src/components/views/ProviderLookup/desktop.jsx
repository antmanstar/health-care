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
import StyledLoadingSpinner from '../../presentation/shared/Loader/StyledLoadingSpinner';

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
  providerSearchQuery
}) => {
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState();
  const [hoveredPinId, setHoveredPinId] = useState();
  const [organizedData, setOrganizedData] = useState([]);
  const [boundary, setBoundary] = useState();

  let isLoading = providerSearchData?.isLoading ? true : false;

  useEffect(() => {
    let baseRequest = {
      page: 1,
      recordsPerPage: 10,
      search: '',
      orderBy: '',
      desc: true,
      location: {
        latitude: locationData?.latitude,
        longitude: locationData?.longitude
      },
      bounds: {
        south_west: {
          latitude: boundary?.sw?.lat,
          longitude: boundary?.sw?.lng
        },
        north_east: {
          latitude: boundary?.ne?.lat,
          longitude: boundary?.ne?.lng
        }
      },
      languages: [],
      specialties: [],
      gender: null
    };
    fetchProviders({ ...baseRequest, ...providerSearchQuery });
  }, [boundary, providerSearchQuery]);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  useEffect(() => {
    if (!address.isEmpty())
      fetchGeoLocation({
        address1: convertAddress(address),
        city: address.city,
        state: address.state,
        zip: address.zip
      });
  }, [address.isEmpty()]);

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

  return (
    <>
      <Helmet>
        <title>{reflection.layoutProps.title} - Evry Health</title>
      </Helmet>
      <LayoutWrapper>
        <ProviderLookupResults>
          <PaginationWrapper>
            {organizedData.map((practiceDetails, i) => {
              return (
                <ProviderListItem
                  id={i}
                  setHoveredPinId={setHoveredPinId}
                  hoveredCardId={hoveredCardId}
                  onClick={() => setSelectedProvider(i)}
                  {...practiceDetails}
                />
              );
            })}
            {paginator && <Pagination paginator={paginator} />}
          </PaginationWrapper>
          <ProviderLookupSelectedItem
            id={selectedProvider}
            hoveredPinId={hoveredPinId}
            setHoveredCardId={setHoveredCardId}
            providerData={organizedData}
            geoData={locationData}
            setBoundary={setBoundary}
            {...organizedData[selectedProvider]}
          />
        </ProviderLookupResults>
        {isLoading && <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />}
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
  locationData: null
};

const mapStateToProps = state => ({
  token: getToken(state),
  address: getAddress(state),
  locationData: getLocationData(state),
  providerSearchData: getProviderSearchData(state),
  providerSearchQuery: getProviderSearchQuery(state)
});

const mapDispatchToProps = dispatch => ({
  fetchProviders: args => {
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
    gender
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
