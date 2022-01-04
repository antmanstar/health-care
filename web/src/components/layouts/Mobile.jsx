import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import DefaultNavBar from '../presentation/shared/NavBar';
import MobileViewTitle from '../presentation/shared/mobile/MobileViewTitle';
import Footer from '../presentation/shared/Footer';
import MobileViewTitleBig from '../presentation/shared/mobile/MobileViewTitleBig';
import MobileActionButton from '../presentation/shared/mobile/MobileActionButton';
import Interpolation from '../../utils/Interpolation';
import NewSupportRequest from '../presentation/shared/SupportRequestModal/NewSupportRequest';
import withStoreData from '../containers/base/withStoreData';
import actions from '@evry-member-app/shared/store/actions';
import selectors from '@evry-member-app/shared/store/selectors';
import logoImg from '@evry-member-app/assets/images/vector/logo-big.svg';

const {
  openMobileFilters,
  fetchCareGuideInfo,
  fetchEvryContactInfo,
  closeNewSupportRequestModal
} = actions;
const {
  getSupportRequestContent,
  getCareGuideInfo,
  getNewSupportRequestModalStatus,
  getSupportPhoneNumber,
  getToken,
  getViewDescription,
  getViewIcon,
  getViewSubtitle,
  getViewTitle
} = selectors;

const MobileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const Header = styled.header`
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const ScrollableMainSection = styled.div`
  padding-bottom: ${props => (props.footer === true ? '64px' : '0')};
  display: flex;
  flex: 1;
  flex-direction: column;

  & > :first-child {
    padding-top: 48px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${props => props.theme.gradients.main};
  margin-bottom: -24px;
  padding: 48px 16px;

  &.tall {
    padding-bottom: 96px;
    margin-bottom: -80px;

    & > :first-child {
      padding-left: 0;
      padding-right: 0;
    }
    & > :nth-child(2) {
      margin: ${props => (props.filterOn ? '16px 0 0 32px' : 'inherit')};
    }
  }

  &.sign-in {
    justify-content: center;
    padding: 160px 0 128px;
  }

  &.none {
    display: none;
  }
`;

const MainSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  .modal-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  .modal-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 150ms;
  }
  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }
  .modal-exit-active {
    opacity: 0;
    transition: all 150ms;
  }
`;

const NewSupportRequestWithData = withStoreData(
  NewSupportRequest,
  state => ({
    token: getToken(state),
    phoneNumber: getSupportPhoneNumber(state),
    careGuide: getCareGuideInfo(state)
  }),
  dispatch => ({
    fetchCareGuideInfo: token => dispatch(fetchCareGuideInfo(token)),
    fetchEvryContactInfo: token => {
      dispatch(fetchEvryContactInfo(token));
    },
    closeNewSupportRequestModal: () => {
      dispatch(closeNewSupportRequestModal());
    }
  }),
  (
    { token, ...stateProps },
    { fetchCareGuideInfo, fetchEvryContactInfo, ...dispatchProps },
    ownProps
  ) => ({
    fetch: () => {
      fetchEvryContactInfo(token);
      fetchCareGuideInfo(token);
    },
    shouldFetch: isEmpty(stateProps.phoneNumber) || isEmpty(stateProps.careGuide),
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  })
);

const Mobile = props => {
  const {
    children,
    nav: NavBar,
    navProps,
    subtitle,
    title,
    icon,
    svgIcon,
    description,
    titleType,
    titleWrapperClass,
    filter,
    signIn,
    footer,
    openMobileFilters,
    newSupportRequestModalOpen,
    supportRequestContent
  } = props;

  return (
    <MobileWrapper>
      {signIn === true ? (
        <>
          <TitleWrapper className={titleWrapperClass}>
            <img src={logoImg} alt="Evry Healthcare" />
          </TitleWrapper>
          <MainSection>{children}</MainSection>
        </>
      ) : (
        <>
          {!isEmpty(navProps) && (
            <Header className="standard-mobile-header">
              <NavBar {...navProps} />
            </Header>
          )}
          <ScrollableMainSection footer={footer}>
            <TitleWrapper className={titleWrapperClass} filterOn={filter}>
              {(titleType === 'big' && (
                <MobileViewTitleBig
                  icon={icon}
                  title={title}
                  subtitle={subtitle}
                  description={description}
                />
              )) ||
                (titleType === 'standard' && (
                  <MobileViewTitle
                    icon={icon}
                    title={title}
                    subtitle={subtitle && subtitle}
                    svgIcon={svgIcon}
                  />
                ))}
              {filter === true && (
                <MobileActionButton
                  onClick={openMobileFilters}
                  text="filter"
                  size="small"
                  type="inverse"
                />
              )}
            </TitleWrapper>
            <MainSection>{children}</MainSection>
          </ScrollableMainSection>
          {footer === true && <Footer />}
          <ModalWrapper>
            <CSSTransition
              in={newSupportRequestModalOpen}
              classNames="modal"
              timeout={150}
              unmountOnExit
            >
              <NewSupportRequestWithData content={supportRequestContent} />
            </CSSTransition>
          </ModalWrapper>
        </>
      )}
    </MobileWrapper>
  );
};

Mobile.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  nav: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  navProps: PropTypes.shape({}),
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  svgIcon: PropTypes.bool,
  titleType: PropTypes.oneOf(['standard', 'big', '']),
  titleWrapperClass: PropTypes.oneOf(['tall', 'sign-in', 'none', '']),
  filter: PropTypes.bool,
  onClick: PropTypes.func,
  footer: PropTypes.bool,
  signIn: PropTypes.bool,
  openMobileFilters: PropTypes.func.isRequired,
  newSupportRequestModalOpen: PropTypes.bool,
  supportRequestContent: PropTypes.string
};

Mobile.defaultProps = {
  children: "You shouldn't be seeing this; layouts should always contain views.",
  nav: DefaultNavBar,
  navProps: {},
  title: undefined,
  subtitle: undefined,
  icon: undefined,
  svgIcon: false,
  description: undefined,
  titleType: '',
  titleWrapperClass: '',
  filter: false,
  onClick: undefined,
  footer: false,
  signIn: false,
  newSupportRequestModalOpen: false,
  supportRequestContent: null
};

const mapStateToProps = (state, ownProps) => ({
  newSupportRequestModalOpen: getNewSupportRequestModalStatus(state),
  supportRequestContent: getSupportRequestContent(state),
  ...Object.entries(ownProps).reduce((prev, [propName, propValue]) => {
    if (propValue instanceof Interpolation) {
      return {
        ...prev,
        [propName]: propValue.interpolate(state)
      };
    }
    return prev;
  }, {}),
  description: getViewDescription(state),
  icon: getViewIcon(state),
  subtitle: getViewSubtitle(state),
  title: getViewTitle(state)
});

const mapDispatchToProps = dispatch => ({
  openMobileFilters: () => {
    dispatch(openMobileFilters());
  }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  icon: ownProps.icon || stateProps.icon,
  subtitle: ownProps.subtitle || stateProps.subtitle,
  title: ownProps.title || stateProps.title
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Mobile);
