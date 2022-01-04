import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import images from '../../../../utils/images';

// Main Nav within Desktop NavBar

const mainBreakPoint = `1200px`;

const Navigation = styled.ul`
  height: 64px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: ${mainBreakPoint}) {
    height: 40px;
    width: 100%;
    justify-content: space-between;
  }
`;

const NavItem = styled.li`
  display: inline-block;
  margin-right: 32px;
  @media (max-width: ${mainBreakPoint}) {
    margin-right: 0;
  }
`;

const Link = styled.li`
  display: inline-block;
  position: relative;
  margin-right: 32px;
  color: ${props =>
    props.active ? props.theme.colors.shades.white : props.theme.colors.shades.grayTeal};
  border-bottom: ${props =>
    props.active ? `3px solid ${props.theme.colors.shades.pinkOrange}` : 'none'};
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.shades.white};
  }

  @media (max-width: ${props => props.theme.breakpointSizes.desktop}) {
    letter-spacing: 0.2px;
  }

  &:last-child ul {
    @media (max-width: ${mainBreakPoint}) {
      left: auto;
      right: 0;
    }
  }
`;

const OurNavLink = styled(NavLink)`
  padding-bottom: 4px;
  color: ${props => props.theme.colors.shades.grayTeal};
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  line-height: 32px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover,
  &.active {
    color: ${props => props.theme.colors.shades.white};
  }
  &.active {
    border-bottom: ${props => `3px solid ${props.theme.colors.shades.pinkOrange}`};
  }
`;

const Dropdown = styled(Link)`
  margin-right: 0;
  &:hover {
    color: ${props => props.theme.colors.shades.white};
    line-height: 64px;
  }
`;

const DropdownModal = styled.ul`
  display: none;
  position: absolute;
  top: 85%;
  left: 0;
  padding: 16px 32px;
  list-style: none;
  background: white;
  border-radius: 4px;
  width: 215%;
  min-width: 210px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);

  &:hover {
    display: block;
  }

  ${/* sc-selector */ Dropdown}:hover & {
    display: block;
  }
`;

const DropDownItem = styled(Link)`
  margin: 0;
  display: flex;
  align-items: center;

  img {
    margin-right: 24px;
    width: 16px;
  }
`;

const DropDownLink = styled(NavLink)`
  text-decoration: none;
  text-shadow: none;
  line-height: 2.2rem;
  display: block;
  color: ${props => props.theme.colors.shades.blue};
  &:hover,
  &.active {
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
`;

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navigation>
        <NavItem>
          <OurNavLink to="/plan" activeClassName="active">
            My Care Plan
          </OurNavLink>
        </NavItem>
        <NavItem>
          <OurNavLink to="/coverage" activeClassName="active">
            My Coverage
          </OurNavLink>
        </NavItem>
        <NavItem>
          <OurNavLink to="/claims" activeClassName="active">
            My Claims
          </OurNavLink>
        </NavItem>
        <NavItem>
          <OurNavLink to="/support" activeClassName="active">
            Customer Support
          </OurNavLink>
        </NavItem>
        <NavItem>
          <OurNavLink to="/documents" activeClassName="active">
            Document Center
          </OurNavLink>
        </NavItem>
        <Dropdown>
          Member Tools
          <DropdownModal>
            <DropDownItem>
              <img src={images["provider-lookup"]} alt="Provider Lookup" />
              <DropDownLink to="/provider-lookup" activeClassName="active">
                Provider Lookup
              </DropDownLink>
            </DropDownItem>
            <DropDownItem>
              <img src={images["formulary"]} alt="Prescription Formulary" />
              <DropDownLink to="https://www.google.com" activeClassName="active">
                Prescription Formulary
              </DropDownLink>
            </DropDownItem>
            <DropDownItem>
              <img src={images["expense-calculator"]} alt="Expense Calculator" />
              <DropDownLink to="https://www.google.com" activeClassName="active">
                Expense Calculator
              </DropDownLink>
            </DropDownItem>
          </DropdownModal>
        </Dropdown>
      </Navigation>
    );
  }
}

export default MainNavigation;
