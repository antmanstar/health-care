/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import apis from '@evry-member-app/shared/interfaces/apis/evry/index';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';
import selectors from '@evry-member-app/shared/store/selectors';
import ErrorMessage from '../../shared/desktop/ErrorMessage';

const { showModal } = actions;

// MODAL - Appoint A Representative

const {
  FormLabel,
  Scrim,
  ModalBody,
  ModalButtonsCenter,
  ModalHeader,
  ModalSectionDivider,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

const Flex = styled.div`
  display: flex;
  margin-bottom: 24px;

  &.no-margin {
    margin-bottom: 0;
  }
`;

const Instruction = styled.p`
  margin: 0;
  line-height: 20px;

  a {
    color: ${props => props.theme.colors.shades.pinkOrange};
    margin: 0 0 0 4px;

    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;

const InstructionFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
`;

const InstructionNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  font-size: 14px;
  font-weight: 500;
  background: ${props => props.theme.colors.shades.blue};
  color: ${props => props.theme.colors.shades.white};
  border-radius: 50%;
`;

const Spacer = styled.div`
  width: 56px;
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

class AppointARepresentativeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: false,
      errors: []
    };
  }

  handleErrors = response => {
    this.setState({ showLoader: false, errors: response.response.data.messages });
  }

  handleUploadFileClick = () => {
    this.props.showModal('UPLOAD_DOCUMENT');
  }

  handleDownloadFile = response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Appoint a Representative Form.pdf');
    document.body.appendChild(link);
    link.click();
  }

  handleFileIDDownload = response => {
    let id = response?.data?.data[0]?.file_id;

    apis.fetchFileContent({
      token: this.props.token,
      id: id
    }).then(this.handleDownloadFile).catch(this.handleErrors);
  }

  handleFormDownload = () => {
    apis.fetchForms({
      token: this.props.token,
      category: 101,
      formType: 1
    }).then(this.handleFileIDDownload).catch(this.handleErrors);
  }

  render() {
    const { hideModal, locked } = this.props;
    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="narrow">
          <ModalHeader>
            <ModalTitle>Appointed Representative</ModalTitle>
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
              <>
                <p>
                  This is an individual to act as your representative in connection with all claims.
                  They will be authorized to make any request; to present or to elicit evidence; to
                  obtain appeals information; and to receive any notice in connection with a claim,
                  appeal, grievance or request wholly in your stead.
                </p>
                <FormLabel>How to Appoint a Representative</FormLabel>
                <p>
                  Appointing a representative is very easy. Just follow these simple instructions
                  and we’ll take care of the rest.
                </p>
                <ModalSectionDivider />
                <Flex>
                  <InstructionFlexColumn>
                    <InstructionNumber>1</InstructionNumber>
                  </InstructionFlexColumn>
                  <Instruction>
                    Download
                    {/* TODO: Need a download link here */}
                    <a href="#" onClick={this.handleFormDownload}>this form</a>
                    {`.`}
                  </Instruction>
                </Flex>
                <Flex>
                  <InstructionFlexColumn>
                    <InstructionNumber>2</InstructionNumber>
                  </InstructionFlexColumn>
                  <Instruction>
                    Complete the form. Both you and your representative need to sign the form.
                  </Instruction>
                </Flex>
                <Flex className="no-margin">
                  <InstructionFlexColumn>
                    <InstructionNumber>3</InstructionNumber>
                  </InstructionFlexColumn>
                  <Instruction>
                    Upload the form, which will be submitted to your care coordinator for review.
                  </Instruction>
                </Flex>
                <br />
                <Flex className="no-margin">
                  <Spacer />
                  <SmallButton text="Upload Form" onClick={this.handleUploadFileClick} />
                </Flex>
              </>
            )}
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsCenter>
            <SmallButton text="Cancel" negative onClick={hideModal} />
          </ModalButtonsCenter>
          {this.state?.errors?.length > 0 && <ErrorMessage message={this.state.errors} />}
          {this.state.showLoader && <LoadingSpinnerScreen />}
        </ModalWrapper>
      </>
    );
  }
}

AppointARepresentativeModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  locked: PropTypes.bool
};

AppointARepresentativeModal.defaultProps = {
  locked: false
};

const mapStateToProps = state => ({
  token: selectors.getToken(state)
});

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointARepresentativeModal);
