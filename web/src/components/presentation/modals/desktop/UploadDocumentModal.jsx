import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';
import truncate from '../../../../utils/string';
import selectors from '@evry-member-app/shared/store/selectors';

const { getSupportPhoneNumber } = selectors;

// MODAL - Upload a Document

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHalfColumn,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper,
  SpaceBetween
} = defaultTheme.components;

const SqaushedSpaceBetween = styled(SpaceBetween)`
  margin: 32px 0 -8px;
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.shades.blue};

  p {
    margin: 0 0 0 8px;
    font-weight: 400;
  }
`;

const FilePicker = styled.div`
  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    white-space: nowrap;
    clip: rect(0, 0, 0, 0);
  }

  label {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    margin-bottom: 8px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 400;
    background: ${props => props.theme.colors.shades.nearlyWhite};
    color: ${props => props.theme.colors.shades.blue};
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      border-color: ${props => props.theme.colors.shades.mediumGray};
    }

    i {
      margin-right: 16px;
    }
  }

  input:focus + label {
    border-color: ${props => props.theme.colors.shades.darkGray};
  }
`;

class UploadDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentType: '',
      file: 'Choose a File'
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  render() {
    const { documentType, file } = this.state;
    const { phoneNumber, hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper>
          <ModalHeader>
            <SpaceBetween>
              <ModalTitle>Upload a Document</ModalTitle>
              {phoneNumber && (
                <PhoneNumber>
                  <i className="material-icons">phone</i>
                  <p>{`1-${phoneNumber}`}</p>
                </PhoneNumber>
              )}
            </SpaceBetween>
          </ModalHeader>
          <ModalBody>
            <p>
              Choose from the list of document types and upload your file. We’ll take it from there!
            </p>
            <SqaushedSpaceBetween>
              <ModalHalfColumn>
                <Select
                  name="documentType"
                  placeholder="Select your document type"
                  icon="arrow"
                  value={documentType}
                  onChange={this.handlers.handleChange}
                >
                  <option>Appointed Representative Form</option>
                  <option>Complaint Form</option>
                </Select>
              </ModalHalfColumn>
              <ModalHalfColumn>
                <FilePicker>
                  <input name="file" id="file" type="file" onChange={this.handlers.handleChange} />
                  <label htmlFor="file">
                    <i className="material-icons">attachment</i>
                    {truncate(30)(file)}
                  </label>
                </FilePicker>
              </ModalHalfColumn>
            </SqaushedSpaceBetween>
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton text="Submit Request" />
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsRight>
        </ModalWrapper>
      </>
    );
  }
}

UploadDocumentModal.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  phoneNumber: getSupportPhoneNumber(state)
});

export default connect(mapStateToProps)(UploadDocumentModal);
