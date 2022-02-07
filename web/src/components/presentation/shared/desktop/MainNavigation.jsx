import React, { useState } from 'react';
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
    max-width: ${props => (props.mobileOpen ? '270px' : '0')};
    box-shadow: 0px 0px 50px #232931;
    position: fixed;
    top: 0;
    right: 0;
    align-items: flex-start;
    background: #022b41;
    height: 100%;
    flex-direction: column;
    padding-top: 50px;
    z-index: 1;
    transition: max-width 0.3s ease-in;
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

  @media (max-width: ${mainBreakPoint}) {
    white-space: nowrap;
    border-bottom: none;
  }
`;

const NavItem = styled.li`
  display: inline-block;
  margin-right: 32px;
  @media (max-width: ${mainBreakPoint}) {
    width: 100%;
    margin-right: 0;
    padding: 20px 30px 20px 30px;
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

const Dropdown = styled(Link)`
  margin-right: 0;
  &:hover {
    color: ${props => props.theme.colors.shades.white};
    line-height: 64px;
  }

  @media (max-width: ${mainBreakPoint}) {
    white-space: nowrap;
    line-height: unset;
    width: 100%;
    padding: 20px 30px 20px 30px;
    &:hover {
      line-height: unset;
    }
    i {
      margin-left: 15px;
      font-size: 20px;
    }
  }
`;

const DropdownLabel = styled.div`
  @media (max-width: ${mainBreakPoint}) {
    display: flex;
    align-items: center;
  }
`;

const DropdownModal = styled.ul`
  display: none;
  position: absolute;
  top: 85%;
  left: 0;
  padding: 16px 16px;
  list-style: none;
  background: white;
  border-radius: 4px;
  width: 215%;
  min-width: 230px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);

  &:hover {
    display: block;
  }

  ${/* sc-selector */ Dropdown}:hover & {
    display: block;
  }

  @media (max-width: ${mainBreakPoint}) {
    display: block;
    overflow: hidden;
    position: static;
    top: initial;
    left: initial;
    padding: 0;
    padding-top: 10px;
    list-style: none;
    border-radius: 0;
    width: auto;
    box-shadow: unset;
    background: none;
    max-height: ${props => (props.memberToolsOpen ? '300px' : '0')};
    transition: max-height 0.2s ease-in;
`;

const DropDownItem = styled(Link)`
  margin: 0;
  display: flex;
  flex-wrap: column;
  align-items: center;

  img {
    margin-right: 12px;
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
  @media (max-width: ${mainBreakPoint}) {
    color: ${props => props.theme.colors.shades.white};
  }
`;

const DropDownLinkExternal = styled.a`
  text-decoration: none;
  text-shadow: none;
  line-height: 2.2rem;
  display: block;
  color: ${props => props.theme.colors.shades.blue};
  &:hover,
  &.active {
    color: ${props => props.theme.colors.shades.pinkOrange};
  }
  @media (max-width: ${mainBreakPoint}) {
    color: ${props => props.theme.colors.shades.white};
  }
`;

const MainNavigation = ({ mobileOpen, setMobileMenuOpen }) => {
  const [memberToolsOpen, setMemberToolsOpen] = useState(false);

  const toggleMemberTools = () => {
    console.log(memberToolsOpen);
    mobileOpen && setMemberToolsOpen(!memberToolsOpen);
  };

  const hideMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Navigation mobileOpen={mobileOpen}>
      <NavItem>
        <OurNavLink to="/plan" onClick={() => hideMenu()} activeClassName="active">
          My Care Plan
        </OurNavLink>
      </NavItem>
      <NavItem>
        <OurNavLink to="/coverage" onClick={() => hideMenu()} activeClassName="active">
          My Coverage
        </OurNavLink>
      </NavItem>
      <NavItem>
        <OurNavLink to="/claims" onClick={() => hideMenu()} activeClassName="active">
          My Claims
        </OurNavLink>
      </NavItem>
      <NavItem>
        <OurNavLink to="/support" onClick={() => hideMenu()} activeClassName="active">
          Customer Support
        </OurNavLink>
      </NavItem>
      <NavItem>
        <OurNavLink to="/documents" onClick={() => hideMenu()} activeClassName="active">
          Document Center
        </OurNavLink>
      </NavItem>
      <Dropdown onClick={() => toggleMemberTools()}>
        <DropdownLabel>
          Member Tools
          {mobileOpen ? (
            memberToolsOpen ? (
              <i className="material-icons">keyboard_arrow_up_icon</i>
            ) : (
              <i className="material-icons">keyboard_arrow_down_icon</i>
            )
          ) : (
            undefined
          )}
        </DropdownLabel>
        <DropdownModal memberToolsOpen={memberToolsOpen}>
          <DropDownItem>
            <img src={images['provider-lookup']} alt="Provider Lookup" />
            <DropDownLink to="/provider-lookup" onClick={() => hideMenu()} activeClassName="active">
              Provider Lookup
            </DropDownLink>
          </DropDownItem>
          {/* <DropDownItem>
            <img src={images['formulary']} alt="Prescription Formulary" />
            <DropDownLink to="https://www.google.com" activeClassName="active">
              Prescription Formulary
            </DropDownLink>
          </DropDownItem>
          <DropDownItem>
            <img src={images['expense-calculator']} alt="Expense Calculator" />
            <DropDownLink to="https://www.google.com" activeClassName="active">
              Expense Calculator
            </DropDownLink>
          </DropDownItem> */}
          <DropDownItem onClick={() => hideMenu()}>
            <img src={images['local-pharmacy-black']} alt="Pharmacy Lookup" />
            <DropDownLinkExternal
              href="https://magellanrx.com/member/external/commercial/common/doc/en-us/MRx_Pharmacy_Network_List.pdf"
              target="_blank"
            >
              Pharmacy Lookup
            </DropDownLinkExternal>
          </DropDownItem>
          <DropDownItem onClick={() => hideMenu()}>
            <img src={images['medical-services-black']} alt="Out-of-Area Provider Lookup" />
            <DropDownLinkExternal
              href="https://multiplan.com/webcenter/portal/ProviderSearch"
              //className="active"
              target="_blank"
            >
              Out-of-Area Provider Lookup
            </DropDownLinkExternal>
          </DropDownItem>
        </DropdownModal>
      </Dropdown>
    </Navigation>
  );
};

export default MainNavigation;
