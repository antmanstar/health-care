import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import Select from '../../shared/desktop/Select';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';
import actions from '@evry-member-app/shared/store/actions';
import { connect } from 'react-redux';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';

const { setModalData, showModal } = actions;

// MODAL - Update Personal Information

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsCenter,
  ModalButtonsRight,
  ModalHeader,
  Input,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const LargeModalWrapper = styled(ModalWrapper)`
  max-width: 1024px;
`;

const EditedFormLabel = styled(FormLabel)`
  margin: 0 0 8px;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const FormSpaceBetween = styled(SpaceBetween)`
  align-items: flex-start;

  &:last-child {
    margin-bottom: -16px;
  }

  &.mobile-wrap {
    flex-wrap: wrap;
    flex-direction: column;
    @media ${props => props.theme.device.tabletXL} {
      flex-wrap: nowrap;
      flex-direction: row;
    }
  }
`;

const EditedInput = styled(Input)`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 16px;
  }
`;

const Column = styled.div`
  width: 100%;
  margin-bottom: 16px;
  @media ${props => props.theme.device.tabletXL} {
    width: 48%;
    margin-bottom: 0;
  }
`;

const Flex4 = styled.div`
  flex: 4;
  padding-right: 8px;
`;

const Flex2 = styled.div`
  flex: 2;
  padding-right: 8px;
`;

const Flex1 = styled.div`
  flex: 1;
`;

const LockedNote = styled.div`
  color: ${props => props.theme.colors.roles.danger};

  div {
    display: flex;
    align-items: center;

    > * {
      margin: 0;
    }

    i {
      margin-right: 8px;
    }

    h3 {
      font-weight: 500;
    }
  }

  p {
    color: ${props => props.theme.colors.shades.darkGray};
  }
