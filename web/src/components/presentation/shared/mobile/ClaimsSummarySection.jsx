import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import leadingZero from '../../../../utils/number';
import defaultTheme from '../../../../style/themes';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import constants from '@evry-member-app/shared/constants';

const { fetchClaimsSummary } = actions;
const { getClaimsSummary, getMemberId, getToken } = selectors;
const { INDIVIDUAL } = constants;

// MOBILE: Claims View

const {
  MobileContainer,
  MobileSectionBackground,
  SectionDivider,
  SpaceBetween
} = defaultTheme.components;

const Total = styled.div`
  margin: 16px 0 24px;

  h2 {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 300;
    color: ${props => props.theme.colors.shades.black};

    &.green {
      color: ${props => props.theme.colors.roles.success};
    }
  }

  h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${props => props.theme.colors.shades.tealBlue};
  }

  &:last-child {
    margin-bottom: 16px;
  }
`;

const Column = styled.div`
  width: 50%;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  color: ${props => props.theme.colors.shades.blue};

  .left {
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }

    i {
      margin-right: 16px;
    }
  }
`;

const StyledLink = styled(RouterLink)`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class ClaimsSummarySection extends Component {
  componentDidMount() {
    const { claimsSummary, fetchClaimsSummary } = this.props;
    if (Object.getOwnPropertyNames(claimsSummary).length === 0) {
      fetchClaimsSummary();
    }
  }

  render() {
    const { claimsSummary } = this.props;
    return (
      <MobileSectionBackground>
        <MobileContainer>
          <SpaceBetween>
            <Column>
              <Total>
                <h2>{`$${claimsSummary.total_costs}`}</h2>
                <h3>Total Costs</h3>
              </Total>
              <Total>
                <h2>{leadingZero(claimsSummary.total_claims)}</h2>
                <h3>Total Claims</h3>
              </Total>
            </Column>
            <Column>
              <Total>
                <h2 className="green">{`$${claimsSummary.total_benefits}`}</h2>
                <h3>Total Benefits</h3>
              </Total>
              <Total>
                <h2>{leadingZero(claimsSummary.total_telehealth_claims)}</h2>
                <h3>Telehealth Claims</h3>
              </Total>
            </Column>
          </SpaceBetween>
        </MobileContainer>
        <SectionDivider />
        <StyledLink to="/claims">
          <Button>
            <div className="left">
              <i className="material-icons">history</i>
              <p>See Claims History</p>
            </div>
            <i className="material-icons">keyboard_arrow_right</i>
          </Button>
        </StyledLink>
      </MobileSectionBackground>
    );
  }
}

const mapStateToProps = state => ({
  claimsSummary: getClaimsSummary(state),
  id: getMemberId(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchClaimsSummary: args => {
    dispatch(fetchClaimsSummary(args));
  }
});

const mergeProps = ({ id, token, ...stateProps }, { fetchClaimsSummary }, ownProps) => ({
  ...stateProps,
  fetchClaimsSummary: () => fetchClaimsSummary({ id, token, type: INDIVIDUAL }),
  ...ownProps
});

ClaimsSummarySection.propTypes = {
  claimsSummary: PropTypes.shape({}),
  fetchClaimsSummary: PropTypes.func.isRequired
};

ClaimsSummarySection.defaultProps = {
  claimsSummary: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ClaimsSummarySection);
