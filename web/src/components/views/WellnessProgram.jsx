import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mobile } from '../layouts';
import defaultTheme from '../../style/themes';
import TitleAndParagraphCard from '../presentation/careplan/mobile/TitleAndParagraphCard';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';

const { clearViewSubtitle, clearViewTitle, setViewSubtitle, setViewTitle } = actions;
const { getWellnessGoal } = selectors;

// MOBILE: Care Plan - Partner Program View

const { MobileFixedBottomButton, MobileContentWrapper } = defaultTheme.components;

class WellnessProgram extends Component {
  componentDidMount() {
    const { setTitles } = this.props;
    setTitles();
  }

  componentWillUnmount() {
    const { clearTitles } = this.props;
    clearTitles();
  }

  render() {
    const { program } = this.props;

    return (
      <>
        <MobileContentWrapper>
          <TitleAndParagraphCard
            title="Program Description"
            content={[program.wellness_goal_description, program.wellness_goal_note]}
          />
        </MobileContentWrapper>
        <MobileFixedBottomButton>
          <MobileActionButton text="Sign up for the program" type="action" />
        </MobileFixedBottomButton>
      </>
    );
  }
}

WellnessProgram.propTypes = {
  clearTitles: PropTypes.func,
  location: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired
    }).isRequired
  }).isRequired,
  program: PropTypes.shape({}),
  setTitles: PropTypes.func
};

WellnessProgram.defaultProps = {
  clearTitles: () => {},
  program: {},
  setTitles: () => {}
};

const ConnectedWellnessProgram = withRouter(
  withStoreData(
    WellnessProgram,
    (state, ownProps) => ({
      program: getWellnessGoal({ state, id: ownProps.match.params.id })
    }),
    dispatch => ({
      clearTitles: () => {
        dispatch(clearViewSubtitle());
        dispatch(clearViewTitle());
      },
      setTitles: ({ subtitle, title }) => {
        dispatch(setViewSubtitle(subtitle));
        dispatch(setViewTitle(title));
      }
    }),
    ({ program }, { setTitles, ...dispatchProps }, ownProps) => ({
      program,
      setTitles: () => setTitles({ subtitle: '', title: program.wellness_goal_name }),
      ...dispatchProps,
      ...ownProps
    })
  )
);

const reflection = {
  component: ConnectedWellnessProgram,
  layout: Mobile,
  layoutProps: {
    subtitle: 'This Program is free for Evry Members.',
    titleType: 'standard',
    navProps: {
      left: 'back'
    }
  },
  route: '/wellness-program/:id'
};

export default WellnessProgram;

export { reflection };
