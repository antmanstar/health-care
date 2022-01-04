import React from 'react';
import styled from 'styled-components';
import withStoreData from '../../../containers/base/withStoreData';
import BottomBarSearch from './BottomBarSearch';
import BottomBarCard from './BottomBarCard';
import BottomBarInbox from './BottomBarInbox';
import selectors from '@evry-member-app/shared/store/selectors';

const { getUnreadNotifications } = selectors;

// Always present bottom bar on mobile

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 0 16px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
`;

const Icons = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const BottomBar = () => {
  const BottomBarInboxWithBadge = withStoreData(BottomBarInbox, state => ({
    unread: getUnreadNotifications(state)
  }));

  return (
    <Wrapper>
      <BottomBarSearch />
      <Icons>
        <BottomBarCard />
        <BottomBarInboxWithBadge />
      </Icons>
    </Wrapper>
  );
};

export default BottomBar;
