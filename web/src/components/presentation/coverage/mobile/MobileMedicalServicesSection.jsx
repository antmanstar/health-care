import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../../../style/themes';
import SectionHeader from '../../shared/desktop/SectionHeader';
import CollapsibleSection from '../../shared/desktop/CollapsibleSection';
import CoverageItem from '../desktop/CoverageItem';

// MOBILE: List of Medical Services & Coverage Details for Mobile Coverage View

const { MobileSectionBackground, MobileContainer, SectionDivider } = defaultTheme.components;

const NetworkToggleWrapper = styled.div`
  color: ${props => props.theme.colors.shades.mediumGray};
`;

const NetworkToggleButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props =>
    props.active ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.mediumGray};

  &:hover {
    color: ${props =>
      props.active ? props.theme.colors.shades.pinkOrange : props.theme.colors.shades.gray};
  }
`;

class MobileMedicalServicesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInNetwork: true
    };

    this.handlers = {
      handleNetworkToggle: this.handleNetworkToggle.bind(this)
    };
  }

  handleNetworkToggle = value => {
    this.setState({ showInNetwork: value });
  };

  renderCoverage(networkIndicator) {
    const { coverages } = this.props;
    let lastCoverageLabel;
    let lastAlt;

    const checkLastCoverageLabel = item => {
      let label = item.procedure_name;
      if (item.procedure_name === lastCoverageLabel) {
        label = '';
      }
      lastCoverageLabel = item.procedure_name;
      return label;
    };

    const checkLastAlt = (label, index) => {
      let alt = index % 2 !== 0;
      if (label === '') {
        alt = lastAlt;
      }
      lastAlt = alt;
      return alt;
    };

    const CoveragesToRender = coverages.map(
      coverage =>
        coverage.in_network_indicator === networkIndicator && (
          <>
            <MobileContainer>
              <CollapsibleSection visible canToggleChildren={false} title={coverage.category_name}>
                {coverage.benefit_coverages.map((item, index) => {
                  const label = checkLastCoverageLabel(item);
                  const alt = checkLastAlt(label, index);

                  return (
                    <CoverageItem
                      label={label}
                      coverage={item.coverage}
                      alt={alt}
                      note={item.note}
                    />
                  );
                })}
              </CollapsibleSection>
            </MobileContainer>
            <SectionDivider />
          </>
        )
    );
    return CoveragesToRender;
  }

  render() {
    const { showInNetwork } = this.state;
    const { benefitType } = this.props;
    return (
      <MobileSectionBackground>
        <MobileContainer>
          <SectionHeader
            title="Medical Services"
            subTitle="See how much your medical expenses will cost."
          />
        </MobileContainer>
        <SectionDivider />
        {benefitType !== 'EPO' && (
          <MobileContainer>
            <NetworkToggleWrapper>
              <NetworkToggleButton
                type="button"
                active={showInNetwork}
                onClick={() => this.handlers.handleNetworkToggle(true)}
              >
                In-Network
              </NetworkToggleButton>
              {` | `}
              <NetworkToggleButton
                type="button"
                active={!showInNetwork}
                onClick={() => this.handlers.handleNetworkToggle(false)}
              >
                Out-Of-Network
              </NetworkToggleButton>
            </NetworkToggleWrapper>
          </MobileContainer>
        )}
        {showInNetwork ? this.renderCoverage(1) : this.renderCoverage(0)}
      </MobileSectionBackground>
    );
  }
}

MobileMedicalServicesSection.propTypes = {
  coverages: PropTypes.arrayOf(PropTypes.shape({})),
  benefitType: PropTypes.string.isRequired
};

MobileMedicalServicesSection.defaultProps = {
  coverages: []
};

export default MobileMedicalServicesSection;
