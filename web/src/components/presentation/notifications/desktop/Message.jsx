import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styled from 'styled-components';
import SmallButton from '../../shared/desktop/SmallButton';

// Individual Message for the Notification Center

const Wrapper = styled.div`
  margin-bottom: 8px;
  padding: 32px;
  background: #fafafa;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};

  p {
    line-height: 24px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin: 0;
    font-weight: 400;
    color: ${props => props.theme.colors.shades.blue};
  }
`;

const DateSent = styled.p`
  margin: 8px 0 16px;
  font-style: italic;
  color: ${props => props.theme.colors.shades.gray};
`;

const NewAlert = styled.div`
  height: 8px;
  width: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background: ${props => props.theme.colors.shades.pinkOrange};
`;

const Message = React.memo(
  ({ bodyText, buttonText, dateSent, id, isNew, passThroughRef, title }) => (
    <Wrapper key={id}>
      <TitleSection>
        {isNew === true && <NewAlert />}
        <h2>{title}</h2>
      </TitleSection>
      <DateSent>
        {`Sent on `}
        {Moment(dateSent).format('MMM DD, YYYY')}
      </DateSent>
      <p ref={passThroughRef}>{bodyText}</p>
      {Boolean(buttonText) && <SmallButton text={buttonText} />}
    </Wrapper>
  )
);

Message.propTypes = {
  bodyText: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  dateSent: PropTypes.string.isRequired,
  id: PropTypes.string,
  isNew: PropTypes.bool,
  passThroughRef: PropTypes.shape({}),
  title: PropTypes.string.isRequired
};

Message.defaultProps = {
  buttonText: null,
  id: null,
  isNew: false,
  passThroughRef: null
};

export default Message;
