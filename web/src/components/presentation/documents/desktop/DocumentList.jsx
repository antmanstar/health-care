import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Document from './Document';
import withStoreData from '../../../containers/base/withStoreData';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../../shared/Loader/Loader';

const { getFiles, getFilesDataFrame } = selectors;

// Document Lists for "Document Center" View

const ListColumns = styled.div`
  display: flex;
`;

const Label = styled.h3`
  margin: 0 0 16px 0;
  font-size: 10px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};

  @media ${props => props.theme.device.mobile} {
    font-size: 16px;
  }

  &:first-child {
    min-width: 50px;
    margin: 0 32px 16px 0;

    @media ${props => props.theme.device.mobile} {
      min-width: 75px;
    }

    @media ${props => props.theme.device.tablet} {
      min-width: 100px;
    }
  }

  &:last-child {
    margin: 0 0 16px auto;
  }
`;

const Notice = styled.div`
  text-align: center;
  padding: 16px auto;
  font-style: italic;
  color: ${props => props.theme.colors.shades.gray};
`;

const DocumentList = React.memo(({ files, filesDataFrame }) => (
  <>
    <ListColumns>
      <Label>Date</Label>
      <Label>Document Name</Label>
      <Label>Download</Label>
    </ListColumns>
    {(!filesDataFrame || filesDataFrame.isLoading) && <Loader />}
    {files.length === 0 && filesDataFrame && !filesDataFrame.isLoading && (
      <Notice>There are no documents available.</Notice>
    )}
    {files.length > 0 &&
      filesDataFrame &&
      !filesDataFrame.isLoading &&
      files.map(file => <Document file={file} key={file.file_id} />)}
  </>
));

DocumentList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({}))
};

DocumentList.defaultProps = {
  files: []
};

export default withStoreData(DocumentList, (state, ownProps) => ({
  files: getFiles(state, ownProps.type),
  filesDataFrame: getFilesDataFrame(state)
}));
