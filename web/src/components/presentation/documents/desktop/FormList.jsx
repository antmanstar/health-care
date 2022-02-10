import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import DownloadableForm from './DownloadableForm';
import withStoreData from '../../../containers/base/withStoreData';
import selectors from '@evry-member-app/shared/store/selectors';
import Loader from '../../shared/Loader/Loader';
const { getForms } = selectors;

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

const FormList = React.memo(({ forms }) => {

  return (
    <>
      <SpaceBetween>
        <Label>Form Name</Label>
        <Label>Download</Label>
      </SpaceBetween>
      {(!forms || forms.isLoading) && <Loader />}
      {forms && !forms.isLoading && forms.formDataFrame.data.length === 0 && (
        <Notice>There are no forms available.</Notice>
      )}
      {forms &&
        !forms.isLoading &&
        forms.formDataFrame.data.length > 0 &&
        forms.formDataFrame.data.map(form => <DownloadableForm form={form} key={form.file_id} />)}
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
  forms: getForms(state)
}));
