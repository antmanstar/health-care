import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import images from '../../../../utils/images';
import SmallButton from '../../shared/desktop/SmallButton';
import selectors from '@evry-member-app/shared/store/selectors';
import { useSelector, useDispatch } from 'react-redux';

const {
  Scrim,
  ModalWrapper,
  ModalBody,
  ModalSectionDivider,
  ModalButtonsRight,
  ModalHeader,
  ModalTitle,
  SpaceBetween
} = defaultTheme.components;

const { setModalData, showModal } = actions;

const { getToken } = selectors;

const InnerContent = styled.div``;
const InnerContentHeader = styled.div``;
const InnerContentBody = styled.div``;

const ConciergeCareModal = props => {
  return (
    <Fragment>
      <Scrim onClick={props.hideModal} />
      <ModalWrapper>
        <ModalBody>
          <InnerContent>
            <InnerContentHeader>Healthcare should be so confusing</InnerContentHeader>
            <InnerContentBody>
              With Evry, you’ll be paired with your own team of nurses, nutritionists, and doctors
              who work for you. These medical professionals are the frontline for helping you live a
              better, healthier, life. Here are just a few things they can do for you.
            </InnerContentBody>
          </InnerContent>
          <InnerContent>
            <InnerContentHeader>Throw out the search engines.</InnerContentHeader>
            <InnerContentBody>
              Your time is too valuable to decipher a dozen health blogs full of conflicting
              information. Let our team of experts find you the best answer.
            </InnerContentBody>
          </InnerContent>
          <InnerContent>
            <InnerContentHeader>Find Local Doctors.</InnerContentHeader>
            <InnerContentBody>
              Need a specialist? You don’t need to dig through a provider directory, cross reference
              reviews online, and pray they’ll have an opening within the next six months. We’ll
              provide you great recommendations for top-rated doctors who can meet your needs.
            </InnerContentBody>
          </InnerContent>
          <InnerContent>
            <InnerContentHeader>Book appointments</InnerContentHeader>
            <InnerContentBody>
              We enjoy the soft jazz of hold music, so that you don’t have to.
            </InnerContentBody>
          </InnerContent>
          <InnerContent>
            <InnerContentHeader>Get the most out of your Evry coverage</InnerContentHeader>
            <InnerContentBody>
              Your Evry membership includes a personalized Care Plan that provides unique benefits.
              Interested in a private trainer? Talk to your Care Guide about Evry paying for it.
              Need a ride to the doctor? A car is on the way.
            </InnerContentBody>
          </InnerContent>
          <InnerContent>
            <InnerContentHeader>Stop stressing about appointments.</InnerContentHeader>
            <InnerContentBody>
              From routine office visits to complicated procedures, we’ll help you prepare for it
              and get you ready for gameday.
            </InnerContentBody>
          </InnerContent>
        </ModalBody>
      </ModalWrapper>
    </Fragment>
  );
};

export default ConciergeCareModal;
