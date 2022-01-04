/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SupportRequestList from './SupportRequestList';
import SectionHeaderWithIcon from '../../shared/desktop/SectionHeaderWithIcon';
import SmallButton from '../../shared/desktop/SmallButton';
import Pagination from '../../shared/desktop/Pagination';

// This is the Support Requests Section

const { SectionBackground, Container, SectionDivider, SpaceBetween } = defaultTheme.components;

const InnerWrapper = styled.div`
  & > * {
    display: inline-block;
    margin-left: 15px;
  }
`;

const PaginationWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const SupportRequestsSection = ({ paginator, requests, showCompleted, showModal }) => (
  <>
    <SectionBackground>
      <Container>
        <SpaceBetween>
          <SectionHeaderWithIcon
            title="Support Requests"
            subTitle="View your pending requests or submit a new one."
            icon="question_answer"
          />
          <InnerWrapper>
            <SmallButton
              text="New Support Request"
              onClick={() => {
                showModal('SUBMIT_NEW_SUPPORT_REQUEST');
              }}
            />
          </InnerWrapper>
        </SpaceBetween>
      </Container>
      <SectionDivider />
      <Container>
        <SupportRequestList showCompleted={showCompleted} list={requests} />
      </Container>
    </SectionBackground>
    <PaginationWrapper>{paginator && <Pagination paginator={paginator} />}</PaginationWrapper>
  </>
);

SupportRequestsSection.propTypes = {
  paginator: PropTypes.shape({}),
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  showCompleted: PropTypes.func,
  showModal: PropTypes.func
};

SupportRequestsSection.defaultProps = {
  paginator: {},
  requests: [],
  showCompleted: () => {},
  showModal: () => {}
};

export default SupportRequestsSection;
