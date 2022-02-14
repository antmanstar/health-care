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

const { fetchFiles, showModal, fetchForms } = actions;
const { getFilesDataFrame, getToken, getFileContent, getForms } = selectors;
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
  justify-content: space-evenly;
`;

const ToggleButton = styled.button`
  border: none;
  height: 32px;
  margin-right: 32px;
  padding: 0;
  font-size: 12px;
  font-weight: ${props => (props.active ? '700' : '300')};
  color: ${props => props.theme.colors.shades.blue};
  opacity: ${props => (props.active ? '1' : '.6')};
  background-color: ${props => props.theme.colors.shades.white};
  text-transform: uppercase;
  border-bottom: 3px solid
    ${props => (props.active ? props.theme.colors.shades.pinkOrange : 'transparent')};

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  outline: none;

  @media ${props => props.theme.device.mobile} {
    font-size: 16px;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  //margin-top: 24px;

  @media ${props => props.theme.device.tablet} {
    max-width: 48%;
    margin-top: 0;
  }
`;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 24px;
  gap: 20px;

  @media ${props => props.theme.device.tabletXL} {
    flex-direction: row;

    div:last-child {
      position: absolute;
      right: 0;
    }
  }
`;

const StyledSpaceBetween = styled(SpaceBetween)`
  @media ${props => props.theme.device_up.tablet} {
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const FilterLabel = styled.div`
  display: flex;
  margin-top: -10px;
  margin-left: 35px;
  padding: 0 10px 10px 0;
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.theme.colors.shades.pinkOrange};

  @media (max-width: 500px) {
    margin-left: 10px;
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
      fetchFiles({ categories: [] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.fileContent &&
      prevProps.fileContent.isLoading === true &&
      this.props.fileContent.isLoading === false
    ) {
      const fileType = this.props.fileContent.fileName.split('.').pop();
      let blob;

      switch (fileType) {
        case 'pdf':
          blob = new Blob([this.props.fileContent.file], {
            type: 'application/pdf'
          });
          break;
        case 'jpeg':
        case 'jpg':
          blob = new Blob([this.props.fileContent.file], {
            type: 'image/jpeg'
          });
          break;
        case 'png':
          blob = new Blob([this.props.fileContent.file], {
            type: 'image/png'
          });
          break;
        case 'doc':
          blob = new Blob([this.props.fileContent.file], {
            type: 'application/msword'
          });
          break;
        case 'doc':
          blob = new Blob([this.props.fileContent.file], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          });
          break;
        default:
          blob = new Blob([this.props.fileContent.file], {
            type: 'text/plain'
          });
      }

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = this.props.fileContent.fileName
        ? this.props.fileContent.fileName
        : 'download.txt';
      anchor.click();
      URL.revokeObjectURL(url);
    }
  }

  handleContactCustomerSupportClick() {
    this.props.showModal('SUBMIT_NEW_SUPPORT_REQUEST');
  }

  handleFormTabClick() {
    // const { fetchFiles } = this.props;

    // fetchFiles({ categories: [] /*FILE_CATEGORIES.DOWNLOADABLE_FORMS*/ });
    const { fetchForms } = this.props;

    fetchForms({ category: null, formType: 1 });

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

    fetchFiles({ categories: [] });

    this.setState({
      toggled: false
    });
  }

  search(query) {
    const { fetchFiles, filesDataFrame, paginator, fetchForms, forms, formsPaginator } = this.props;
    const { toggled } = this.state;
    const trimmedQuery = query.query.trim();
    // const categories = toggled
    //   ? FILE_CATEGORIES.DOWNLOADABLE_FORMS
    //   : FILE_CATEGORIES.combine(FILE_CATEGORIES.USER_NOTICES, FILE_CATEGORIES.CLAIMS_DOCUMENTS);

    if (
      !toggled &&
      (trimmedQuery !== filesDataFrame.query ||
        query.dateFrom !== filesDataFrame.dateFrom ||
        query.dateTo !== filesDataFrame.dateTo)
    ) {
      fetchFiles({
        categories: [],
        page: 1,
        recordsPerPage: paginator.recordsPerPage,
        query: trimmedQuery,
        dateFrom: query.dateFrom,
        dateTo: query.dateTo
      });
    }
    if (toggled && trimmedQuery !== forms.formDataFrame.search_string) {
      fetchForms({
        category: null,
        formType: 1,
        page: 1,
        records_per_page: formsPaginator.recordsPerPage,
        search_string: trimmedQuery
      });
    }
  }

  render() {
    const { toggled } = this.state;
    const { paginator, formsPaginator, filesDataFrame } = this.props;
    console.log('MyDocumentsSection');
    console.log(this.props.filesDataFrame)

    const FilterFiles = React.memo(() => {
      let dateFrom = filesDataFrame?.request.dateFrom;
      let dateTo = filesDataFrame?.request.dateTo;
      let filterFile;
  
      if (dateFrom && dateTo) {
        filterFile = (
          <FilterLabel>
            Filtered from: {dateFrom} - {dateTo}
          </FilterLabel>
        );
        return filterFile;
      } else return null;
    }, [filesDataFrame?.request.dateFrom, filesDataFrame?.request.dateTo]);

    return (
      <>
        <SectionBackground>
          <Container>
            <SectionHeaderWithIcon
              icon="insert_drive_file"
              title="My Documents"
              subTitle="Search your documents or download forms."
              noCollaspe={true}
            />
          </Container>
          <SectionDivider />
          <Container>
            <StyledSpaceBetween>
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
                  dateButton={!toggled}
                  placeholder={`Search ${toggled ? 'Download Forms' : 'Documents'}`}
                  type={toggled ? '' : 'myDocuments'}
                />
              </SearchWrapper>
            </StyledSpaceBetween>
          </Container>
          <SectionDivider />
          <FilterFiles />
          <Container>{toggled ? <FormList /> : <DocumentList />}</Container>
        </SectionBackground>
        <LayoutWrapper>
          <PaginationWrapper>
            <PostSectionNote
              text="Need to order a physical copy?"
              linkText="Contact Customer Support"
              handleClick={this.handlers.handleContactCustomerSupportClick}
            />
            {paginator && !toggled && <Pagination paginator={paginator} />}
            {formsPaginator && toggled && <Pagination paginator={formsPaginator} />}
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
  token: getToken(state),
  fileContent: getFileContent(state),
  forms: getForms(state)
});

const mapDispatchToProps = dispatch => ({
  fetchFiles: args => {
    dispatch(fetchFiles(args));
  },
  showModal: modal => {
    dispatch(showModal(modal));
  },
  fetchForms: args => {
    dispatch(fetchForms(args));
  }
});

const mergeProps = ({ token, ...stateProps }, dispatchProps, ownProps) => {
  const fetchFiles = ({
    categories,
    documentTypes,
    page,
    query,
    recordsPerPage,
    dateFrom,
    dateTo
  }) => {
    dispatchProps.fetchFiles({
      categories,
      documentTypes,
      page,
      query,
      recordsPerPage,
      token,
      dateFrom,
      dateTo
    });
  };
  const fetchForms = ({ category, formType, page, records_per_page, search_string }) => {
    dispatchProps.fetchForms({ category, formType, page, records_per_page, search_string, token });
  };

  return {
    paginator: stateProps.filesDataFrame && paginate(stateProps.filesDataFrame, fetchFiles),
    formsPaginator: stateProps.forms && paginate(stateProps.forms.formDataFrame, fetchForms),
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    fetchFiles,
    fetchForms
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MyDocumentsSection);
