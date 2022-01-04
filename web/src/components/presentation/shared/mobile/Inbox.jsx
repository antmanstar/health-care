import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import startCase from 'lodash/startCase';
import defaultTheme from '../../../../style/themes';
import ListMessage from './ListMessage';
import selectors from '@evry-member-app/shared/store/selectors';

const { getInboxFilters } = selectors;

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 16px;
  &.filtered {
    padding-top: 4.5em;
  }
`;

const Filters = styled.div`
  margin: -16px -16px 0;
  padding: 24px 16px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  background: ${props => props.theme.colors.shades.nearlyWhite};
  box-sizing: border-box;
  width: 100%;

  .filtered-by {
    display: block;
    clear: both;
    flex: 0 0 100%;
    color: ${props => props.theme.colors.shades.gray};
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

const Filter = styled.span`
  display: inline-block;
  margin-right: 8px;
  padding: 4px 12px;
  font-size: 14px;
  color: ${props => props.theme.colors.shades.white};
  background: ${props => props.theme.gradients.main};
`;

const Notifications = styled.div`
  width: auto;
`;

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { filters, onClick } = this.props;

    const reducedfilters =
      filters != null &&
      filters.dates != null &&
      filters.dates instanceof Object &&
      Object.keys(filters.dates).reduce((previous, filter) => {
        const current = previous.slice();
        if (filters.dates[filter] !== null) {
          const date = moment(filters.dates[filter]);
          current.push(
            <Filter>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              {startCase(filter)}: {date.format('MMM Do, YYYY')}
            </Filter>
          );
        }
        return current;
      }, []);

    return (
      <>
        {reducedfilters && reducedfilters.length > 0 ? (
          <>
            <Filters onClick={onClick}>
              <span className="filtered-by">Filtered by:</span>
              {reducedfilters}
            </Filters>
          </>
        ) : null}
        <Wrapper className={reducedfilters && reducedfilters.length > 0 ? 'filtered' : ''}>
          <Notifications>
            <ListMessage
              title="We scheduled your appointment"
              date="Seen on 04/19/2018"
              isNew
              readMore={false}
              preview="We’ve confirmed your appointment with Dr. Jacob Jefferson on Thursday (05/12/2018) at 10:30am. There is nothing else you need to do. If you have questions or concerns, please contact customer support."
            />
            <ListMessage
              title="We scheduled your appointment"
              date="Seen on 04/19/2018"
              isNew
              readMore={false}
              preview="We’ve confirmed your appointment with Dr. Jacob Jefferson on Thursday (05/12/2018) at 10:30am. There is nothing else you need to do. If you have questions or concerns, please contact customer support."
            />
            <ListMessage
              title="We scheduled your appointment"
              date="Seen on 04/19/2018"
              readMore={false}
              preview="We’ve confirmed your appointment with Dr. Jacob Jefferson on Thursday (05/12/2018) at 10:30am. There is nothing else you need to do. If you have questions or concerns, please contact customer support."
            />
            <ListMessage
              title="We scheduled your appointment"
              date="Seen on 04/19/2018"
              readMore={false}
              preview="We’ve confirmed your appointment with Dr. Jacob Jefferson on Thursday (05/12/2018) at 10:30am. There is nothing else you need to do. If you have questions or concerns, please contact customer support."
            />
            <ListMessage
              title="We scheduled your appointment"
              date="Seen on 04/19/2018"
              readMore={false}
              preview="We’ve confirmed your appointment with Dr. Jacob Jefferson on Thursday (05/12/2018) at 10:30am. There is nothing else you need to do. If you have questions or concerns, please contact customer support."
            />
          </Notifications>
        </Wrapper>
      </>
    );
  }
}

Inbox.propTypes = {
  filters: PropTypes.shape({}),
  onClick: PropTypes.func
};

Inbox.defaultProps = {
  filters: {},
  onClick: null
};

const mapStateToProps = state => ({
  filters: getInboxFilters(state)
});

export default connect(mapStateToProps)(Inbox);
