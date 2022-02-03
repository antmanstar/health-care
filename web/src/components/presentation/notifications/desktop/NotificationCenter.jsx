import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchAndFilterBar from '../../shared/desktop/SearchAndFilterBar';
import Message from './Message';
import Loader from '../../shared/Loader/Loader';
import withInfiniteScroll from '../../../containers/base/withInfiniteScroll';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { connect } from 'react-redux';

const { fetchNotifications, clearNotifications } = actions;
const { getToken, getNotificationsFilters } = selectors;

// DESKTOP: Notification Center Drawer
// TODO: API should supply messages
// WAITING: Need from Jong/Evry API endpoints for notifications (currently, there are none)
// TODO: Wire up search / filters

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  background: ${props => props.theme.colors.shades.white};
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
  overflow-y: hidden;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 32px 48px;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  z-index: 10;

  div {
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.shades.pinkOrange};
  }

  h2 {
    margin: 0;
    color: ${props => props.theme.colors.shades.blue};
  }

  i {
    margin-right: 16px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: -24px 0 24px;
  padding: 0 32px;
`;

const Scroller = styled.div`
  position: relative;
  margin-top: -48px;
  padding-top: 48px;
  height: calc(100vh - 148px);
  overflow-y: auto;
  z-index: 9;
`;

const MessageListWrapper = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0 0 16px;
  padding: 0 32px;
  color: ${props => props.theme.colors.shades.blue};
`;

const CloseDrawer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;

  i {
    color: ${props => props.theme.colors.shades.blue};
    margin-right: 0;
  }
`;

const FilterLabel = styled.div`
  display: flex;
  margin-top: -10px;
  padding: 0 10px 10px 10px;
  font-weight: bold;
  font-size: 18px;
  color: ${props => props.theme.colors.shades.pinkOrange};
`;

const ScrollerWithInfiniteScroll = withInfiniteScroll(Scroller);

const NotificationCenter = ({
  handleClick,
  markNotificationsAsRead,
  notifications,
  notificationsDataFrame,
  fetchNotifications,
  clearNotifications,
  notificationsFilters,
  isPending
}) => {
  useEffect(() => {
    return () => {
      clearNotifications();
    };
  }, []);

  const getNotificationModalMessage = () => {
    let searchQuery = notificationsFilters?.query;
    let dateFrom = notificationsFilters?.dateFrom;
    let dateTo = notificationsFilters?.dateTo;
    let filterMessage;

    if (searchQuery && dateFrom && dateTo)
      filterMessage = `Filters - Search: ${searchQuery} | From: ${dateFrom} - ${dateTo}`;
    else if (searchQuery) filterMessage = `Filter - Search: ${searchQuery}`;
    else if (dateFrom && dateTo) filterMessage = `Filter - From: ${dateFrom} - ${dateTo}`;

    return filterMessage;
  };

  return (
    <>
      <Wrapper>
        <Header>
          <div>
            <i className="material-icons">inbox</i>
            <h2>Notification Center</h2>
          </div>
          <CloseDrawer onClick={handleClick} color="inherit" aria-label="Close drawer">
            <i className="material-icons">close</i>
          </CloseDrawer>
        </Header>
        <SearchWrapper>
          <SearchAndFilterBar
            request={{ dateFrom: undefined, dateTo: undefined }}
            search={fetchNotifications}
            clearData={clearNotifications}
            dateButton
            placeholder="Search Messages"
            type="notifications"
          />
        </SearchWrapper>
        <ScrollerWithInfiniteScroll
          fetch={() => {
            notificationsDataFrame.next();
          }}
          isLoading={isPending}
          list={notifications}
          whenItemVisible={({ user_notification_id: id }) => {
            markNotificationsAsRead({ ids: [id] });
          }}
        >
          {getNotificationModalMessage() && (
            <FilterLabel>{getNotificationModalMessage()}</FilterLabel>
          )}
          <MessageListWrapper>
            {notifications.map(message => (
              <Message
                bodyText={message.body}
                buttonText="Contact Customer Support"
                dateSent={`${new Date(message.utc_date)}`}
                isNew={!message.is_read}
                title={message.title}
                id={message.user_notification_id}
                passThroughRef={message.ref}
                // onClick={() => markNotificationsAsRead({ ids: [message.user_notification_id] })}
              />
            ))}
            {notifications && isPending && <Loader />}
          </MessageListWrapper>
        </ScrollerWithInfiniteScroll>
      </Wrapper>
    </>
  );
};

NotificationCenter.propTypes = {
  handleClick: PropTypes.func.isRequired,
  markNotificationsAsRead: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.shape({})),
  notificationsDataFrame: PropTypes.shape({})
};

NotificationCenter.defaultProps = {
  markNotificationsAsRead: () => {},
  notifications: [],
  notificationsDataFrame: {}
};

const mapStateToProps = state => ({
  token: getToken(state),
  notificationsFilters: getNotificationsFilters(state)
});

const mapDispatchToProps = dispatch => ({
  fetchNotifications: args => dispatch(fetchNotifications(args)),
  clearNotifications: () => dispatch(clearNotifications())
});

const mergeProps = (
  { token, ...stateProps },
  { fetchNotifications, clearNotifications },
  ownProps
) => ({
  fetchNotifications: args => fetchNotifications({ token, ...args }),
  clearNotifications: () => clearNotifications(),
  ...stateProps,
  ...ownProps
});

const ConnectedNotificationCenter = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NotificationCenter);

export default ConnectedNotificationCenter;
