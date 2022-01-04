import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import MobileSectionHeader from './MobileSectionHeader';
import InfoItemWithIcon from './InfoItemWithIcon';
import MobileActionButton from './MobileActionButton';
import Select from '../desktop/Select';

// MOBILE: Personal Information Settings
// TODO: Data Audit once we have better data

const {
  MobileFixedBottomButton,
  MobileInput,
  MobileListTitle,
  SectionDivider,
  SpaceBetween
} = defaultTheme.components;

const EditButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.blue};
  background: none;
  border: none;
  outline: none;
  padding: 16px 8px 8px;
`;

const ButtonWrapper = styled(MobileFixedBottomButton)`
  padding: 0;
  margin-bottom: 16px;

  button {
    margin-bottom: 8px;
  }
`;

const EditedMobileListTitle = styled(MobileListTitle)`
  margin-top: 0;
`;

const EditedSectionDivider = styled(SectionDivider)`
  border-color: #ebebeb;
  margin: 8px -16px 16px;
`;

const EditedSpaceBetween = styled(SpaceBetween)`
  > *:last-child {
    padding-left: 8px;
  }
`;

const Label = styled.p`
  margin: 8px 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.gray};
`;

const Flex2 = styled.div`
  flex: 2;
  margin-bottom: 8px;
`;

class MobileMemberInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this.handlers = {
      stopEditing: this.stopEditing.bind(this),
      startEditing: this.startEditing.bind(this)
    };
  }

  extractPhoneNumber = (array, phoneType) => {
    const phoneNumbers = array.filter(item => item.phone_type === phoneType);

    if (phoneNumbers[0] !== undefined) {
      return phoneNumbers[0].phone_number;
    }

    return undefined;
  };

  stopEditing = () => {
    this.setState({ editing: false });
  };

  startEditing = () => {
    this.setState({ editing: true });
  };

  render() {
    const { editing } = this.state;
    const { locked, name, email, address, phoneNumbers } = this.props;
    return (
      <>
        <SpaceBetween>
          <div>
            <MobileSectionHeader
              title={`${name.first} ${name.last}` || 'No Name Provided'}
              subtitle={editing ? 'Update your personal info below.' : undefined}
            />
          </div>
          {!locked && !editing && (
            <EditButton onClick={this.handlers.startEditing}>EDIT</EditButton>
          )}
        </SpaceBetween>
        {!editing ? (
          <>
            <InfoItemWithIcon icon="mail_outline" text={email || 'Email not provided'} />
            <InfoItemWithIcon
              icon="location_on"
              text={
                `
              ${address.line1} ${address.line2} ${address.city}, ${address.state} ${address.postal}
              ` || 'No address provided'
              }
            />
            <InfoItemWithIcon
              icon="smartphone"
              text={
                this.extractPhoneNumber(phoneNumbers, 'Cell Phone') || 'Cell phone not provided'
              }
            />
            <InfoItemWithIcon
              icon="phone"
              text={
                this.extractPhoneNumber(phoneNumbers, 'Home Phone') || 'Home phone not provided'
              }
            />
            <InfoItemWithIcon
              icon="phone"
              text={
                this.extractPhoneNumber(phoneNumbers, 'Business Phone') || 'Work phone not provided'
              }
            />
          </>
        ) : (
          <>
            <EditedSectionDivider />
            <EditedMobileListTitle>Update your Email Address</EditedMobileListTitle>
            <MobileInput
              name="email"
              type="email"
              placeholder={email || 'Enter an email address'}
            />
            <MobileListTitle>Update your Address</MobileListTitle>
            <Label>Street Address</Label>
            <MobileInput name="line1" type="text" placeholder={address.line1 || 'Street Address'} />
            <EditedSpaceBetween>
              <Flex2>
                <Label>Apt #</Label>
                <MobileInput name="line2" type="text" placeholder={address.line2 || 'Apt #'} />
              </Flex2>
              <Flex2>
                <Label>City</Label>
                <MobileInput name="city" type="text" placeholder={address.city || 'City'} />
              </Flex2>
            </EditedSpaceBetween>
            <EditedSpaceBetween>
              <Flex2>
                <Label>State</Label>
                <Select name="state" placeholder={address.state || 'State'} mobile>
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
              <Flex2>
                <Label>Zip</Label>
                <MobileInput name="zip" type="text" placeholder={address.postal || 'Zip'} />
              </Flex2>
            </EditedSpaceBetween>
            <MobileListTitle>Update your Cell Phone</MobileListTitle>
            <MobileInput
              name="cellPhone"
              type="phone"
              placeholder={
                this.extractPhoneNumber(phoneNumbers, 'Cell Phone') || 'Enter a cell phone number.'
              }
            />
            <MobileListTitle>Update your Home Phone</MobileListTitle>
            <MobileInput
              name="homePhone"
              type="phone"
              placeholder={
                this.extractPhoneNumber(phoneNumbers, 'Home Phone') || 'Enter a home phone number.'
              }
            />
            <MobileListTitle>Update your Work Phone</MobileListTitle>
            <MobileInput
              name="workPhone"
              type="phone"
              placeholder={
                this.extractPhoneNumber(phoneNumbers, 'Business Phone') ||
                'Enter a work phone number.'
              }
            />
          </>
        )}
        {editing && (
          <>
            <EditedSectionDivider />
            <ButtonWrapper>
              <MobileActionButton type="action" text="Submit Changes" />
              <MobileActionButton
                type="negative"
                text="Cancel"
                onClick={this.handlers.stopEditing}
              />
            </ButtonWrapper>
          </>
        )}
      </>
    );
  }
}

MobileMemberInfo.propTypes = {
  name: PropTypes.string.isRequired,
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
  locked: PropTypes.bool
};

MobileMemberInfo.defaultProps = {
  address: undefined,
  email: undefined,
  phoneNumbers: [],
  locked: false
};

export default MobileMemberInfo;
