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
  ModalHeader,
  ModalTitle,
  SpaceBetween,
  ModalButtonsCenter
} = defaultTheme.components;

const ScrollableModalWrapper = styled(ModalWrapper)`
  overflow-y: auto;
  height: 100%;

  @media (min-height: 700px) {
    height: auto;
  }
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 25px;

  & div.bold {
    font-weight: 700;
    font-size: 12px;
    margin-top: 10px;
  }
`;
const InnerContentHeader = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${defaultTheme.colors.shades.darkTealBlue};
`;
const InnerContentBody = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: ${defaultTheme.colors.shades.darkGray};
`;
const NumberCircle = styled.div`
  background-color: ${defaultTheme.colors.shades.darkTealBlue};
  color: ${defaultTheme.colors.shades.white};
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 25px;
  text-align: center;
  vertical-align: middle;
  line-height: 24px;
  font-weight: 700;
  font-size: 12px;
  margin: 0 10px;
`;

const ConciergeCareModal = props => {
  return (
    <Fragment>
      <Scrim onClick={props.hideModal} />
      <ScrollableModalWrapper>
        <ModalHeader>
          <ModalTitle>Learn More about Concierge Care</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {/* <InnerContent>
            <InnerContentBody>Because you deserve to be taken care of.</InnerContentBody>
          </InnerContent> */}
          <InnerContent>
            <div>
              {/* <InnerContentHeader>Healthcare shouldn't be so confusing</InnerContentHeader> */}
              <InnerContentBody>
                With Evry, you’ll be paired with your own team of nurses, nutritionists, and doctors
                who work for you. These medical professionals are the frontline for helping you live
                a better, healthier life.
              </InnerContentBody>
              <div className="bold">Here are just a few things they can do for you:</div>
            </div>
          </InnerContent>
          <InnerContent>
            <NumberCircle>1</NumberCircle>
            <div>
              <InnerContentHeader>
                Explain the ins and outs of your health plan coverage or claims.
              </InnerContentHeader>
              {/* <InnerContentHeader>Throw out the search engines.</InnerContentHeader>
              <InnerContentBody>
                Your time is too valuable to decipher a dozen health blogs full of conflicting
                information. Let our team of experts find you the best answer.
              </InnerContentBody> */}
            </div>
          </InnerContent>
          <InnerContent>
            <NumberCircle>2</NumberCircle>
            <div>
              <InnerContentHeader>
                Look up health advice and get expert guidance when you have questions.
              </InnerContentHeader>
              {/* <InnerContentHeader>Find Local Doctors.</InnerContentHeader>
              <InnerContentBody>
                Need a specialist? You don’t need to dig through a provider directory, cross
                reference reviews online, and pray they’ll have an opening within the next six
                months. We’ll provide you great recommendations for top-rated doctors who can meet
                your needs.
              </InnerContentBody> */}
            </div>
          </InnerContent>
          <InnerContent>
            <NumberCircle>3</NumberCircle>
            <div>
              <InnerContentHeader>
                Help you find a local in-network doctor or facility that meets your needs
              </InnerContentHeader>
              {/* <InnerContentHeader>Book appointments</InnerContentHeader>
              <InnerContentBody>
                We enjoy the soft jazz of hold music, so that you don’t have to.
              </InnerContentBody> */}
            </div>
          </InnerContent>
          <InnerContent>
            <NumberCircle>4</NumberCircle>
            <div>
              <InnerContentHeader>
                Get you information on an upcoming procedure or appointment so that you're ready
                when the day comes.
              </InnerContentHeader>
              {/* <InnerContentHeader>Get the most out of your Evry coverage</InnerContentHeader>
              <InnerContentBody>
                Your Evry membership includes a personalized Care Plan that provides unique
                benefits. Interested in a private trainer? Talk to your Care Guide about Evry paying
                for it. Need a ride to the doctor? A car is on the way.
              </InnerContentBody> */}
            </div>
          </InnerContent>
          <InnerContent>
            <NumberCircle>5</NumberCircle>
            <div>
              <InnerContentHeader>Add money to your Evry Reward Card.</InnerContentHeader>
              {/* <InnerContentHeader>Stop stressing about appointments.</InnerContentHeader>
              <InnerContentBody>
                From routine office visits to complicated procedures, we’ll help you prepare for it
                and get you ready for gameday.
              </InnerContentBody> */}
            </div>
          </InnerContent>
          <InnerContent>
            <NumberCircle>6</NumberCircle>
            <div>
              <InnerContentHeader>
                Explain the various wellness programs available to you and assist with getting
                started.
              </InnerContentHeader>
              {/* <InnerContentHeader>Stop stressing about appointments.</InnerContentHeader>
              <InnerContentBody>
                From routine office visits to complicated procedures, we’ll help you prepare for it
                and get you ready for gameday.
              </InnerContentBody> */}
            </div>
          </InnerContent>
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsCenter>
          <SmallButton text="Close" negative onClick={props.hideModal} />
        </ModalButtonsCenter>
      </ScrollableModalWrapper>
    </Fragment>
  );
};

export default ConciergeCareModal;
