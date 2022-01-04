import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import Select from '../../shared/desktop/Select';

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

const UpdatePersonalInformationModal = ({ email, address, phoneNumbers, hideModal, locked }) => {
  const extractPhoneNumber = (array, phoneType) => {
    const numbers = array.filter(item => item.phone_type === phoneType);

    if (numbers[0] !== undefined) {
      return numbers[0].phone_number;
    }

    return undefined;
  };

  return (
    <>
      <Scrim onClick={hideModal} />
      <LargeModalWrapper>
        <ModalHeader>
          <SpaceBetween>
            <ModalTitle>Update Your Personal Information</ModalTitle>
          </SpaceBetween>
        </ModalHeader>
        <ModalBody>
          {locked ? (
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
                <EditedFormLabel>Email</EditedFormLabel>
                <EditedInput name="email" type="email" placeholder={email || 'Email Address'} />
                <FormSpaceBetween>
                  <Flex4>
                    <EditedFormLabel>Street Address</EditedFormLabel>
                    <EditedInput
                      name="address"
                      type="text"
                      placeholder={address.line1 || 'Street Address'}
                    />
                  </Flex4>
                  <Flex1>
                    <EditedFormLabel>Apt #</EditedFormLabel>
                    <EditedInput name="apt" type="text" placeholder={address.postal || 'Zip'} />
                  </Flex1>
                </FormSpaceBetween>
                <FormSpaceBetween>
                  <Flex2>
                    <EditedFormLabel>City</EditedFormLabel>
                    <EditedInput name="city" type="text" placeholder={address.postal || 'Zip'} />
                  </Flex2>
                  <Flex2>
                    <EditedFormLabel>State</EditedFormLabel>
                    <Select name="state" placeholder={address.state || 'State'}>
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
                    <EditedInput name="postal" type="text" placeholder={address.postal || 'Zip'} />
                  </Flex1>
                </FormSpaceBetween>
              </Column>
              <Column>
                <EditedFormLabel>Cell Phone Number</EditedFormLabel>
                <EditedInput
                  name="cellPhone"
                  type="phone"
                  placeholder={
                    extractPhoneNumber(phoneNumbers, 'Cell Phone') || 'Enter a cell phone number.'
                  }
                />
                <EditedFormLabel>Home Phone Number</EditedFormLabel>
                <EditedInput
                  name="homePhone"
                  type="phone"
                  placeholder={
                    extractPhoneNumber(phoneNumbers, 'Home Phone') || 'Enter a home phone number.'
                  }
                />
                <EditedFormLabel>Work Phone Number</EditedFormLabel>
                <EditedInput
                  name="workPhone"
                  type="phone"
                  placeholder={
                    extractPhoneNumber(phoneNumbers, 'Business Phone') ||
                    'Enter a work phone number.'
                  }
                />
              </Column>
            </FormSpaceBetween>
          )}
        </ModalBody>
        <ModalSectionDivider />
        {locked ? (
          <ModalButtonsCenter>
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsCenter>
        ) : (
          <ModalButtonsRight>
            <SmallButton text="Submit Changes" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        )}
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

export default UpdatePersonalInformationModal;
