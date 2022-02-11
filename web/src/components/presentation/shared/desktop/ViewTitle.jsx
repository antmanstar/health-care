import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import selectors from '@evry-member-app/shared/store/selectors';

const { getGroupId, getMemberId } = selectors;

// View Titles include the title of the view as well as the User's Member, Rx, and Group IDs
// Props - title, memberId, groupId

const mainBreakPoint = `1200px`;

const Wrapper = styled.div`
  margin: auto;
  padding-top: 95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  width: 100%;
  color: ${props => props.theme.colors.shades.white};

  @media (max-width: ${mainBreakPoint}) {
    padding-top: 108px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 24px;
    width: unset;
  }

  @media (max-width: 320px) {
    align-items: center;
    margin-left: 0px;
  }

  @media ${props => props.theme.device.desktopXL} {
    max-width: 1024px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: 900;

  @media ${props => props.theme.device.desktop} {
    font-size: 48px;
  }
`;

const MemberNumbers = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  font-weight: 300;

  @media (max-width: 600px) {
    text-align: left;
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 12px;
  }

  > div {
    margin-left: 32px;

    @media (max-width: 600px) {
      margin-left: 0;
    }

    &:last-child {
      font-weight: 700;

      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }

    > p {
      margin: 0 0 4px 0;
    }
  }
`;

const ViewTitle = ({ title, memberId, groupId }) => (
  <Wrapper>
    <Title>{title}</Title>
    {memberId && groupId ? (
      <MemberNumbers>
        <div>
          <p>Member &amp; Rx ID:</p>
          <p>Group ID:</p>
        </div>
        <div>
          <p>{memberId}</p>
          <p>{groupId}</p>
        </div>
      </MemberNumbers>
    ) : null}
  </Wrapper>
);

ViewTitle.propTypes = {
  title: PropTypes.string.isRequired,
  memberId: PropTypes.string,
  groupId: PropTypes.string
};

ViewTitle.defaultProps = {
  memberId: '',
  groupId: ''
};

const mapStateToProps = state => ({
  groupId: getGroupId(state),
  memberId: getMemberId(state)
});

export default connect(mapStateToProps)(ViewTitle);
