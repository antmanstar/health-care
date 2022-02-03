/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SmallButton from '../../shared/desktop/SmallButton';
import Loader from '../../shared/Loader/Loader';
import actions from '@evry-member-app/shared/store/actions';

const { showModal } = actions;

// DESKTOP: My Membership Section for Document Center View

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

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
`;

const Title = styled.h4`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 500;
`;

const Info = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 20px;

  @media ${props => props.theme.device.desktop} {
    margin-bottom: 0;
  }
`;

const LabeledNumbers = styled.div`
  display: flex;
  font-size: 16px;
  margin-right: 32px;

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

  h4 {
    font-weight: 400;
  }
`;

const Numbers = styled.div`
  font-weight: 300;
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
      handleReplaceCardClick: this.handleReplaceCardClick.bind(this)
    };
  }

  handleReplaceCardClick() {
    this.props.showModal('REQUEST_NEW_MEMBERSHIP_CARD');
  }

  render() {
    const {
      benefitType,
      familyMembers,
      documents: membershipDocs,
      name,
      memberId,
      rxBin,
      rxPcn
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
            />
            <SmallButton
              text="Replace Membership Card"
              onClick={this.handlers.handleReplaceCardClick}
            />
          </SpaceBetween>
        </Container>
        <SectionDivider />
        <Container>
          {/* <Row>
            <InfoSection>
              <Title>Membership Documents</Title>
              <SectionDivider />
              {!membershipDocs ? (
                <Loader />
              ) : (
                <Info>
                  <MemberDocs>
                    {membershipDocs
                      .map(doc => <a href={doc.fileName}>{doc.displayName}</a>)
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
            <InfoSection>
              <Title>Pharmacy Information</Title>
              <SectionDivider />
              {!rxBin && !rxPcn ? (
                <Loader />
              ) : (
                <Info>
                  <LabeledNumbers>
                    <Labels>
                      <h4>BIN</h4>
                    </Labels>
                    <Numbers>
                      <p>{rxBin}</p>
                    </Numbers>
                  </LabeledNumbers>
                  <LabeledNumbers>
                    <Labels>
                      <h4>PCN</h4>
                    </Labels>
                    <Numbers>
                      <p>{rxPcn}</p>
                    </Numbers>
                  </LabeledNumbers>
                </Info>
              )}
            </InfoSection>
          </Row>
          <InfoSection>
            <Title>Family Members</Title>
            <SectionDivider />
            {!familyMembers ? (
              <Loader />
            ) : (
              <Info>
                <Dependents>{familyMembers.map(String).join(', ')}</Dependents>
              </Info>
            )}
          </InfoSection> */}
          <Row>
            <InfoSection>
              <Title>Doctor & Pharmacy</Title>
              <SectionDivider />
              <Info>
                <Dependents></Dependents>
              </Info>
            </InfoSection>
            <InfoSection>
              <Title>Costs</Title>
              <SectionDivider />
              <Info>
                <Dependents></Dependents>
              </Info>
            </InfoSection>
          </Row>
          <Row>
            <InfoSection>
              <Title>Dependents</Title>
              <SectionDivider />
              <Info>
                <Dependents></Dependents>
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
                      .map(doc => <a href={doc.fileName}>{doc.displayName}</a>)
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

const mapDispatchToProps = dispatch => ({
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MyMembershipSection);
