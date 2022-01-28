// pulled from: https://www.robinwieruch.de/react-infinite-scroll/
import React from 'react';
import PropTypes from 'prop-types';
import every from 'lodash/every';
import throttle from 'lodash/throttle';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const StyledLoadingSpinner = styled(Loader)`
  z-index: 10;
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  height: 80px;
  width: 80px;
`;

export default (Component, scrollTarget) =>
  class WithInfiniteScroll extends React.Component {
    static propTypes = {
      fetch: PropTypes.func,
      isLoading: PropTypes.bool,
      list: PropTypes.arrayOf(PropTypes.shape({})),
      whenItemVisible: PropTypes.func
    };

    static defaultProps = {
      fetch: () => {},
      isLoading: false,
      list: [],
      whenItemVisible: () => {}
    };

    constructor(props) {
      super(props);

      this.onScroll = throttle(this.onScroll.bind(this), 16);
      if (scrollTarget == null) {
        this.el = React.createRef();
      }
    }

    componentDidMount() {
      this.el.current.addEventListener('scroll', throttle(this.onScroll, 16), false);
    }

    componentWillUnmount() {
      this.el.current.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      const { fetch, isLoading, list, whenItemVisible } = this.props;

      if (
        this.el.current.scrollHeight - this.el.current.scrollTop === this.el.current.clientHeight &&
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
            item.ref.current.offsetTop >= this.el.current.scrollTop &&
            item.ref.current.offsetTop <= this.el.current.scrollTop + this.el.current.clientHeight
          ) {
            whenItemVisible(item);
          }
        });
      }
    };

    render() {
      const { isLoading } = this.props;
      return (
        <>
          <Component ref={this.el} {...this.props} />
          {isLoading && <StyledLoadingSpinner type="TailSpin" color="#00BFFF" />}
        </>
      );
    }
  };
