import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';
import truncate from '../../../../utils/string';
import selectors from '@evry-member-app/shared/store/selectors';
import actions from '@evry-member-app/shared/store/actions';
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';

const { getSupportPhoneNumber, getToken, getAppointRepFormUploadCase } = selectors;
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

const {
  createAppointedRepFormUploadCase,
  appointedRepFormUpload,
  completeAppointedRepFormUploadCase,
  appointedRepFormUploadReset,
  setModalData,
  showModal,
  fetchFiles
} = actions;

const SqaushedSpaceBetween = styled(SpaceBetween)`
  margin: 32px 0 -8px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media ${props => props.theme.device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
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
  /* flex-grow: 1;
  max-width: 50%; */
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
const FileFormats = styled.div`

  & span {
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;
const ValidationMessages = styled.div`
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: right;
  align-items: stretch;
  gap: 10px;

  @media ${defaultTheme.device.tablet} {
    flex-direction: row;
  }

  & div{
    width: 100%;
    @media ${defaultTheme.device.tablet} {
      width: calc(50% - 6px);
    }
  }
`;

const StyledSelect = styled(Select)`
  /* flex-grow: 1;
  width:50%; */
`;

class UploadDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentType: '',
      file: 'Choose a File',
      files: [],
      isSubmitting: false,
      validationMessages: null
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    if (event.target.type === 'file') {
      stateObject['files'] = event.target.files;
    }
    this.setState(stateObject);
  }

  handleSubmit() {
    console.log(this.state.file);
    console.log(this.state.files);
    let messages = [];
    if (this.state.files.length === 0) {
      messages.push('*A file is required.');
      console.log(messages);
    }
    if (!this.state.documentType || this.state.documentType.length === 0) {
      messages.push('*Document Type is required.');
      console.log(messages);
    }
    if (messages.length > 0) {
      this.setState({ validationMessages: messages });
      return;
    }
    this.setState({ isSubmitting: true });
    this.props.createCase(this.props.token);
  }

  componentDidMount() {
    this.props.resetCaseState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.appointRepFormUploadCase &&
      prevProps.appointRepFormUploadCase.status === null &&
      this.props.appointRepFormUploadCase.status === 'OPEN'
    ) {
      this.props.uploadFiles(
        this.props.appointRepFormUploadCase.id,
        this.state.files,
        this.props.token
      );
    } else if (
      prevProps.appointRepFormUploadCase &&
      prevProps.appointRepFormUploadCase.status === 'OPEN' &&
      this.props.appointRepFormUploadCase.status === 'UPLOADED'
    ) {
      this.props.completeCase(this.props.appointRepFormUploadCase.id, this.props.token);
    } else if (
      prevProps.appointRepFormUploadCase &&
      prevProps.appointRepFormUploadCase.status === 'UPLOADED' &&
      this.props.appointRepFormUploadCase.status === 'COMPLETE'
    ) {
      this.props.setModalData({
        type: 'SUCCESS',
        title: 'Submitted!',
        message: "Great! We'll get to work on that and send you a confirmation once complete."
      });
      this.setState({ isSubmitting: false });
      this.props.fetchFiles(this.props.token);

      this.props.showModal('SUBMISSION_RESPONSE');
    } else if (
      prevProps.appointRepFormUploadCase &&
      (prevProps.appointRepFormUploadCase.status === 'UPLOADED' ||
        prevProps.appointRepFormUploadCase.status === 'OPEN') &&
      this.props.appointRepFormUploadCase.status.includes('ERROR')
    ) {
      this.props.setModalData({
        type: 'ERROR',
        title: 'Error',
        message: 'Something went wrong. Please try again or give us a call!'
      });
      this.setState({ isSubmitting: false });
      this.props.showModal('SUBMISSION_RESPONSE');
    }
  }

  render() {
    const { documentType, file, isSubmitting, validationMessages } = this.state;
    const { phoneNumber, hideModal } = this.props;
    console.log(validationMessages);
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
            {/* <SqaushedSpaceBetween>
              <ModalHalfColumn>
                <Select
                  name="documentType"
                  placeholder="Select your document type"
                  icon="arrow"
                  value={documentType}
                  onChange={this.handlers.handleChange}
                >
                  <option>Appointed Representative Form</option>
                </Select>
              </ModalHalfColumn>
              <ModalHalfColumn>
                <FilePicker>
                  <input
                    name="file"
                    id="file"
                    type="file"
                    onChange={this.handlers.handleChange}
                    accept="image/gif, image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <label htmlFor="file">
                    <i className="material-icons">attachment</i>
                    {truncate(30)(file.split('\\').pop())}
                  </label>
                </FilePicker>
                <FileFormats>
                  <span>*</span>Acceptable file formats include: jpg, jpeg, gif, png, pdf, doc,
                  docx.
                </FileFormats>
              </ModalHalfColumn>
            </SqaushedSpaceBetween> */}
            <InputContainer>
              <StyledSelect
                name="documentType"
                placeholder="Select your document type"
                icon="arrow"
                value={documentType}
                onChange={this.handlers.handleChange}
              >
                <option>Appointed Representative Form</option>
              </StyledSelect>
              <FilePicker>
                <input
                  name="file"
                  id="file"
                  type="file"
                  onChange={this.handlers.handleChange}
                  accept="image/gif, image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <label htmlFor="file">
                  <i className="material-icons">attachment</i>
                  {truncate(30)(file.split('\\').pop())}
                </label>
              </FilePicker>
              <FileFormats>
                  <span>*</span>Acceptable file formats include: jpg, jpeg, gif, png, pdf, doc,
                  docx.
                </FileFormats>
            </InputContainer>
            {validationMessages &&
              validationMessages.length > 0 &&
              validationMessages.map(message => <ValidationMessages>{message}</ValidationMessages>)}
          </ModalBody>
          <ModalSectionDivider />
          <ModalButtonsRight>
            <SmallButton
              text="Submit Request"
              onClick={this.handlers.handleSubmit}
              disabled={isSubmitting}
            />
            <SmallButton text="Cancel" negative onClick={hideModal} disabled={isSubmitting} />
          </ModalButtonsRight>
          {isSubmitting && <LoadingSpinnerScreen />}
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
  phoneNumber: getSupportPhoneNumber(state),
  token: getToken(state),
  appointRepFormUploadCase: getAppointRepFormUploadCase(state)
});
const mapDispatchToProps = dispatch => ({
  createCase: token => dispatch(createAppointedRepFormUploadCase({ token })),
  uploadFiles: (caseID, files, token) => dispatch(appointedRepFormUpload({ caseID, files, token })),
  resetCaseState: () => dispatch(appointedRepFormUploadReset()),
  completeCase: (caseID, token) => dispatch(completeAppointedRepFormUploadCase({ caseID, token })),
  setModalData: modalData => dispatch(setModalData(modalData)),
  showModal: modal => dispatch(showModal(modal)),
  fetchFiles: token => dispatch(fetchFiles({ categories: [], token }))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocumentModal);
