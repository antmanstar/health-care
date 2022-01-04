import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import images from '../../../../utils/images';

// MOBILE: Document List Item
// wire up download link

const { MobileSectionBackground, MobileContainer, SpaceBetween } = defaultTheme.components;

const DateReceived = styled.p`
  font-size: 12px;
  margin: 0 0 4px;
`;
const Title = styled.p`
  margin: 0;
  font-size: 14px;
`;

const DownloadWrapper = styled.div`
  display: flex;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};

  img {
    margin-left: 8px;
  }
`;

const DocumentListItem = ({ title, dateReceived, downloadLink }) => (
  <MobileSectionBackground>
    <MobileContainer>
      <SpaceBetween>
        <div>
          {dateReceived !== undefined && <DateReceived>{dateReceived}</DateReceived>}
          <Title>{title}</Title>
        </div>

        <DownloadWrapper>
          PDF
          <img src={images["download"]} alt="Download PDF" />
        </DownloadWrapper>
      </SpaceBetween>
    </MobileContainer>
  </MobileSectionBackground>
);

DocumentListItem.propTypes = {
  title: PropTypes.string.isRequired,
  dateReceived: PropTypes.string,
  downloadLink: PropTypes.string.isRequired
};

DocumentListItem.defaultProps = {
  dateReceived: undefined
};

export default DocumentListItem;
