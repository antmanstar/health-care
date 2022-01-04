import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import defaultTheme from '../../../style/themes';
import { Mobile } from '../../layouts';
import MobileActionButton from '../../presentation/shared/mobile/MobileActionButton';
import FilterOverlay from '../../presentation/shared/mobile/FilterOverlay';
import MobileDials from '../../presentation/shared/mobile/MobileDials';
import MobileSectionHeader from '../../presentation/shared/mobile/MobileSectionHeader';
import ClaimsSummarySection from '../../presentation/shared/mobile/ClaimsSummarySection';
import MobileMedicalServicesSection from '../../presentation/coverage/mobile/MobileMedicalServicesSection';
import Interpolation from '../../../utils/Interpolation';
import withStoreData from '../../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const {
  closeMobileFilters,
  fetchBenefitCoverages,
  fetchAccumulators,
  fetchMembershipSummary
} = actions;
const {
  getAccumulators,
  getBenefitCoverages,
  getBenefitType,
  getMemberId,
  getMemberName,
  getMembership,
  getMobileFilterStatus,
  getToken
} = selectors;

// MOBILE: Coverage View

const {
  MobileContentWrapper,
  MobileModalListTitle,
  MobileFixedBottomButton
} = defaultTheme.components;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 4px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  padding-top: 48px;
`;

const Subtitle = styled.span`
  display: block;
  font-size: 14px;
`;

const Divider = styled.div`
  padding: 12px 0;
  width: 100%;
  border-bottom: solid 1px ${props => props.theme.colors.shades.white};
`;

const FilterWrapper = styled.div`
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: all 150ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: all 150ms;
  }
`;

const StyledMobileActionButton = styled(MobileActionButton)`
  margin-bottom: 8px;
`;

const StyledMobileFixedBottomButton = styled(MobileFixedBottomButton)`
  border: none;
  box-sizing: border-box;
  margin-top: auto;
  width: 100%;
  position: relative;
  padding: 0 0 16px;
`;

const MobileMedicalServicesSectionWithData = withStoreData(
  MobileMedicalServicesSection,
  state => ({
    token: getToken(state),
    coverages: getBenefitCoverages(state),
    membershipSummary: getMembership(state)
  }),
  dispatch => ({
    fetchBenefitCoverages: token => dispatch(fetchBenefitCoverages(token)),
    fetchMembership: token => dispatch(fetchMembershipSummary(token))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchBenefitCoverages(stateProps.token);
      dispatchProps.fetchMembership(stateProps.token);
    },
    shouldFetch:
      isEmpty(stateProps.coverages) ||
      Object.keys(stateProps.membershipSummary).reduce(
        (prev, key) =>
          prev ||
          stateProps.membershipSummary[key] == null ||
          stateProps.membershipSummary[key] === false,
        false
      ),
    coverages: stateProps.coverages.pending ? [] : stateProps.coverages,
    ...stateProps.membershipSummary,
    ...ownProps
  })
);

const MobileDialsWithData = withStoreData(
  MobileDials,
  state => ({
    token: getToken(state),
    memberId: getMemberId(state),
    accumulators: getAccumulators(state),
    membershipSummary: getMembership(state)
  }),
  dispatch => ({
    fetchAccumulators: (token, id, date, type) =>
      dispatch(fetchAccumulators(token, id, date, type || 1)),
    fetchMembership: token => dispatch(fetchMembershipSummary(token))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    fetch: () => {
      dispatchProps.fetchAccumulators(
        stateProps.token,
        stateProps.memberId,
        new Date().toISOString()
      );
      dispatchProps.fetchMembership(stateProps.token);
    },
    shouldFetch:
      isEmpty(stateProps.accumulators) ||
      Object.keys(stateProps.membershipSummary).reduce(
        (prev, key) =>
          prev ||
          stateProps.membershipSummary[key] == null ||
          stateProps.membershipSummary[key] === false,
        false
      ),
    accumulators: stateProps.accumulators,
    ...stateProps.membershipSummary,
    ...ownProps
  })
);

class Coverage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFamily: false
    };
  }

  handleFilterOptionClick = value => {
    const { closeMobileFilters } = this.props;
    this.setState({ isFamily: value });
    closeMobileFilters();
  };

  render() {
    const { isFamily } = this.state;
    const { filtersOpen, closeMobileFilters } = this.props;

    return (
      <>
        <MobileDialsWithData isFamily={isFamily} />
        <MobileContentWrapper>
          <MobileSectionHeader title="Summary" />
          <ClaimsSummarySection />
          <MobileMedicalServicesSectionWithData />
        </MobileContentWrapper>
        <FilterWrapper>
          <CSSTransition in={filtersOpen} classNames="fade" timeout={150} unmountOnExit>
            <FilterOverlay>
              <Title>Filter Coverage</Title>
              <Subtitle>Tap to change filters.</Subtitle>
              <Divider />
              <MobileModalListTitle>Filter By:</MobileModalListTitle>
              <StyledMobileActionButton
                text="Individual"
                type="inverse"
                onClick={() => this.handleFilterOptionClick(false)}
              />
              <StyledMobileActionButton
                text="Family"
                type="inverse"
                onClick={() => this.handleFilterOptionClick(true)}
              />

              <StyledMobileFixedBottomButton>
                <StyledMobileActionButton
                  text="Cancel"
                  type="negative"
                  onClick={closeMobileFilters}
                />
              </StyledMobileFixedBottomButton>
            </FilterOverlay>
          </CSSTransition>
        </FilterWrapper>
      </>
    );
  }
}

Coverage.propTypes = {
  filtersOpen: PropTypes.bool.isRequired,
  closeMobileFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filtersOpen: getMobileFilterStatus(state)
});

const mapDispatchToProps = dispatch => ({
  closeMobileFilters: () => {
    dispatch(closeMobileFilters());
  }
});

const ConnectedCoverage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Coverage);

const reflection = {
  component: ConnectedCoverage,
  layout: Mobile,
  layoutProps: {
    title: 'My Coverage',
    subtitle: new Interpolation([
      state => String(getMemberName(state)),
      ' (',
      state => String(getBenefitType(state)),
      ')'
    ]),
    titleType: 'standard',
    titleWrapperClass: 'tall',
    filter: true,
    footer: true,
    navProps: {
      left: 'back',
      title: 'My Coverage',
      right: 'menu'
    }
  },
  route: '/coverage',
  forAuthorized: true
};

export default ConnectedCoverage;

export { reflection };
