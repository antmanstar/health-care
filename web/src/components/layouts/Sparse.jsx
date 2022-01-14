import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultTheme from '../../style/themes';
import RegistrationHeaderBar from '../presentation/registration/desktop/RegistrationHeaderBar';
import ViewTitleAndSubtitle from '../presentation/shared/desktop/ViewTitleAndSubtitle';
import Footer from '../presentation/shared/Footer';
import Interpolation from '../../utils/Interpolation';

// Sparse Layout

const Header = styled.div`
  height: fit-conent;
  width: 100%;
  background: ${props => props.theme.gradients.main};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: ${props => props.theme.colors.shades.white};
`;

const MainSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column;
  padding-top: ${props => (props.fullWidth ? '0' : '8px')};

  &.standard-desktop-section {
    max-width: ${props => (props.fullWidth ? '100vw' : '960px')};

    @media ${defaultTheme.device.desktop} {
      padding-top: ${props => (props.fullWidth ? '0' : '64px')};
    }
    @media ${defaultTheme.device.desktopXL} {
      max-width: ${props => (props.fullWidth ? '100vw' : '1024px')};
    }
  }
`;

const Sparse = ({ children, title, subtitle, fullWidth }) => (
  <>
    <Wrapper>
      <Header>
        <section className="standard-desktop-section">
          <RegistrationHeaderBar />
          <ViewTitleAndSubtitle title={title} subtitle={subtitle} />
        </section>
      </Header>
      <MainSection className="standard-desktop-section" fullWidth={fullWidth}>
        {children}
      </MainSection>
      <Footer />
    </Wrapper>
  </>
);

const mapStateToProps = (state, ownProps) =>
  Object.entries(ownProps).reduce((prev, [propName, propValue]) => {
    if (propValue instanceof Interpolation) {
      return {
        ...prev,
        [propName]: propValue.interpolate(state)
      };
    }
    return prev;
  }, {});

Sparse.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  fullWidth: PropTypes.bool
};

Sparse.defaultProps = {
  subtitle: undefined,
  fullWidth: false
};

export default connect(mapStateToProps)(Sparse);
