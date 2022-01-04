import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import truncate from '../../../../utils/string';

// MOBILE - Message Entry in Message List

const { MobileContainer, MobileSectionBackground, SectionDivider } = defaultTheme.components;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.shades.blue};
`;

const NewAlert = styled.div`
  height: 8px;
  width: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background: ${props => props.theme.colors.shades.pinkOrange};
`;

const DateSent = styled.p`
  margin: 8px 0;
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.colors.shades.mediumGray};
`;

const MessagePreview = styled.p`
  width: 100%;
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.gray};
`;

const ReadMoreButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  color: ${props => props.theme.colors.shades.blue};
`;

const ListMessage = React.memo(({ title, date, preview, isNew, readMore, onClick }) => {
  return (
    <MobileSectionBackground>
      <MobileContainer>
        <TitleWrapper>
          {isNew === true && <NewAlert />}
          <Title>{title}</Title>
        </TitleWrapper>
        <DateSent>{date}</DateSent>
        <MessagePreview>{readMore ? truncate(130, 4)(preview) : preview}</MessagePreview>
      </MobileContainer>
      <SectionDivider />
      {readMore && (
        <ReadMoreButton onClick={onClick}>
          <p>Read Message</p>
          <i className="material-icons">keyboard_arrow_right</i>
        </ReadMoreButton>
      )}
    </MobileSectionBackground>
  );
});

ListMessage.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  readMore: PropTypes.bool,
  onClick: PropTypes.func
};

ListMessage.defaultProps = {
  isNew: false,
  readMore: true,
  onClick: null
};

export default ListMessage;
