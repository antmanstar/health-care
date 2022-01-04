import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';
import images from '../../../../utils/images';

// Document List Entry
// TODO: props
// WAITING: this development will be greatly further facilitated by test documents

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
  min-width: 100px;
  margin: 0 32px 0 0;
`;

const DocumentName = styled.p`
  margin: 0;
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
  font-size: 16px;
  text-transform: uppercase;

  img {
    margin-left: 8px;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Document = React.memo(({ file }) => (
  <>
    <SectionDivider />
    <DocumentWrapper>
      <Date>{Moment(file.utc_date).format('MM/DD/YYYY')}</Date>
      <DocumentName>{file.display_name}</DocumentName>
      <DownloadButton>
        PDF
        <img src={images["download"]} alt="Download PDF" />
      </DownloadButton>
    </DocumentWrapper>
  </>
));

Document.propTypes = {
  file: PropTypes.shape({}).isRequired
};

export default Document;
