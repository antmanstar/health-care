/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SearchAndFilterBar from '../../shared/desktop/SearchAndFilterBar';
import ClaimsList from './ClaimsList';
import PostSectionNote from '../../shared/desktop/PostSectionNote';
import Pagination from '../../shared/desktop/Pagination';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import paginate from '../../../../utils/pagination';
import constants from '@evry-member-app/shared/constants';

const { fetchClaimsList, showModal } = actions;
const { getClaimsList, getClaimsListDataFrame, getToken } = selectors;
const { RECORDS_PER_PAGE } = constants;

// Claims History Section on the "Claims" View

const {
  SectionBackground,
  SectionDivider,
  Container,
  SpaceBetween,
  LayoutWrapper
} = defaultTheme.components;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const HeaderWrapper = styled(SpaceBetween)`
  flex-direction: column;
  align-items: flex-start;

  @media ${props => props.theme.device.desktop} {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-top: 24px;

  @media ${props => props.theme.device.desktop} {
    max-width: 48%;
    margin-top: 0;
  }
`;

class ClaimsHistorySection extends Component {
  constructor(props) {
    super(props);

    this.handlers = {
      contactCareGuideClick: this.contactCareGuideClick.bind(this),
      search: this.search.bind(this)
    };
  }

  componentDidMount() {
    const { claimsList, fetchClaimsList } = this.props;

    if (!claimsList) {
      fetchClaimsList({ page: 1, recordsPerPage: RECORDS_PER_PAGE });
    }
  }

  contactCareGuideClick() {
    this.props.showModal('CONTACT_CARE_GUIDE');
  }

  search(query) {
    const { fetchClaimsList, claimsListDataFrame, paginator } = this.props;
    const trimmedQuery = query.trim();

    if (trimmedQuery !== claimsListDataFrame.query) {
      fetchClaimsList({ page: 1, query: trimmedQuery, recordsPerPage: paginator.recordsPerPage });
    }
  }

  render() {
    const { claimsList, paginator } = this.props;

    return (
      <LayoutWrapper>
        <SectionBackground>
          <Container>
            <HeaderWrapper>
              <SectionHeaderWithIcon
                title="Claims History"
                subTitle="View claims information or follow up on an active claim."
                icon="history"
              />
              <SearchWrapper>
                <SearchAndFilterBar
                  bordered
                  search={this.handlers.search}
                  dateButton
                  filterButton
                />
              </SearchWrapper>
            </HeaderWrapper>
          </Container>
          <SectionDivider />
          <Container>
            <ClaimsList claims={claimsList} />
          </Container>
        </SectionBackground>
        <PaginationWrapper>
          <PostSectionNote
            text="Have a question about a pending claim?"
            linkText="Contact your Care Guide"
            handleClick={this.handlers.contactCareGuideClick}
          />
          {paginator && <Pagination paginator={paginator} />}
        </PaginationWrapper>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = state => ({
  claimsList: getClaimsList(state),
  claimsListDataFrame: getClaimsListDataFrame(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchClaimsList: args => {
    dispatch(fetchClaimsList(args));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const fetchClaimsList = ({ page, query, recordsPerPage }) => {
    dispatchProps.fetchClaimsList({ page, query, recordsPerPage, token });
  };

  return {
    paginator:
      stateProps.claimsListDataFrame && paginate(stateProps.claimsListDataFrame, fetchClaimsList),
    ...dispatchProps,
    ...stateProps,
    ...ownProps,
    fetchClaimsList
  };
};

ClaimsHistorySection.propTypes = {
  claimsList: PropTypes.arrayOf(PropTypes.shape({})),
  claimsListDataFrame: PropTypes.shape({}),
  fetchClaimsList: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  paginator: PropTypes.shape({})
};

ClaimsHistorySection.defaultProps = {
  claimsList: null,
  claimsListDataFrame: {},
  paginator: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ClaimsHistorySection);
