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
import LoadingSpinnerScreen from '../../shared/Loader/LoadingSpinnerScreen';

const { fetchClaimsList, showModal } = actions;
const { getClaimsList, getClaimsListDataFrame, getToken, getClaimLoading, getRequest } = selectors;
const { RECORDS_PER_PAGE } = constants;

// Claims History Section on the "Claims" View

const { SectionBackground, SectionDivider, SpaceBetween, LayoutWrapper } = defaultTheme.components;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  @media screen and (min-width: 300px) and (max-width: 1200px) {
    padding: 11px 11px 9px 7px;
  }
`;

const HeaderWrapper = styled(SpaceBetween)`
  flex-direction: column;
  align-items: flex-start;
  padding: 15px 13px 19px 20px;

  @media ${props => props.theme.device.desktop} {
    flex-direction: row;
    align-items: center;
    paddding: 0;
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

  search(data) {
    const { fetchClaimsList, claimsListDataFrame, paginator } = this.props;
    const trimmedQuery = data.query.trim();

    if (trimmedQuery !== claimsListDataFrame.query) {
      fetchClaimsList({
        page: 1,
        query: trimmedQuery,
        recordsPerPage: paginator.recordsPerPage,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
      });
    }
  }

  render() {
    const { claimsList, paginator, pending, request } = this.props;
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
                  placeholder="Search Claims"
                  request={request}
                  dateButton
                />
              </SearchWrapper>
            </HeaderWrapper>
          </Container>
          <SectionDivider />
          <Container>
            <ClaimsList claims={claimsList} />
            {pending && <LoadingSpinnerScreen type="TailSpin" color="#00BFFF" />}
          </Container>
        </SectionBackground>
        <PaginationWrapper>
          <PostSectionNote
            text="Have a question about a pending claim?"
            linkText="Contact Customer Support"
            handleClick={this.handlers.contactCareGuideClick}
          />
          {paginator && <Pagination paginator={paginator} />}
        </PaginationWrapper>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    pending: getClaimLoading(state),
    claimsList: getClaimsList(state),
    claimsListDataFrame: getClaimsListDataFrame(state),
    token: getToken(state),
    request: getRequest(state)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchClaimsList: args => {
    dispatch(fetchClaimsList(args));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const fetchClaimsList = ({ page, query, recordsPerPage, dateFrom, dateTo }) => {
    dispatchProps.fetchClaimsList({ page, query, recordsPerPage, token, dateFrom, dateTo });
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClaimsHistorySection);
