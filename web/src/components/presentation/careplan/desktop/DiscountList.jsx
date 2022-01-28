import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// DESKTOP: Discount List

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;

  @media ${props => props.theme.device.tabletXL} {
    width: calc(33.33% - 16px);
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.shades.blue};
`;

const List = styled.ul`
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 4px;
  }
`;

const Icon = styled.i`
  margin-top: -3px;
  color: ${props => props.theme.colors.roles.success};
  margin-right: 8px;
`;

const DiscountList = React.memo(({ title, items }) => (
  <Wrapper>
    <Title>{title}</Title>
    <List>
      {items &&
        items.map(item => (
          <div key={item.id}>
            <li>
              <Icon className="material-icons">check</Icon>
              {item.benefit_name}
            </li>
          </div>
        ))}
    </List>
  </Wrapper>
));

DiscountList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default DiscountList;
