import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import DownloadableForm from './DownloadableForm';
import withStoreData from '../../../containers/base/withStoreData';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../../shared/Loader/Loader';
const { getFiles, getFilesDataFrame, getForms } = selectors;

// Form List for "Document Lists" Section of the "Document Center" View

const { SpaceBetween } = defaultTheme.components;

const Label = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};

  &:last-child {
    margin-left: auto;
  }
`;

const Notice = styled.div`
  text-align: center;
  padding: 16px auto;
  font-style: italic;
  color: ${props => props.theme.colors.shades.gray};
`;

const FormList = React.memo(({ files, filesDataFrame }) => {
  return (
    <>
      <SpaceBetween>
        <Label>Form Name</Label>
        <Label>Download</Label>
      </SpaceBetween>
      {(!filesDataFrame || filesDataFrame.isLoading) && <Loader />}
      {files.length === 0 && filesDataFrame && !filesDataFrame.isLoading && (
        <Notice>There are no forms available.</Notice>
      )}
      {files.length > 0 &&
        filesDataFrame &&
        !filesDataFrame.isLoading &&
        files.map(file => <DownloadableForm file={file} key={file.file_id} />)}
    </>
  );
});

FormList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({}))
};

FormList.defaultProps = {
  files: []
};

export default withStoreData(FormList, (state, ownProps) => ({
  files: getFiles(state, ownProps.type),
  filesDataFrame: getFilesDataFrame(state),
  forms: getForms(state)
}));
