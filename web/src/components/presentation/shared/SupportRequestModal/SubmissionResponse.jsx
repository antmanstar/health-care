import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import MobileActionButton from '../mobile/MobileActionButton';
import Loader from '../Loader/Loader';
import images from '../../../../utils/images';

const { MobileFixedBottomButton, MobileContainer } = defaultTheme.components;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.colors.shades.white};
  color: ${props => props.theme.colors.shades.blue};
`;

const ResponseContainer = styled(MobileContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: 400;
  }

  div {
    max-width: 252px;
  }
`;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
`;

const SubmissionResponse = ({ status, handleClose }) => (
  <Wrapper>
    {status === 'pending' ? (
      <Loader />
    ) : (
      <>
        <ResponseContainer>
          {status === 'success' ? (
            <div>
              <img src={images[`${status}-icon`]} alt="alt" />
              <h2>Request Submitted!</h2>
              <p>We will send a confirmation when we complete this request.</p>
            </div>
          ) : (
            <div>
              <h2>Request Failed.</h2>
              <p>This request cannot be submitted at this time. Please try again later.</p>
            </div>
          )}
        </ResponseContainer>
        <StyledMobileFixedBottomButton>
          <MobileActionButton
            text="Close"
            type={status === 'success' ? 'success' : 'action'}
            onClick={handleClose}
          />
        </StyledMobileFixedBottomButton>
      </>
    )}
  </Wrapper>
);

SubmissionResponse.propTypes = {
  status: PropTypes.oneOf(['success', 'failure', 'pending']).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default SubmissionResponse;
