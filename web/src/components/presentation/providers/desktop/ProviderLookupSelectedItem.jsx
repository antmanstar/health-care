/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import defaultTheme from '../../../../style/themes';
import ProviderProfile from './ProviderProfile';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';
import selectors from '@evry-member-app/shared/store/selectors';
import GoogleMap from 'google-map-react';
import { PopOver } from '../../shared/desktop/PopOver';

const { setModalData, showModal, providerSearchQueryClear } = actions;
const { getProviderSearchLocation } = selectors;

const { SectionDivider, FormLabel } = defaultTheme.components;

const Wrapper = styled.div`
  flex: 48%;
  margin-bottom: 8px;
`;

const SelectedItemWrapper = styled.div`
  padding: 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  outline: none;
  border-radius: 0 0 4px 4px;
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
  width: 100%;
`;

const MapSearchButton = styled.div`
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.shades.white};
  color: ${props => props.theme.colors.shades.black};
  border: none;
  border-radius: 4px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
  font-weight: 300;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #eeeeee;
  }
`;

const Padding = styled.div`
  padding: 16px 32px;
`;

const WarningLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: orange;
  gap: 10px;
`;

const PinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    ${PinLabel} {
      z-index: 3;
    }
  }

  &:hover {
    ${Pin} {
      z-index: 2;
    }
  }
`;

const PinLabel = styled.label`
  z-index: ${props => (props.hover ? '3' : '1')};
  position: absolute;
  top: 5px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: grab;
`;

