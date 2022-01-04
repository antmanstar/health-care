import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import images from '../../../../utils/images';

// Form List Entry

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

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  margin: 0;
  color: ${props => props.theme.colors.shades.blue};
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
`;

const DownloadableForm = React.memo(({ file }) => (
  <>
    <SectionDivider />
    <DocumentWrapper>
      <Icon>
        <i className="material-icons">description</i>
      </Icon>
      <DocumentName>{file.display_name}</DocumentName>
      <DownloadButton>
        PDF
        <img src={images["download"]} alt="Download PDF" />
      </DownloadButton>
    </DocumentWrapper>
  </>
));

DownloadableForm.propTypes = {
  file: PropTypes.shape({}).isRequired
};

export default DownloadableForm;
