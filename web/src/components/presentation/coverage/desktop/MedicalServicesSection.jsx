import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../../style/themes';
import SectionHeader from '../../shared/desktop/SectionHeader';
import CollapsibleSection from '../../shared/desktop/CollapsibleSection';
import CoverageItem from './CoverageItem';
import Loader from '../../shared/Loader/Loader';

// List of Medical Services & Coverage Details for "My Coverage" View

const { SectionBackground, Container, SectionDivider } = defaultTheme.components;

class MedicalServicesSection extends Component {
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
    const { showInNetwork } = this.state;
    const { coverages, benefitType } = this.props;
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
            {benefitType === undefined ? (
              <Container>
                <Loader />
              </Container>
            ) : (
              <Container>
                <CollapsibleSection
                  visible
                  canToggleChildren={benefitType !== 'EPO'}
                  handleChildrenToggleClick={this.handlers.handleNetworkToggle}
                  active={showInNetwork}
                  title={coverage.category_name}
                >
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
              </Container>
            )}
            <SectionDivider />
          </>
        )
    );
    return CoveragesToRender;
  }

  render() {
    const { showInNetwork } = this.state;
    return (
      <SectionBackground>
        <Container>
          <SectionHeader
            title="Medical Services"
            subTitle="See how much your medical expenses will cost."
          />
        </Container>
        <SectionDivider />
        {showInNetwork ? this.renderCoverage(1) : this.renderCoverage(0)}
      </SectionBackground>
    );
  }
}

MedicalServicesSection.propTypes = {
  coverages: PropTypes.arrayOf(PropTypes.shape({})),
  benefitType: PropTypes.string.isRequired
};

MedicalServicesSection.defaultProps = {
  coverages: []
};

export default MedicalServicesSection;