`;

const UpdatePersonalInformationModal = props => {
  const extractPhoneNumber = (array, phoneType) => {
    const numbers = array.filter(item => item.phone_type === phoneType);

    if (numbers[0] !== undefined) {
      return numbers[0].phone_number;
    }

    return undefined;
  };

  let info = props.accountInfo;

  let [ infoAddress1, setInfoAddress1 ] = useState(info?.address?.address1 || "");
  let [ infoAddress2, setInfoAddress2 ] = useState(info?.address?.address2 || "");
  let [ infoCity, setInfoCity ] = useState(info?.address?.city || "");
  let [ infoState, setInfoState ] = useState(info?.address?.state || "");
  let [ infoZip, setInfoZip ] = useState(info?.address?.zip || "");
  let [ phoneCell, setPhoneCell ] = useState(extractPhoneNumber(info.phones, 'Cell Phone') || "");
  let [ phoneHome, setPhoneHome ] = useState(extractPhoneNumber(info.phones, 'Home Phone') || "");
  let [ phoneWork, setPhoneWork ] = useState(extractPhoneNumber(info.phones, 'Business Phone') || "");
  let [ showLoader, setShowLoader ] = useState(false);

  function handleErrors(errors) {
    setShowLoader(false);
  }

  function createSuccessModal() {
    setShowLoader(false);

    props.setModalData({
      type: 'SUCCESS',
      title: 'Submitted!',
      message: "Great! We'll get to work on that and send you a confirmation once complete."
    });
    props.showModal('SUBMISSION_RESPONSE');
  }

  function completeCase(response) {
    apis.markCaseAsSubmitComplete({
      token: props.authToken,
      id: response.data.id
    }).then(createSuccessModal).catch(handleErrors);
  }

  function handleSubmit() {    
    setShowLoader(true);

    apis.createCaseUpdateAddress({
      token: props.authToken,
      address1: infoAddress1,
      address2: infoAddress2,
      city: infoCity,
      state: infoState,
      zip: infoZip,
      cell: phoneCell,
      home: phoneHome,
      work: phoneWork
    }).then(completeCase).catch(handleErrors);
  }

  return (
    <>
      <Scrim onClick={props.hideModal} />
      <LargeModalWrapper>
        <ModalHeader>
          <SpaceBetween>
            <ModalTitle>Update Your Personal Information</ModalTitle>
          </SpaceBetween>
        </ModalHeader>
        <ModalBody>
          {props.locked ? (
            <LockedNote>
              <div>
                <i className="material-icons">info_outline</i>
                <h3>Unable to make changes at this time.</h3>
              </div>
              <p>
                A recent change request has been submitted. Please check back later or call
                1-800-555-1234 with any questions or concerns.
              </p>
            </LockedNote>
          ) : (
            <FormSpaceBetween className="mobile-wrap">
              <Column>
                <FormSpaceBetween>
                  <Flex4>
                    <EditedFormLabel>Street Address</EditedFormLabel>
                    <EditedInput
                      value={infoAddress1}
                      onChange={e => setInfoAddress1(e.target.value)}
                      name="address"
                      type="text"
                      placeholder='Street Address'
                    />
                  </Flex4>
                  <Flex1>
                    <EditedFormLabel>Apt #</EditedFormLabel>
                    <EditedInput 
                      value={infoAddress2} 
                      onChange={e => setInfoAddress2(e.target.value)}
                      name="apt"
                      type="text"
                      placeholder='Apt'
                    />
                  </Flex1>
                </FormSpaceBetween>
                <FormSpaceBetween>
                  <Flex2>
                    <EditedFormLabel>City</EditedFormLabel>
                    <EditedInput value={infoCity} onChange={e => setInfoCity(e.target.value)} name="city" type="text" placeholder='Zip' />
                  </Flex2>
                  <Flex2>
                    <EditedFormLabel>State</EditedFormLabel>
                    <Select name="state" value={infoState} onChange={e => setInfoState(e.target.value)}>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </Select>
                  </Flex2>
                  <Flex1>
                    <EditedFormLabel>Zip</EditedFormLabel>
                    <EditedInput value={infoZip} onChange={e => setInfoZip(e.target.value)} name="postal" type="text" placeholder='Zip' />
                  </Flex1>
                </FormSpaceBetween>
              </Column>
              <Column>
                <EditedFormLabel>Cell Phone Number</EditedFormLabel>
                <EditedInput
                  value={phoneCell} onChange={e => setPhoneCell(e.target.value)} 
                  name="cellPhone"
                  type="phone"
                  placeholder='Enter a cell phone number.'
                />
                <EditedFormLabel>Home Phone Number</EditedFormLabel>
                <EditedInput
                  value={phoneHome} onChange={e => setPhoneHome(e.target.value)} 
                  name="homePhone"
                  type="phone"
                  placeholder='Enter a home phone number.'
                />
                <EditedFormLabel>Work Phone Number</EditedFormLabel>
                <EditedInput
                 value={phoneWork} onChange={e => setPhoneWork(e.target.value)} 
                  name="workPhone"
                  type="phone"
                  placeholder='Enter a work phone number.'
                />
              </Column>
            </FormSpaceBetween>
          )}
        </ModalBody>
        <ModalSectionDivider />
        {props.locked ? (
          <ModalButtonsCenter>
            <SmallButton text="Cancel" negative onClick={props.hideModal} />
          </ModalButtonsCenter>
        ) : (
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" onClick={handleSubmit} />
            <SmallButton text="Cancel" negative onClick={props.hideModal} />
          </ModalButtonsRight>
        )}
        
        {showLoader && <LoadingSpinnerScreen />}
      </LargeModalWrapper>
    </>
  );
};

UpdatePersonalInformationModal.propTypes = {
  address: PropTypes.shape({
    line1: PropTypes.string,
    line2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postal: PropTypes.string
  }),
  email: PropTypes.string,
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      number: PropTypes.string
    })
  ),
  hideModal: PropTypes.func.isRequired,
  locked: PropTypes.bool
};

UpdatePersonalInformationModal.defaultProps = {
  address: undefined,
  email: undefined,
  phoneNumbers: [],
  locked: false
};

const mapStateToProps = state => ({
  //token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  setModalData: data => {
    dispatch(setModalData(data));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePersonalInformationModal);
