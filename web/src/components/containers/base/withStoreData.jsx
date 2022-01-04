import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const runFetch = (shouldFetch, fetch) => {
  if (typeof shouldFetch === 'function' ? shouldFetch() : shouldFetch) {
    fetch();
  }
};

export default function withStoreData(WrappedComponent, ...connectMaps) {
  return connect(...connectMaps)(
    class extends React.Component {
      static propTypes = {
        shouldFetch: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.func,
          PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.func]))
        ]),
        fetch: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.func)])
      };

      static defaultProps = {
        shouldFetch: false,
        fetch: () => {}
      };

      componentDidMount() {
        const { shouldFetch, fetch } = this.props;

        if (typeof fetch === 'object' && typeof shouldFetch === 'object') {
          Object.entries(shouldFetch).forEach(([name, shouldFetch]) =>
            runFetch(shouldFetch, fetch[name])
          );
        } else {
          runFetch(shouldFetch, fetch);
        }
      }

      render() {
        const redactedProps = { ...this.props };

        delete redactedProps.fetch;
        delete redactedProps.shouldFetch;

        return <WrappedComponent {...redactedProps} />;
      }
    }
  );
}
