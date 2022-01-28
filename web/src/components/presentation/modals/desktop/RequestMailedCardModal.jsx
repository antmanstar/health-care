import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
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

const {
  createRequestMailedCardCase,
  completeRequestMailedCardCase,
  fetchCases,
  setModalData,
  showModal,
  requestMailedCardReset
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

  useEffect(() => {
    dispatch(requestMailedCardReset());
  }, []);

  useEffect(() => {
    if (requestMailCardCase && requestMailCardCase.status === 'OPEN') {
      console.log('useEffect: completeRequestMailedCardCase');
      dispatch(completeRequestMailedCardCase(getRequestMailedCardCase.id, token));
    }
    if (requestMailCardCase && requestMailCardCase.status === 'COMPLETE') {
      console.log('useEffect: toggle submission response');
      setModalData({
        type: 'SUCCESS',
        title: 'Submitted!',
        message: "Great! We'll get to work on that and send you confirmation once complete."
      });
      showModal('SUBMISSION_RESPONSE');
    }
  }, [getRequestMailedCardCase]);

  const createCase = () => {
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
              <p>{`1-800-867-5309`}</p>
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
            Is this correct? If not, <Button>click here</Button> to change your address.
          </p>
        </ModalBody>
        <ModalSectionDivider />
        <ModalButtonsRight>
          <SmallButton text="Continue" onClick={createCase} />
          <SmallButton text="Cancel" negative onClick={props.hideModal} />
        </ModalButtonsRight>
      </ModalWrapper>
    </Fragment>
  );
};

export default RequestMailedCardModal;
