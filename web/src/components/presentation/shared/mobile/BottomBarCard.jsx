import React from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import defaultTheme from '../../../../style/themes';
import MobileActionButton from './MobileActionButton';
import withStoreData from '../../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { iOS } from '../../../../utils/browser';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';
import cardImg from '@evry-member-app/assets/images/vector/white_icons/card.svg';

const { fetchMembershipSummary } = actions;
const { getMembership, getToken, getClientName } = selectors;

// Bottom Search input in footer of every mobile view

const { MobileFixedBottomButton, TrimmedHeader } = defaultTheme.components;

const SvgIcon = styled.img`
  height: auto;
  filter: brightness(74%);
  cursor: pointer;
  padding: 8px;
  &:hover,
  &:focus,
  &:active {
    filter: brightness(50%);
  }
`;

const SlideUpCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
  box-sizing: border-box;

  h2 {
    font-size: 16px;
    font-weight: 300;
    width: 50%;
    margin-left: 25%;
    text-align: center;
    color: ${props => props.theme.colors.shades.tealBlue};
  }
`;

const Close = styled.i`
  height: auto;
  text-align: right;
  width: 20%;
  color: ${props => props.theme.colors.shades.tealBlue};
  cursor: pointer;
  padding: 8px;
  margin-right: 5%;
  font-size: 26px;
`;

const Card = styled.div`
  height: auto;
  width: 100%;
  max-width: 450px;
  padding-bottom: 5px;
  .react-card-flip {
    width: 100%;
  }
  .react-card-flipper {
    width: calc(100% - 48px);
    max-width: 330px;
    margin: auto;

    .react-card-back,
    .react-card-front {
      filter: blur(0px);
      transform-style: initial;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    img {
      width: 180px;
    }
  }

  .card {
    box-sizing: border-box;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    height: 479px;
    width: 100%;
    filter: blur(0px);
  }
`;

const FrontCard = styled.div`
  background: ${props => props.theme.colors.shades.blue};
`;

const BackCard = styled.div`
  background: ${props => props.theme.colors.shades.white};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: solid 2px ${props => props.theme.colors.shades.tealBlue};
`;

const FrontMemberDetails = styled.div`
  display: flex;
  width: 80%;
  margin-left: 10%;
  padding-top: 20px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${props => props.theme.colors.shades.white};
  border-top: solid 3px ${props => props.theme.colors.shades.nearlyWhite};
  .name,
  .company-name {
    font-size: 19px;
    letter-spacing: 0.5px;
    width: 100%;
    display: block;
    flex: 2 100%;
  }
  .company-name {
    font-weight: bold;
    font-size: 22px;
  }
`;

const MemberIdGroup = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  text-align: left;
  flex: 1 auto;
  .member-id-label {
    display: block;
    color: ${props => props.theme.colors.shades.mediumGray};
    margin-bottom: 3px;
    font-size: 12px;
  }
  .member-number {
    font-size: 19px;
  }
`;

const BackMemberDetails = styled.div`
  display: flex;
  width: 86%;
  margin-left: 7%;
  margin-bottom: 20px;
  padding-top: 20px;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;

  .name {
    color: ${props => props.theme.colors.shades.pinkOrange};
    font-size: 21px;
    font-weight: 400;
  }

  .date {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 400;
    color: ${props => props.theme.colors.shades.tealBlue};
  }

  .group {
    .label {
      text-transform: uppercase;
      font-size: 12px;
      margin-top: 10px;
      padding-bottom: 2px;
      margin-bottom: 3px;
      border-bottom: solid 1px ${props => props.theme.colors.shades.mediumGray};
      color: ${props => props.theme.colors.shades.gray};
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .data {
      font-weight: 400;
      font-size: 14px;
      color: ${props => props.theme.colors.shades.darkGray};
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const SupportDetails = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.shades.blue};
  border-radius: 0 0 17px 17px;
  border-top: 4px solid ${props => props.theme.colors.shades.pinkOrange};
  position: relative;
  box-sizing: border-box;
`;

const InnerSupportDetails = styled.div`
  width: auto;
  padding: 12px 6%;
  .group {
    padding: 9px 0;
    .label {
      font-size: 12px;
      text-transform: uppercase;
      color: ${props => props.theme.colors.shades.gray};
    }
    .data {
      font-size: 13px;
      color: ${props => props.theme.colors.shades.white};

      span:first-child {
        padding-right: 8px;
        margin-right: 8px;
        border-right: solid 1px ${props => props.theme.colors.shades.pinkOrange};
      }
      a {
        color: ${props => props.theme.colors.shades.white};
        text-decoration: none;
      }
    }
  }
`;

const MobileFixedBottomButtonWithBg = styled(MobileFixedBottomButton)`
  background: ${props => props.theme.colors.shades.nearlyWhite};
  box-sizing: border-box;
  margin-top: auto;
  width: 100%;
  position: relative;
  & > button {
    cursor: pointer;
    max-width: 420px;
  }
`;

const PositionedTrimmedHeader = styled(TrimmedHeader)`
  position: absolute;
  top: 0;
  left: 0;
`;

class BottomBarCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isFlipped: false
    };

    this.handlers = {
      toggleDrawer: this.toggleDrawer.bind(this),
      handleClick: this.handleClick.bind(this)
    };
  }

  toggleDrawer = open => () => {
    this.setState({ open });
  };

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    const { open, isFlipped } = this.state;
    const {
      benefits,
      benefitType,
      clientName,
      dependents,
      name,
      memberId,
      rxBin,
      rxGroup,
      rxPcn
    } = this.props;

    return (
      <>
        <SvgIcon src={cardImg} onClick={this.handlers.toggleDrawer(true)} />
        <SwipeableDrawer
          className="bottom-drawer"
          disableBackdropTransition={!iOS()}
          disableDiscovery={iOS()}
          open={open}
          anchor="bottom"
          onOpen={this.handlers.toggleDrawer(true)}
          onClose={this.handlers.toggleDrawer(false)}
        >
          <SlideUpCardWrapper>
            <PositionedTrimmedHeader className="long" />
            <Title>
              <h2>Your Member Card</h2>
              <Close
                onClick={this.handlers.toggleDrawer(false)}
                className="material-icons"
                onKeyDown={this.handlers.toggleDrawer(false)}
              >
                close
              </Close>
            </Title>
            <Card>
              <ReactCardFlip
                isFlipped={isFlipped}
                flipSpeedBackToFront={0.3}
                flipSpeedFrontToBack={0.3}
              >
                <FrontCard key="front" className="card">
                  <div className="logo">
                    <img src={logoImg} alt="logo" />
                  </div>
                  <FrontMemberDetails>
                    <span className="name">
                      {name.first}
                      <br />
                      {name.last}
                    </span>
                    <MemberIdGroup>
                      <span className="member-id-label">MEMBER ID</span>
                      <span className="member-number">{memberId}</span>
                    </MemberIdGroup>
                    <MemberIdGroup>
                      <span className="member-id-label">GROUP ID</span>
                      <span className="member-number">{rxGroup}</span>
                    </MemberIdGroup>
                    <span className="company-name">{clientName}</span>
                  </FrontMemberDetails>
                </FrontCard>
                <BackCard key="back" className="card">
                  <BackMemberDetails>
                    <div className="name">{String(name)}</div>
                    <div className="date">Effective September 1, 2019</div>
                    <div className="group">
                      <div className="label">
                        <span>Member ID</span>
                        <span>Plan</span>
                      </div>
                      <div className="data">
                        <span>{memberId}</span>
                        <span>PREMIER {benefitType}</span>
                      </div>
                    </div>
                    <div className="group">
                      <div className="label">Dependents</div>
                      <div className="data">{dependents.map(String).join(', ')}</div>
                    </div>
                    <div className="group">
                      <div className="label">Member Costs</div>
                      {benefits.map(({ name: benefitName, coverage }) => (
                        <div className="data" key={uuidv4()}>
                          {benefitName} {coverage}
                        </div>
                      ))}
                    </div>
                    <div className="group">
                      <div className="label">Pharmacy</div>
                      <div className="data">
                        <span>BIN {rxBin}</span>
                        <span>PCN {rxPcn}</span>
                      </div>
                    </div>
                  </BackMemberDetails>
                  <SupportDetails>
                    <InnerSupportDetails>
                      <div className="group">
                        <div className="label">Customer Service</div>
                        <div className="data">
                          <span>1-800-577-1045</span>
                          <span>
                            <a href="mailto:support@evryhealth.com">support@evryhealth.com</a>
                          </span>
                        </div>
                      </div>
                      <div className="group">
                        <div className="label">Submit Claims To</div>
                        <div className="data">
                          PAYER ID (ELECTRONIC SUBMISSION) EH001
                          <br />
                          FAX (972) 807-0596
                          <br />
                          Evry Health, PO Box 192527, Dallas, TX 75219
                        </div>
                      </div>
                    </InnerSupportDetails>
                  </SupportDetails>
                </BackCard>
              </ReactCardFlip>
            </Card>
            <MobileFixedBottomButtonWithBg>
              <MobileActionButton onClick={this.handlers.handleClick} type="action" text="FLIP" />
            </MobileFixedBottomButtonWithBg>
          </SlideUpCardWrapper>
        </SwipeableDrawer>
      </>
    );
  }
}

