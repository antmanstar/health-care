/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import defaultTheme from '../../../../style/themes';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SearchAndFilterBar from '../../shared/desktop/SearchAndFilterBar';
import DocumentList from './DocumentList';
import FormList from './FormList';
import PostSectionNote from '../../shared/desktop/PostSectionNote';
import Pagination from '../../shared/desktop/Pagination';
import paginate from '../../../../utils/pagination';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import constants from '@evry-member-app/shared/constants';

const { fetchFiles, showModal } = actions;
const { getFilesDataFrame, getToken } = selectors;
const { FILE_CATEGORIES } = constants;

// This is the My Membership Section from the Document Center View

const {
  LayoutWrapper,
  SectionBackground,
  Container,
  SectionDivider,
  SpaceBetween
} = defaultTheme.components;

const ToggleButtons = styled.div`
  display: flex;
`;

const ToggleButton = styled.button`
  border: none;
  height: 32px;
  margin-right: 32px;
  padding: 0;
  font-size: 14px;
  font-weight: ${props => (props.active ? '700' : '300')};
  color: ${props => props.theme.colors.shades.blue};
  opacity: ${props => (props.active ? '1' : '.6')};
  text-transform: uppercase;
  border-bottom: 3px solid
    ${props => (props.active ? props.theme.colors.shades.pinkOrange : 'transparent')};

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  outline: none;

  @media ${props => props.theme.device.desktop} {
    font-size: 16px;
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

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 24px;

  div:last-child {
    position: absolute;
    right: 0;
  }
`;

class MyDocumentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };

    this.handlers = {
      handleContactCustomerSupportClick: this.handleContactCustomerSupportClick.bind(this),
      handleFormTabClick: this.handleFormTabClick.bind(this),
      handleDocumentTabClick: this.handleDocumentTabClick.bind(this),
      search: this.search.bind(this)
    };
  }

  componentDidMount() {
    const { fetchFiles, filesDataFrame } = this.props;

    const receivedDocuments = FILE_CATEGORIES.combine(
      FILE_CATEGORIES.USER_NOTICES,
      FILE_CATEGORIES.CLAIMS_DOCUMENTS
    );

    if (isEmpty(filesDataFrame)) {
      fetchFiles({ categories: receivedDocuments });
    }
  }

  handleContactCustomerSupportClick() {
    this.props.showModal('SUBMIT_NEW_SUPPORT_REQUEST');
  }

  handleFormTabClick() {
    const { fetchFiles } = this.props;

    fetchFiles({ categories: FILE_CATEGORIES.DOWNLOADABLE_FORMS });

    this.setState({
      toggled: true
    });
  }

  handleDocumentTabClick() {
    const { fetchFiles } = this.props;
    const receivedDocuments = FILE_CATEGORIES.combine(
      FILE_CATEGORIES.USER_NOTICES,
      FILE_CATEGORIES.CLAIMS_DOCUMENTS
    );

    fetchFiles({ categories: receivedDocuments });

    this.setState({
      toggled: false
    });
  }

  search(query) {
    const { fetchFiles, filesDataFrame, paginator } = this.props;
    const { toggled } = this.state;
    const trimmedQuery = query.trim();
    const categories = toggled
      ? FILE_CATEGORIES.DOWNLOADABLE_FORMS
      : FILE_CATEGORIES.combine(FILE_CATEGORIES.USER_NOTICES, FILE_CATEGORIES.CLAIMS_DOCUMENTS);

    if (trimmedQuery !== filesDataFrame.query) {
      fetchFiles({
        categories,
        page: 1,
        recordsPerPage: paginator.recordsPerPage,
        query: trimmedQuery
      });
    }
  }

  render() {
    const { toggled } = this.state;
    const { paginator } = this.props;

    return (
      <>
        <SectionBackground>
          <Container>
            <SectionHeaderWithIcon
              icon="insert_drive_file"
              title="My Documents"
              subTitle="Search your documents or download forms."
            />
          </Container>
          <SectionDivider />
          <Container>
            <SpaceBetween>
              <ToggleButtons>
                <ToggleButton active={!toggled} onClick={this.handlers.handleDocumentTabClick}>
                  Documents
                </ToggleButton>
                <ToggleButton active={toggled} onClick={this.handlers.handleFormTabClick}>
                  Download Forms
                </ToggleButton>
              </ToggleButtons>
              <SearchWrapper>
                <SearchAndFilterBar
                  bordered
                  search={this.handlers.search}
                  dateButton
                  placeholder={`Search ${toggled ? 'Download Forms' : 'Documents'}`}
                />
              </SearchWrapper>
            </SpaceBetween>
          </Container>
          <SectionDivider />
          <Container>{toggled ? <FormList /> : <DocumentList />}</Container>
        </SectionBackground>
        <LayoutWrapper>
          <PaginationWrapper>
            <PostSectionNote
              text="Need to order a physical copy?"
              linkText="Contact Customer Support"
              handleClick={this.handlers.handleContactCustomerSupportClick}
            />
            {paginator && <Pagination paginator={paginator} />}
          </PaginationWrapper>
        </LayoutWrapper>
      </>
    );
  }
}

MyDocumentsSection.propTypes = {
  fetchFiles: PropTypes.func,
  filesDataFrame: PropTypes.shape({}),
  paginator: PropTypes.shape({}),
  showModal: PropTypes.func.isRequired
};

MyDocumentsSection.defaultProps = {
  fetchFiles: () => {},
  filesDataFrame: null,
  paginator: null
};

const mapStateToProps = state => ({
  filesDataFrame: getFilesDataFrame(state),
  token: getToken(state)
});

const mapDispatchToProps = dispatch => ({
  fetchFiles: args => {
    dispatch(fetchFiles(args));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const fetchFiles = ({ categories, documentTypes, page, query, recordsPerPage }) => {
    dispatchProps.fetchFiles({ categories, documentTypes, page, query, recordsPerPage, token });
  };

  return {
    paginator: stateProps.filesDataFrame && paginate(stateProps.filesDataFrame, fetchFiles),
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    fetchFiles
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MyDocumentsSection);
