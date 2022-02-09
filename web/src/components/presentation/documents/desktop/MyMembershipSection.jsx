/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SmallButton from '../../shared/desktop/SmallButton';
import Loader from '../../shared/Loader/LoadingSpinnerScreen';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { showModal, fetchFileContent } = actions;
const { getToken, getMembershipLoadingStatus } = selectors;
// DESKTOP: My Membership Section for Document Center View

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;

  @media ${props => props.theme.device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }

  @media ${props => props.theme.device.desktop} {
    margin-bottom: 24px;

    & > * {
      flex: 0 0 48%;
    }

    &:last-child {
      margin-bottom: 8px;
    }
  }
`;

const InfoSection = styled.div`
  width: 100%;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.tablet} {
    width: 50%;
  }
`;

const Title = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 20px;
  gap: 10px;

  @media ${props => props.theme.device.desktop} {
    margin-bottom: 0;
  }
`;

const LabeledNumbers = styled.div`
  display: flex;
  width: 100%;
  min-width: 170px;
  font-size: 10px;
  margin-bottom: 5px;

  @media ${props => props.theme.device.mobile} {
    font-size: 16px;
  }

  &.half-width {
    width: 48%;
  }

  h4,
  p {
    margin: 0;
    line-height: 1em;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Labels = styled.div`
  margin-right: 8px;
  width: 75%;
  @media (min-width: 500px) {
    width: 55%;
  }
  @media ${props => props.theme.device.tablet} {
    width: 75%;
  }
  @media ${props => props.theme.device.tabletXL} {
    width: 55%;
  }

  &.half-width {
    width: 30%;
  }

  h4 {
    font-weight: 400;
  }
`;

const Numbers = styled.div`
  font-weight: 300;
  text-align: left;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const Dependents = styled.p`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const MemberDocs = styled.div`
  display: flex;
  margin: 0;

  div {
    margin-right: 32px;

    a {
      display: block;
      color: ${props => props.theme.colors.shades.pinkOrange};
      line-height: 24px;
      cursor: pointer;
      font-weight: 300;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

class MyMembershipSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handlers = {
      handleReplaceCardClick: this.handleReplaceCardClick.bind(this),
      handleMembershipDocumentsClick: this.handleMembershipDocumentsClick.bind(this)
    };
  }

  handleReplaceCardClick() {
    this.props.showModal('REQUEST_NEW_MEMBERSHIP_CARD');
  }
  handleMembershipDocumentsClick(event) {
    console.log('handleMembershipDocumentsClick');
    console.log(event.target);
    //this.props.fetchFileContent(event.target.value, this.props.token)
  }

  render() {
    const {
      benefitType,
      familyMembers,
      documents: membershipDocs,
      name,
      memberId,
      rxBin,
      rxPcn,
      payerId,
      rxId,
      rxGroup,
      benefits,
      isLoading
    } = this.props;
    return (
      <SectionBackground>
        <Container>
          <SpaceBetween>
            <SectionHeaderWithIcon
              icon="member-card"
              title="My Membership"
              subTitle={`${name}  |  ${memberId} - Premier ${benefitType}`}
              svgIcon
              noCollaspe={true}
            />
            <SmallButton text="Replace Card" onClick={this.handlers.handleReplaceCardClick} />
          </SpaceBetween>
        </Container>
        <SectionDivider />
        <Container>
          <Row>
            <InfoSection>
              <Title>Doctor & Pharmacy</Title>
              <SectionDivider />
              <Info>
                <LabeledNumbers className="half-width">
                  <Labels className="half-width">
                    <h4>RXID:</h4>
                  </Labels>
                  <Numbers>{rxId}</Numbers>
                </LabeledNumbers>
                <LabeledNumbers className="half-width">
                  <Labels className="half-width">
                    <h4>RXBIN:</h4>
                  </Labels>
                  <Numbers>{rxBin}</Numbers>
                </LabeledNumbers>
                <LabeledNumbers className="half-width">
                  <Labels className="half-width">
                    <h4>RXPCN:</h4>
                  </Labels>
                  <Numbers>{rxPcn}</Numbers>
                </LabeledNumbers>
                <LabeledNumbers className="half-width">
                  <Labels className="half-width">
                    <h4>RXGRP:</h4>
                  </Labels>
                  <Numbers>{rxGroup}</Numbers>
                </LabeledNumbers>
                <LabeledNumbers className="half-width">
                  <Labels className="half-width">
                    <h4>PAYER ID:</h4>
                  </Labels>
                  <Numbers>{payerId}</Numbers>
                </LabeledNumbers>
                <LabeledNumbers className="half-width">
                  <Labels className="half-width">
                    <h4>TYPE:</h4>
                  </Labels>
                  <Numbers>{benefitType}</Numbers>
                </LabeledNumbers>
              </Info>
            </InfoSection>
            <InfoSection>
              <Title>Costs</Title>
              <SectionDivider />
              <Info>
                {benefits.map(benefit => (
                  <LabeledNumbers key={benefit.name}>
                    <Labels>
                      <h4>{benefit.name}:</h4>
                    </Labels>
                    <Numbers>{benefit.coverage}</Numbers>
                  </LabeledNumbers>
                ))}
              </Info>
            </InfoSection>
          </Row>
          <Row>
            <InfoSection>
              <Title>Dependents</Title>
              <SectionDivider />
              <Info>
                {familyMembers.map((member, index) => {
                  if (member.relationship.toUpperCase() === 'SELF') return;
                  return (
                    <Dependents>{`${member.first} ${member.last}${
                      index + 1 === familyMembers.length ? '' : ', '
                    }`}</Dependents>
                  );
                })}
              </Info>
            </InfoSection>
            <InfoSection>
              <Title>Membership Documents</Title>
              <SectionDivider />
              {!membershipDocs ? (
                <Loader />
              ) : (
                <Info>
                  <MemberDocs>
                    {membershipDocs
                      .map(doc => (
                        <a onClick={this.handleMembershipDocumentsClick} value={doc.file_id}>
                          {doc.display_name}
                        </a>
                      ))
                      .reduce((prev, docLink, i) => {
                        const curr = prev.slice();
                        if (i % 2) {
                          curr[curr.length - 1] = curr[curr.length - 1].concat([docLink]);
                        } else {
                          curr.push([docLink]);
                        }
                        return curr;
                      }, [])
                      .map(row => (
                        <div>{row}</div>
                      ))}
                  </MemberDocs>
                </Info>
              )}
            </InfoSection>
          </Row>
        </Container>
        {isLoading && <Loader />}
      </SectionBackground>
    );
  }
}

MyMembershipSection.propTypes = {
  benefitType: PropTypes.string,
  familyMembers: PropTypes.arrayOf(PropTypes.shape({})),
  documents: PropTypes.arrayOf(PropTypes.shape({})),
  memberId: PropTypes.string,
  name: PropTypes.shape({}),
  rxBin: PropTypes.string,
  rxPcn: PropTypes.string,
  showModal: PropTypes.func.isRequired
};

MyMembershipSection.defaultProps = {
  benefitType: '',
  familyMembers: [],
  documents: [],
  memberId: '',
  name: { toString: () => '' },
  rxBin: '',
  rxPcn: ''
};

const mapStateToProps = state => ({
  token: getToken(state),
  isLoading: getMembershipLoadingStatus(state)
});

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    dispatch(showModal(modal));
  },
  fetchFileContent: (fileId, token) => {
    dispatch(fetchFileContent(file.file_id, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyMembershipSection);