BottomBarCard.propTypes = {
  benefitType: PropTypes.string,
  benefits: PropTypes.arrayOf(PropTypes.shape({})),
  clientName: PropTypes.string,
  dependents: PropTypes.arrayOf(PropTypes.shape({})),
  memberId: PropTypes.string,
  name: PropTypes.shape({}),
  rxBin: PropTypes.string,
  rxGroup: PropTypes.string,
  rxPcn: PropTypes.string
};

BottomBarCard.defaultProps = {
  benefitType: '',
  benefits: [],
  clientName: '',
  dependents: [],
  memberId: '',
  name: { toString: () => '' },
  rxBin: '',
  rxGroup: '',
  rxPcn: ''
};

export default withStoreData(
  BottomBarCard,
  state => ({
    token: getToken(state),
    clientName: getClientName(state),
    membershipSummary: getMembership(state)
  }),
  dispatch => ({
    fetchMembership: token => dispatch(fetchMembershipSummary(token))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    fetch: () => dispatchProps.fetchMembership(stateProps.token),
    shouldFetch: Object.keys(stateProps.membershipSummary).reduce(
      (prev, key) =>
        prev ||
        stateProps.membershipSummary[key] == null ||
        stateProps.membershipSummary[key] === false,
      false
    ),
    ...stateProps.membershipSummary,
    clientName: stateProps.clientName,
    ...ownProps
  })
);
