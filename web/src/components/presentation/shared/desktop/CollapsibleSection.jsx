import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';

// Title and toggle button with a collapsible body (Children are collapsed contents)

const { SpaceBetween } = defaultTheme.components;

const Wrapper = styled.section`
  display: block;
`;

const TitleWrapper = styled(SpaceBetween)`
  margin-bottom: ${props => (props.visible ? '16px' : '0')};

  @media ${props => props.theme.device.tablet} {
    margin-bottom: ${props => (props.visible ? '32px' : '0')};
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 15px;
  font-weight: 300;
  margin-right: 15px;
  // max-width: 186px;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.tablet} {
    font-size: 24px;
  }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.gray};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.shades.darkGray};
  }

  i {
    margin-left: 8px;
  }

  p {
    display: none;
    margin: 0;
    font-size: 12px;
  }

  @media ${props => props.theme.device.tablet} {
    p {
      display: block;
    }
  }
`;

const CollapsibleSectionBody = styled.div`
  margin-top: 16px;
`;

const Column = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${props => props.theme.device.tablet} {
    width: 50%;
  }
`;

const ChildrenToggle = styled.div`
  color: ${props => props.theme.colors.shades.mediumGray};
`;

const ToggleButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props =>
    props.active ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.mediumGray};

  &:hover {
    color: ${props =>
      props.active ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.gray};
  }
`;

class CollapsibleSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible || false
    };

    this.handlers = {
      toggleClick: this.handleCollapseToggleClick.bind(this)
    };
  }

  handleCollapseToggleClick() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }

  render() {
    const { visible } = this.state;
    const { title, children, canToggleChildren, active, handleChildrenToggleClick } = this.props;
    return (
      <Wrapper>
        <TitleWrapper visible={visible}>
          <Title>{title}</Title>
          {canToggleChildren && visible ? (
            <Column>
              <ChildrenToggle>
                <ToggleButton
                  type="button"
                  active={active}
                  onClick={() => handleChildrenToggleClick(true)}
                >
                  In-Network
                </ToggleButton>
                {` | `}
                <ToggleButton
                  type="button"
                  active={!active}
                  onClick={() => handleChildrenToggleClick(false)}
                >
                  Out-Of-Network
                </ToggleButton>
              </ChildrenToggle>
              <Toggle onClick={this.handlers.toggleClick}>
                <p>{visible ? 'Collapse' : 'Expand'}</p>
                {visible ? (
                  <i className="material-icons">keyboard_arrow_down</i>
                ) : (
                  <i className="material-icons">keyboard_arrow_left</i>
                )}
              </Toggle>
            </Column>
          ) : (
            <Toggle onClick={this.handlers.toggleClick}>
              <p>{visible ? 'Collapse' : 'Expand'}</p>
              {visible ? (
                <i className="material-icons">keyboard_arrow_down</i>
              ) : (
                <i className="material-icons">keyboard_arrow_left</i>
              )}
            </Toggle>
          )}
        </TitleWrapper>
        {visible && <CollapsibleSectionBody>{children}</CollapsibleSectionBody>}
      </Wrapper>
    );
  }
}

CollapsibleSection.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  canToggleChildren: PropTypes.bool,
  active: PropTypes.bool,
  handleChildrenToggleClick: PropTypes.func,
  // TODO: May need to be more specific in the future.
  children: PropTypes.node
};

CollapsibleSection.defaultProps = {
  visible: false,
  canToggleChildren: false,
  active: false,
  handleChildrenToggleClick: null,
  children: 'There is nothing here. Something should be here.'
};

export default CollapsibleSection;
