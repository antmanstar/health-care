import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';
import images from '../../../../utils/images';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
// Document List Entry
// TODO: props
// WAITING: this development will be greatly further facilitated by test documents

const { fetchFileContent } = actions;

const { getToken } = selectors;

const SectionDivider = styled.hr`
  margin: 0;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
`;

const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.darkGray};
`;

const Date = styled.p`
  min-width: 50px;
  margin: 0 32px 0 0;
  font-size: 8px;

  @media ${props => props.theme.device.mobile} {
    min-width: 75px;
    font-size: 12px;
  }

  @media ${props => props.theme.device.tablet} {
    min-width: 100px;
    font-size: 16px;
  }
`;

const DocumentName = styled.p`
  margin: 0;
  font-size: 8px;

  @media ${props => props.theme.device.mobile} {
    font-size: 12px;
  }

  @media ${props => props.theme.device.tablet} {
    font-size: 16px;
  }
`;

const DownloadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 0;
  outline: none;
  border: none;
  background: ${props => props.theme.colors.shades.white};
  color: ${props => props.theme.colors.shades.blue};
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;

  @media ${props => props.theme.device.mobile} {
    font-size: 16px;
  }

  img {
    margin-left: 8px;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Document = React.memo(({ file }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => getToken(state));
  const fileType = file.file_name
    .split('.')
    .pop()
    .toUpperCase();

  const downloadButtonHandler = () => {
    dispatch(fetchFileContent(file.file_id, file.file_name, token));
  };

  return (
    <>
      <SectionDivider />
      <DocumentWrapper>
        <Date>{Moment(file.utc_date).format('MM/DD/YYYY')}</Date>
        <DocumentName>{file.display_name}</DocumentName>
        <DownloadButton onClick={downloadButtonHandler}>
          {fileType && fileType.length < 5 ? fileType : 'PDF'}
          <img src={images['download']} alt="Download PDF" />
        </DownloadButton>
      </DocumentWrapper>
    </>
  );
});

Document.propTypes = {
  file: PropTypes.shape({}).isRequired
};

export default Document;
