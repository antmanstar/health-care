import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import withStoreData from '../../../containers/base/withStoreData';
import logoImg from '@evry-member-app/assets/images/vector/logo.svg';
import { Link as RouterLink } from 'react-router-dom';

const { fetchEvryContactInfo } = actions;
const { getSupportPhoneNumber, getToken } = selectors;

// Main Footer

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${props => props.theme.gradients.main};
  color: white;

  img {
    height: 14px;
    margin-right: auto;
  }

  p {
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    margin: 0;
  }

  i {
    font-size: 14px;
    font-weight: 300;
    margin-right: 8px;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhoneNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  margin-left: auto;
`;

const Footer = ({ phoneNumber }) => (
  <Wrapper>
    <LeftWrapper>
      <RouterLink to="/">
        <img src={logoImg} alt="Evry Logo" />
      </RouterLink>
    </LeftWrapper>
    <CenterWrapper>
      <p>
        &copy;
        {` 2018-`}
        {Moment(new Date()).format('YYYY')}
        {` | Evry Health, Inc`}
      </p>
    </CenterWrapper>
    <PhoneNumber>
      {phoneNumber && (
        <>
          <i className="material-icons">phone</i>
          <p>{`1-${phoneNumber}`}</p>
        </>
      )}
    </PhoneNumber>
  </Wrapper>
);

Footer.propTypes = {
  phoneNumber: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: getToken(state),
  phoneNumber: getSupportPhoneNumber(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEvryContactInfo: token => {
    dispatch(fetchEvryContactInfo(token));
  }
});

const mergeProps = ({ token, ...stateProps }, { fetchEvryContactInfo }, ownProps) => ({
  fetch: () => fetchEvryContactInfo(token),
  shouldFetch: isEmpty(stateProps.phoneNumber),
  ...stateProps,
  ...ownProps
});

export default withStoreData(Footer, mapStateToProps, mapDispatchToProps, mergeProps);
