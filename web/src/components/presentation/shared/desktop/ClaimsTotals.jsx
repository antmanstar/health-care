import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import styled from 'styled-components';
import NumberTile from './NumberTile';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import constants from '@evry-member-app/shared/constants';

const { fetchClaimsSummary } = actions;
const { getClaimsSummary, getMemberId, getToken } = selectors;
const { INDIVIDUAL } = constants;

// 4 NumberTiles giving claims summary totals

const { LayoutWrapper } = defaultTheme.components;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  div {
    margin-top: 13px;
    @media screen and (min-width: 1200px) {
      margin-top: 0;
    }
  }
`;

class ClaimsTotals extends Component {
  componentDidMount() {
    const { claimsSummary, fetchClaimsSummary } = this.props;
    if (Object.getOwnPropertyNames(claimsSummary).length === 0) {
      fetchClaimsSummary();
    }
  }

  render() {
    const { claimsSummary } = this.props;
    return (
      <LayoutWrapper>
        <SpaceBetween>
          <NumberTile number={claimsSummary.total_claims} label="Total Claims" />
          <NumberTile number={claimsSummary.total_telehealth_claims} label="Telehealth Claims" />
          <NumberTile number={claimsSummary.total_adjustment} label="Total Discounts" currency />
          <NumberTile
            number={claimsSummary.total_payment_to_provider}
            label="Paid by Evry"
            currency
            green
          />
        </SpaceBetween>
      </LayoutWrapper>
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

ClaimsTotals.propTypes = {
  claimsSummary: PropTypes.shape({}),
  fetchClaimsSummary: PropTypes.func.isRequired
};

ClaimsTotals.defaultProps = {
  claimsSummary: {}
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClaimsTotals);
