import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import every from 'lodash/every';
import throttle from 'lodash/throttle';
import styled from 'styled-components';

const Scroller = styled.div`
  position: relative;
  margin-top: -48px;
  padding-top: 48px;
  height: calc(100vh - 148px);
  overflow-y: auto;
  z-index: 9;
`;

const ScrollerWithInfiniteScroll = ({ isLoading, list, whenItemVisible, fetch, ...props }) => {
  const [myState, _setMyState] = useState(0);
  const scrollerRef = useRef();

  const myStateRef = React.useRef(myState);

  const setMyState = data => {
    myStateRef.current = data;
    _setMyState(data);
  };

  useEffect(() => {
    setMyState({
      isLoading: isLoading,
      list: list,
      whenItemVisible: whenItemVisible,
      fetch: fetch
    });
  }, [isLoading, list, whenItemVisible, fetch]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.addEventListener('scroll', throttle(onScroll, 16), false);

      return () => {
        scrollerRef.current?.removeEventListener('scroll', onScroll, false);
      };
    }
  }, []);

  useEffect(() => {
    let numberOfItemsInView = (window.innerHeight - 200) / 200;
    if (every(list, item => Boolean(item.ref)) && list.length > 0) {
      for (let i = 0; i < numberOfItemsInView; i++) {
        if (!list[i]?.is_read && list[i]?.ref.current) whenItemVisible(list[i]);
      }
    }
  }, [list.length > 0]);

  const onScroll = () => {
    const { isLoading, list, whenItemVisible, fetch } = myStateRef.current;
    if (
      scrollerRef.current.scrollHeight - scrollerRef.current.scrollTop ===
        scrollerRef.current.clientHeight &&
      list.length &&
      !isLoading
    ) {
      fetch();
    }

    if (every(list, item => Boolean(item.ref))) {
      list.forEach(item => {
        if (
          !item.is_read &&
          item.ref.current &&
          item.ref.current.offsetTop >= scrollerRef.current.scrollTop &&
          item.ref.current.offsetTop <=
            scrollerRef.current.scrollTop + scrollerRef.current.clientHeight
        ) {
          whenItemVisible(item);
        }
      });
    }
  };

  return <Scroller ref={scrollerRef} {...props} />;
};

ScrollerWithInfiniteScroll.propTypes = {
  fetch: PropTypes.func,
  isLoading: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  whenItemVisible: PropTypes.func
};

export default ScrollerWithInfiniteScroll;
