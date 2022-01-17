import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styled from 'styled-components';
import SmallButton from '../../shared/desktop/SmallButton';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { connect } from 'react-redux';

// Individual Message for the Notification Center

const { fetchEvryContactInfo } = actions;
const { getEvryContactInfo, getToken } = selectors;


const Wrapper = styled.div`
  margin-bottom: 8px;
  padding: 32px;
  background: #fafafa;
  border-top: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
  cursor: pointer;

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
  ({ bodyText, buttonText, dateSent, id, isNew, passThroughRef, title, onClick, evryContactInfo }) => (
    <Wrapper key={id} onClick={onClick}>
      <TitleSection>
        {isNew === true && <NewAlert />}
        <h2>{title}</h2>
      </TitleSection>
      <DateSent>
        {`Sent on `}
        {Moment(dateSent).format('MMM DD, YYYY')}
      </DateSent>
      <p ref={passThroughRef}>{bodyText}</p>
      {Boolean(buttonText) && <SmallButton onClick={() => window.location.href = `mailto:${evryContactInfo.support_email.email_address}`} text={buttonText} />}
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

const mapStateToProps = state => ({
  token: getToken(state),
  evryContactInfo: getEvryContactInfo(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEvryContactInfo: token => dispatch(fetchEvryContactInfo(token)),
});

const mergeProps = ({ token, ...stateProps }, { fetchEvryContactInfo }, ownProps) => ({
  fetchEvryContactInfo: () => fetchEvryContactInfo(token),
  ...stateProps,
  ...ownProps
});

const ConnectedMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Message);

export default ConnectedMessage;
