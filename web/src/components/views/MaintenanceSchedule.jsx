import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import styled from 'styled-components';
import icon from '../../../../assets/images/vector/handyman.svg';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import { Sparse } from '../layouts';
import history from '../../utils/history';

const { getActiveMaintenanceSchedule } = actions;

const { getMaintenanceScheduleError, getMaintenanceSchedule } = selectors;

const MaintenanceScheduleWrapper = styled.div``;

const ContentMaintenance = styled.div`
  display: flex;
  align-items: center;
  .content-text {
    margin-left: 73px;
  }
`;

const Icon = styled.img``;

const Title = styled.p`
  font-size: 45px;
  line-height: 52.73px;
  color: #00263a;
  font-family: 'Roboto';
  font-weight: 500;
  margin: 0 0 59px 0;
`;

const Text = styled.p`
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 20px;
  line-height: 23.44px;
  margin: 0;
  max-width: 556px;
  ${props => props.marginTop}
  color: ${props => (props.color ? props.color : '#4a4a4b')};
`;

const MaintenanceSchedule = ({
  maintenanceScheduleError,
  maintenanceSchedule,
  getActiveMaintenanceSchedule
}) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (maintenanceSchedule?.length) {
      const { message, interval_in_minutes, start_at_utc } = maintenanceSchedule[0];
      setSchedule(prevState => [
        ...prevState,
        {
          message,
          interval_in_minutes,
          start_at_utc,
          showAlert: true
        }
      ]);
    } else {
      getActiveMaintenanceSchedule();
    }
  }, [maintenanceSchedule]);

  const { message } = schedule;

  return (
    <MaintenanceScheduleWrapper>
      <ContentMaintenance>
        <Icon src={icon}></Icon>
        <div className="content-text">
          <Title>Under Maintenance</Title>
          <Text>{message || 'The Evry Health Portal is down.'}</Text>
          <Text color="#ED5344" marginTop="margin-top:54px;">
            You won’t be able to sign in at this time.
          </Text>
        </div>
      </ContentMaintenance>
    </MaintenanceScheduleWrapper>
  );
};

const mapStateToProps = state => {
  return {
    maintenanceSchedule: getMaintenanceSchedule(state),
    maintenanceScheduleError: getMaintenanceScheduleError(state)
  };
};

const mapDispatchToProps = dispatch => ({
  getActiveMaintenanceSchedule: () => {
    dispatch(getActiveMaintenanceSchedule());
  }
});

const ConnectedMaintenanceSchedule = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceSchedule);

const reflection = {
  component: ConnectedMaintenanceSchedule,
  layout: Sparse,
  layoutProps: {
    title: 'Evry Member Portal',
    subtitle: ''
  },
  route: '/maintenance'
};

export default MaintenanceSchedule;

export { reflection };
