import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import Select from '../../shared/desktop/Select';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
// MODAL - Request Information

const {
  Scrim,
  ModalBody,
  ModalButtonsRight,
  ModalHeader,
  ModalSectionDivider,
  ModalTextArea,
  ModalTitle,
  ModalWrapper
} = defaultTheme.components;

const {
  requestInformationReset,
  completeRequestInformationCase,
  createRequestInformationCase
} = actions;

const { getToken, getSendMessageCase } = selectors;

const FormError = styled.div`
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

class RequestInformationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      errorMesages: null
    };

    this.handlers = {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this)
    };
  }

  handleChange(event) {
    const stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { type, message } = event.target.elements;

    let errors = [];
    if (type.value.trim().length === 0) {
      errors.push('*You must select a type of information.');
    }
    if (message.value.trim().length === 0) {
      errors.push('*Message cannot be blank.');
    }

    if (errors.length > 0) {
      this.setState({ errorMesages: errors });
      return;
    }

    this.props.hideModal();
  }
  render() {
    const { type, message } = this.state;
    const { hideModal } = this.props;

    return (
      <>
        <Scrim onClick={hideModal} />
        <ModalWrapper className="extra-narrow">
          <ModalHeader>
            <ModalTitle>Request Information.</ModalTitle>
          </ModalHeader>
          <form onSubmit={this.handlers.handleSubmit}>
            <ModalBody>
              <Select
                name="type"
                placeholder="Information Type"
                value={type}
                onChange={this.handlers.handleChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </Select>
              <ModalTextArea
                name="message"
                type="text"
                placeholder="Type a message here."
                value={message}
                onChange={this.handlers.handleChange}
              />
              {this.state.errorMesages &&
                this.state.errorMesages.map(message => <FormError>{message}</FormError>)}
            </ModalBody>
            <ModalSectionDivider />
            <ModalButtonsRight>
              <SmallButton type="submit" text="Submit Request" />
              <SmallButton text="Cancel" negative onClick={hideModal} />
            </ModalButtonsRight>
          </form>
        </ModalWrapper>
      </>
    );
  }
}

RequestInformationModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    token: getToken(state),
    sendMessageCase: getSendMessageCase(state)
  };
};

const mapDispatchToProps = dispatch => ({
  createCase: (event, token) => {},
  resetCase: () => {
    dispatch(requestInformationReset());
  },
  completeCase: (caseID, token) => {
    dispatch(completeRequestInformationCase({ caseID, token }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestInformationModal);
