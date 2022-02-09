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
import Moment from 'moment';
import Loader from '../../shared/Loader/Loader';
import { useEffect } from 'react';

const { fetchClaimsList, showModal } = actions;
const { getClaimsList, getClaimsListDataFrame, getToken, getClaimLoading, getRequest } = selectors;
const { RECORDS_PER_PAGE } = constants;

// Claims History Section on the "Claims" View

const { SectionBackground, SectionDivider, SpaceBetween, LayoutWrapper } = defaultTheme.components;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  text-align: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
  }
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

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 80px;
  i {
    color: #959595;
  }
`;

const EmptyStateText = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 28.13px;
  color: #bdbdbd;
  font-family: 'Roboto';
  font-weight: 700;
  margin-left: 15px;
  @media screen and (min-width: 1200px) {
    font-size: 24px;
  }
`;

const FilterText = styled.p`
  color: #f9423a;
  font-size: 16px;
  line-height: 18.75px;
  margin-left: 10px;
  span {
    display: inline-block;
    margin-left: 6px;
    margin-right: 6px;
  }
  @media screen and (min-width: 1200px) {
    margin-left: 0;
  }
`;

const ClaimsHistorySection = ({
  claimsList,
  paginator,
  pending,
  request,
  fetchClaimsList,
  claimsListDataFrame,
  showModal
}) => {
  useEffect(() => {
    fetchClaimsList({ page: 1, recordsPerPage: RECORDS_PER_PAGE });
  }, []);

  const contactCareGuideClick = () => {
    showModal('CONTACT_CARE_GUIDE');
  };

  const search = data => {
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
  };

  return (
    <LayoutWrapper>
      <SectionBackground>
        <Container>
          <HeaderWrapper>
            <SectionHeaderWithIcon
              title="Claims History"
              subTitle="View claims information."
              icon="history"
            />
            <SearchWrapper>
              <SearchAndFilterBar
                bordered
                search={search}
                placeholder="Search Claims"
                request={request}
                dateButton
              />
            </SearchWrapper>
          </HeaderWrapper>
        </Container>
        <SectionDivider />
        <Container>
          {request?.dateFrom && request?.dateTo ? (
            <FilterText>
              Filtered from:
              <span>
                {Moment(request?.dateFrom)
                  .format('MM-DD-YYYY')
                  .replaceAll('-', '/')}
              </span>
              -
              <span>
                {Moment(request?.dateTo)
                  .format('MM-DD-YYYY')
                  .replaceAll('-', '/')}
              </span>
            </FilterText>
          ) : null}
          {pending ? (
            <Loader />
          ) : claimsList?.length ? (
            <ClaimsList claims={claimsList} />
          ) : (
            <EmptyState>
              <i className="material-icons">search</i>
              <EmptyStateText>No Claims Found</EmptyStateText>
            </EmptyState>
          )}
        </Container>
      </SectionBackground>
      <PaginationWrapper>
        <PostSectionNote
          text="Have a question about a pending claim?"
          linkText="Contact Customer Support"
          handleClick={contactCareGuideClick}
        />
        {paginator && <Pagination paginator={paginator} />}
      </PaginationWrapper>
    </LayoutWrapper>
  );
};

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
