import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import SmallButton from '../../shared/desktop/SmallButton';
import selectors from '@evry-member-app/shared/store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';
import { Link as RouterLink } from 'react-router-dom';

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

const {
  createRequestMailedCardCase,
  completeRequestMailedCardCase,
  fetchCases,
  setModalData,
  showModal,
  requestMailedCardReset,
  hideModal
} = actions;

const { getRequestMailedCardCase, getToken } = selectors;

const Button = styled.button`
  padding: 0;
  font-size: 16px;
  font-weight: 300;
  color: ${defaultTheme.colors.shades.blue};
  border: none;
  border-radius: 4px;
  outline: none;
  background: none;
  text-decoration: underline;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.shades.blue};

  svg {
    height: 20px;
  }

  p {
    //margin: 0 0 0 8px;
    font-weight: 400;
    white-space: nowrap;
  }
`;
const SubTitle = styled.h2`
  color: ${defaultTheme.colors.shades.blue};
`;
const RequestMailedCardModal = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => getToken(state));
  const requestMailCardCase = useSelector(state => getRequestMailedCardCase(state));
  const { address } = props.accountInfo;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    dispatch(requestMailedCardReset());
  }, []);

  useEffect(() => {
    if (requestMailCardCase && requestMailCardCase.status === 'OPEN') {
      dispatch(completeRequestMailedCardCase({ caseID: requestMailCardCase.id, token }));
    } else if (requestMailCardCase && requestMailCardCase.status === 'COMPLETE') {
      setIsSubmitting(false);
      dispatch(
        setModalData({
          type: 'SUCCESS',
          title: 'Submitted!',
          message: "Great! We'll get to work on that and send you a confirmation once complete."
        })
      );
      dispatch(showModal('SUBMISSION_RESPONSE'));
      dispatch(requestMailedCardReset());
    } else if (
      requestMailCardCase &&
      requestMailCardCase.status &&
      requestMailCardCase.status.includes('ERROR')
    ) {
      setIsSubmitting(false);
      dispatch(
        setModalData({
          type: 'ERROR',
          title: 'Error',
          message: 'Something went wrong. Please try again or give us a call!'
        })
      );
      dispatch(showModal('SUBMISSION_RESPONSE'));
      dispatch(requestMailedCardReset());
    }
  }, [requestMailCardCase, getRequestMailedCardCase]);

  const createCase = () => {
    setIsSubmitting(true);
    dispatch(createRequestMailedCardCase({ token }));
  };

  return (
    <Fragment>
      <Scrim onClick={props.hideModal} />
      <ModalWrapper className="narrow">
        <ModalHeader>
          <SpaceBetween>
            <ModalTitle>Request Mailed Card</ModalTitle>
            <PhoneNumber>
              <i className="material-icons">phone</i>
              <p>{`1-855-579-3879`}</p>
            </PhoneNumber>
          </SpaceBetween>
        </ModalHeader>
        <ModalBody>
          <SubTitle>Mailing Address</SubTitle>
          {address && (
            <p>
              {address.address1}
              {address.address2 && ` ${address.address2}`}, {address.city}, {address.state}{' '}
              {address.zip}
            </p>
          )}
          <p>
            Is this correct? If not,{' '}
            <RouterLink to="/account" onClick={() => dispatch(hideModal())}>
              click here
            </RouterLink>{' '}
            to change your address.
          </p>
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <SmallButton text="Continue" onClick={createCase} disabled={isSubmitting} />
          <SmallButton text="Cancel" negative onClick={props.hideModal} disabled={isSubmitting} />
        </ModalButtonsRight>
        {isSubmitting && <LoadingSpinnerScreen type="TailSpin" color="#00BFFF" />}
      </ModalWrapper>
    </Fragment>
  );
};

export default RequestMailedCardModal;
