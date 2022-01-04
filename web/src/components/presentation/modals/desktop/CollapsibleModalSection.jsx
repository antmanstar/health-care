import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// MODAL - Medicare Modal Section

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.colors.shades.blue};

  p {
    margin: 0;
  }

  &.light {
    font-weight: 300;
  }
`;

const Toggles = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleWrapper = styled.button`
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-weight: 300;
  background: ${props => props.theme.colors.shades.white};
  color: ${props => props.theme.colors.shades.darkGray};
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`;

const CircleOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  margin-right: 8px;
  border: 1px solid ${props => props.theme.colors.shades.mediumGray};
  border-radius: 50%;

  div {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${props =>
      props.checked ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.white};
  }

  ${ToggleWrapper}:hover & {
    border: 1px solid ${props => props.theme.colors.shades.darkGray};
  }
`;

const CollapsibleSectionBody = styled.div`
  padding: 16px 0;
`;

class CollapsibleModalSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handlers = {
      toggleOn: this.handleToggleOn.bind(this),
      toggleOff: this.handleToggleOff.bind(this)
    };
  }

  handleToggleOn() {
    this.setState(prevState => ({
      visible: true
    }));
  }

  handleToggleOff() {
    this.setState(prevState => ({
      visible: false
    }));
  }

  render() {
    const { visible } = this.state;
    const { title, textClass, children } = this.props;
    return (
      <>
        <Container className={textClass}>
          <p>{title}</p>
          <Toggles>
            <ToggleWrapper onClick={this.handlers.toggleOn} type="button">
              <CircleOuter checked={visible}>
                <div />
              </CircleOuter>
              <p>Yes</p>
            </ToggleWrapper>
            <ToggleWrapper onClick={this.handlers.toggleOff} type="button">
              <CircleOuter checked={!visible}>
                <div />
              </CircleOuter>
              <p>No</p>
            </ToggleWrapper>
          </Toggles>
        </Container>
        {visible && <CollapsibleSectionBody>{children}</CollapsibleSectionBody>}
      </>
    );
  }
}

CollapsibleModalSection.propTypes = {
  title: PropTypes.string.isRequired,
  textClass: PropTypes.string,
  children: PropTypes.node
};

CollapsibleModalSection.defaultProps = {
  textClass: '',
  children: 'There is nothing here. Something should be here.'
};

export default CollapsibleModalSection;
