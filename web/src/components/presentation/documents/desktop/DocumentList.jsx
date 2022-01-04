import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Document from './Document';
import withStoreData from '../../../containers/base/withStoreData';
import selectors from '@evry-member-app/shared/store/selectors';

const { getFiles } = selectors;

// Document Lists for "Document Center" View

const ListColumns = styled.div`
  display: flex;
`;

const Label = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};

  &:first-child {
    min-width: 100px;
    margin: 0 32px 16px 0;
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

const DocumentList = React.memo(({ files }) => (
  <>
    <ListColumns>
      <Label>Date</Label>
      <Label>Document Name</Label>
      <Label>Download</Label>
    </ListColumns>
    {files.length === 0 ? (
      <Notice>There are no documents available.</Notice>
    ) : (
      files.map(file => <Document file={file} key={file.file_id} />)
    )}
  </>
));

DocumentList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({}))
};

DocumentList.defaultProps = {
  files: []
};

export default withStoreData(DocumentList, (state, ownProps) => ({
  files: getFiles(state, ownProps.type)
}));
