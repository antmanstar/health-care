import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import InboxSearchBar from './InboxSearchBar';
import Inbox from './Inbox';

// Mobile inbox modal

const { MobileContentWrapper, TrimmedHeader } = defaultTheme.components;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  position: relative;
  background-color: ${props => props.theme.colors.shades.nearlyWhite};
`;

const Title = styled.div`
  padding-top: 8px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;

  h2 {
    font-size: 16px;
    font-weight: 300;
    width: 50%;
    margin-left: 25%;
    text-align: center;
    color: ${props => props.theme.colors.shades.white};
  }
`;

const Close = styled.i`
  height: auto;
  text-align: right;
  color: ${props => props.theme.colors.shades.white};
  cursor: pointer;
  padding: 8px;
  margin-right: 16px;
  font-size: 26px;
`;

const ColoredTrimmedHeader = styled(TrimmedHeader)`
  position: absolute;
  top: 0;
  left: 0;
  background: ${props => props.theme.gradients.main};
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const InboxWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 125px;
  padding-bottom: 24px;
  z-index: 1;
  height: calc(100% - 125px - 24px);
  background: ${props => props.theme.colors.shades.nearlyWhite};
  overflow-y: auto;
`;

class InboxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onClick } = this.props;
    return (
      <Wrapper>
        <FixedHeader>
          <ColoredTrimmedHeader />
          <Title>
            <h2>Notification Center</h2>
            <Close onClick={onClick} className="material-icons" onKeyDown={onClick}>
              close
            </Close>
          </Title>
          <MobileContentWrapper>
            <InboxSearchBar />
          </MobileContentWrapper>
        </FixedHeader>
        <InboxWrapper>
          <MobileContentWrapper>
            <Inbox filters={['date', 'gender', 'distance']} />
          </MobileContentWrapper>
        </InboxWrapper>
      </Wrapper>
    );
  }
}

InboxModal.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default InboxModal;