const Pin = styled.img`
  filter: ${props => (props.hover ? 'brightness(0)' : 'none')};
  z-index: ${props => (props.hover ? '2' : '0')};
  &:hover {
    filter: brightness(0);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FeedbackButton = styled.button`
  width: 32%;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: ${props => props.theme.colors.shades.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  img {
    background: #fff;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: all 200 ease-in-out;
  }

  @media ${props => props.theme.device.tablet} {
    border: 1px solid ${props => props.theme.colors.roles.warning};
    box-shadow: none;

    &:hover {
      background: ${props => props.theme.colors.roles.warning};
    }

    &.active {
      background: ${props => props.theme.colors.roles.warning};
    }

    &:first-child {
      border-color: ${props => props.theme.colors.roles.success};
      &:hover {
        background: ${props => props.theme.colors.roles.success};
      }

      &.active {
        background: ${props => props.theme.colors.roles.success};
      }
    }

    &:last-child {
      border-color: ${props => props.theme.colors.roles.danger};
      &:hover {
        background: ${props => props.theme.colors.roles.danger};
      }

      &.active {
        background: ${props => props.theme.colors.roles.danger};
      }
    }
  }
`;

const EditedFormLabel = styled(FormLabel)`
  margin-top: 0;
`;

const ProviderLookupSelectedItem = ({
  setModalData,
  showModal,
  name,
  distance,
  practiceName,
  address,
  phone,
  npiNumber,
  specialties,
  geoData,
  providerData,
  setHoveredCardId,
  hoveredPinId,
  id,
  setBoundary,
  currentLocation,
  providerSearchQueryClear
}) => {
  const [userLocation, setUserLocation] = useState();
  const boundary = useRef();
  const [profile, setProfile] = useState();

  const defaultMapProps = {
    center: {
      lat: 32.0023,
      lng: -102.13496
    },
    zoom: 14
  };

  const getBounds = map => {
    let neLat = map
      .getBounds()
      .getNorthEast()
      .lat();
    let neLng = map
      .getBounds()
      .getNorthEast()
      .lng();
    let swLat = map
      .getBounds()
      .getSouthWest()
      .lat();
    let swLng = map
      .getBounds()
      .getSouthWest()
      .lng();
    return {
      sw: { lat: swLat, lng: swLng },
      ne: { lat: neLat, lng: neLng }
    };
  };

  useEffect(() => {
    return providerSearchQueryClear();
  }, []);

  useEffect(() => {
    setProfile({ name, distance, practiceName, address, phone, npiNumber, specialties, id });
  }, [name, distance, practiceName, address, phone, npiNumber, specialties, id]);

  useEffect(() => {
    setUserLocation({ lat: geoData?.latitude, lng: geoData?.longitude });
  }, [geoData]);

  useEffect(() => {
    setUserLocation({ lat: currentLocation?.lat, lng: currentLocation?.lng });
  }, [currentLocation]);

  const bindResizeListener = (map, maps) => {
    maps.event.addListener(map, 'idle', () => {
      boundary.current = getBounds(map);
    });
    setBoundary(getBounds(map));
  };

  const handleSearchArea = () => {
    setBoundary(boundary.current);
  };

  const handleApiLoaded = (map, maps) => {
    bindResizeListener(map, maps);
  };

  const handleMarkerClick = id => {
    let chosenProvider = providerData[id];
    setProfile({
      name: chosenProvider.name,
      distance: chosenProvider.distance,
      practiceName: chosenProvider.practiceName,
      address: chosenProvider.address,
      phone: chosenProvider.phone,
      npiNumber: chosenProvider.npiNumber,
      specialties: chosenProvider.specialties,
      id: id
    });
  };
  const handleMarkerHover = id => {
    setHoveredCardId(id);
  };

  const handleMarkerLeave = id => {
    setHoveredCardId(null);
  };

  const handleFeedbackClick = data => {
    setModalData(data);
    showModal('SUBMIT_PROVIDER_FEEDBACK');
  };

  const LocationPin = props => {
    let hover = props.id === hoveredPinId ? true : false;
    let title =
      providerData[props.id].name !== ''
        ? providerData[props.id].name
        : providerData[props.id].practiceName;

    const content = (
      <>
        <span>{title}</span> <br />
        {providerData[props.id].address} <br />
        {providerData[props.id].phone}
      </>
    );
    return (
      <PopOver content={content}>
        <PinWrapper>
          <PinLabel hover={hover}>{props.label}</PinLabel>
          <Pin hover={hover} src={images[`location_pin`]} />
        </PinWrapper>
      </PopOver>
    );
  };

  return (
    <Wrapper>
      <MapWrapper>
        <MapSearchButton onClick={() => handleSearchArea()}>Search area</MapSearchButton>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyAunkg9QcyS0CdUNmxqCONgqnxc2ewsvEo' }}
          center={userLocation?.lat !== undefined ? userLocation : defaultMapProps.center}
          defaultZoom={defaultMapProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          onChildClick={id => handleMarkerClick(id)}
          onChildMouseEnter={id => handleMarkerHover(id)}
          onChildMouseLeave={id => handleMarkerLeave(id)}
        >
          {providerData.map((provider, i) => {
            return (
              <LocationPin
                lat={provider.location.lat}
                lng={provider.location.lng}
                label={i + 1}
                id={i}
              />
            );
          })}
        </GoogleMap>
      </MapWrapper>
      <SelectedItemWrapper>
        {providerData.length !== 0 ? (
          <>
            <ProviderProfile {...profile} />
            <Padding>
              <EditedFormLabel>How do you feel about this provider?</EditedFormLabel>
              <Buttons>
                <FeedbackButton
                  onClick={() =>
                    handleFeedbackClick({
                      feedbackChoice: 'positive',
                      provider: { ...providerData[id], id: id }
                    })
                  }
                >
                  <img src={images['feedback-positive']} alt="positive response" />
                </FeedbackButton>
                <FeedbackButton
                  onClick={() =>
                    handleFeedbackClick({
                      feedbackChoice: 'neutral',
                      provider: { ...providerData[id], id: id }
                    })
                  }
                >
                  <img src={images['feedback-neutral']} alt="neutral response" />
                </FeedbackButton>
                <FeedbackButton
                  onClick={() =>
                    handleFeedbackClick({
                      feedbackChoice: 'negative',
                      provider: { ...providerData[id], id: id }
                    })
                  }
                >
                  <img src={images['feedback-negative']} alt="negative response" />
                </FeedbackButton>
              </Buttons>
            </Padding>
          </>
        ) : (
          <Padding>
            <WarningLabel>
              <i className="material-icons">warning</i>
              No providers found, please search another area.
            </WarningLabel>
          </Padding>
        )}
      </SelectedItemWrapper>
    </Wrapper>
  );
};

ProviderLookupSelectedItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentLocation: getProviderSearchLocation(state)
});

const mapDispatchToProps = dispatch => ({
  providerSearchQueryClear: () => {
    dispatch(providerSearchQueryClear());
  },
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProviderLookupSelectedItem);
