/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SupportRequest from './SupportRequest';

// Support Requests List for the Support Request Section on the Customer Support View
// TODO: Need to bring in support requests from API

const { SectionDivider } = defaultTheme.components;

const Header = styled.h4`
  color: ${props => props.theme.colors.shades.blue};
  font-weight: 700;
  margin: 0 0 20px;
`;

const Grouping = styled.div`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Center = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media ${defaultTheme.device.tablet} {
    flex-direction: row;
  }
  p {
    margin: 0 4px 0 0;
    color: ${props => props.theme.colors.shades.gray};
  }
`;

const Button = styled.button`
  padding: 0;
  font-size: 16px;
  font-weight: 300;
  color: ${props => props.theme.colors.shades.pinkOrange};
  border: none;
  border-radius: 4px;
  outline: none;
  background: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

class SupportRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompleted: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { showCompleted } = this.props;
    if (this.state.showCompleted !== prevState.showCompleted) {
      showCompleted(this.state.showCompleted);
    }
  }

  render() {
    const { list, children } = this.props;
    const { showCompleted } = this.state;
    return (
      <>
        <Grouping>
          <Header>{showCompleted ? 'Completed Requests' : 'Pending Requests'}</Header>
          {children}
          {list.map(item => {
            return <SupportRequest key={item.requestNumber} {...item} />;
          })}
        </Grouping>
        <SectionDivider />
        {/* {!showCompleted ? (
          <Center>
            <p>Looking for a completed request? </p>
            <Button type="button" onClick={() => this.setState({ showCompleted: true })}>
              Show Completed Requests
            </Button>
            {`.`}
          </Center>
        ) : (
          <Center>
            <p>Looking for just pending requests? </p>
            <Button type="button" onClick={() => this.setState({ showCompleted: false })}>
              Show Pending Requests
            </Button>
            {`.`}
          </Center>
        )} */}
      </>
    );
  }
}

SupportRequestList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  showCompleted: PropTypes.func
};

SupportRequestList.defaultProps = {
  list: [],
  showCompleted: () => {}
};

export default SupportRequestList;
