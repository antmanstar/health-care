/* stylelint-disable no-descending-specificity  */
import styled, { createGlobalStyle } from 'styled-components';
import { style as sharedStyles } from '@evry-member-app/shared'

// Building the theme

// in px units
const breakpointSizes = {
  mobile: '414px' /* newest large phones */,
  tablet: '768px' /* tablet */,
  tabletXL: '900px',
  desktop: '992px' /* small desktop */,
  desktopXL: '1370px' /* large desktop */
};

const device = {
  mobile: `(min-width: ${breakpointSizes.mobile})`,
  tablet: `(min-width: ${breakpointSizes.tablet})`,
  tabletXL: `(min-width: ${breakpointSizes.tabletXL})`,
  desktop: `(min-width: ${breakpointSizes.desktop})`,
  desktopXL: `(min-width: ${breakpointSizes.desktopXL})`
};

const { colors, gradients, components } = sharedStyles.themes.main;

// Assembling the theme

const theme = {
  breakpointSizes,
  colors,
  device,
  gradients,
  components: {
    GlobalStyle: createGlobalStyle`
      $font-path: '~react-widgets/lib/fonts';
      $img-path: '~react-widgets/lib/img';

      @import '~react-widgets/lib/scss/react-widgets';

      body {
        background: ${props =>
          props.theme.colors.shades.darkTealBlue}; /* gradient won't work reliably on body el */
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-weight: 300;
        
        color: ${props => props.theme.colors.shades.darkGray};
        p {
          font-size: 16px;
          line-height: 1.5em;
        }

        button {
          cursor: pointer;
        }
      }

      body, html, .wrapper {
        min-height: 100%;
      }

      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
        background: ${props => props.theme.colors.shades.nearlyWhite};
      }

      .standard-desktop-header, .standard-desktop-section, .standard-desktop-footer {
        width: 94%;
        padding-right: 3%;
        padding-left: 3%;
        @media ${device.desktop} {
          padding: 0;
          width: 100%;
        }
      }

      .standard-desktop-section {
        flex: 1 auto;
        margin-bottom: 16px;
        max-width: 960px;
        margin-left: auto;
        margin-right: auto;

        @media ${device.desktopXL} {
          max-width: 1024px
        }
      }

      .standard-desktop-footer {
        flex-shrink: 0;
        margin-top: auto;
      }

      .standard-mobile-header, .standard-mobile-section, .standard-mobile-footer {
        width: 100%;
        box-sizing: border-box;
      }

      .standard-mobile-header {
        /* will fill in */
      }

      .standard-mobile-scrollable-section {
        padding-bottom: 50px;
      }

      .standard-mobile-section {
        padding-right: 4%;
        padding-left: 4%;
        padding-top: 20px;
      }

      .standard-mobile-footer {
        /* this will get filled in */
      }
    `,
    Container: styled.div`${components.Container}`,
    DateWrapper: styled.div`${components.DateWrapper}`,
    DateWrapperIcon: styled.i`${components.DateWrapperIcon}`,
    FormLabel: styled.h4`${components.FormLabel}`,
    Scrim: styled.div`${components.Scrim}`,
    Input: styled.input`${components.Input}`,
    LayoutWrapper: styled.div`${components.LayoutWrapper}`,
    MobileModalBackButton: styled.button`${components.MobileModalBackButton}`,
    MobileModalDivider: styled.div`${components.MobileModalDivider}`,
    MobileModalTitleWrapper: styled.div`${components.MobileModalTitleWrapper}`,
    MobileModalTitle: styled.h2`${components.MobileModalTitle}`,
    MobileModalFlexColumn: styled.div`${components.MobileModalFlexColumn}`,
    MobileSectionBackground: styled.div`${components.MobileSectionBackground}`,
    MobileContainer: styled.div`${components.MobileContainer}`,
    MobileContentWrapper: styled.div`${components.MobileContentWrapper}`,
    MobileFixedBottomButton: styled.div`${components.MobileFixedBottomButton}`,
    MobileInput: styled.input`${components.MobileInput}`,
    MobileListTitle: styled.h2`${components.MobileListTitle}`,
    MobileModalListTitle: styled.h2`${components.MobileModalListTitle}`,
    MobileSectionInstruction: styled.p`${components.MobileSectionInstruction}`,
    MobileTextArea: styled.textarea`${components.MobileTextArea}`,
    ModalBody: styled.div`${components.ModalBody}`,
    ModalButtonsCenter: styled.div`${components.ModalButtonsCenter}`,
    ModalButtonsRight: styled.div`${components.ModalButtonsRight}`,
    ModalHalfColumn: styled.div`${components.ModalHalfColumn}`,
    ModalHeader: styled.div`${components.ModalHeader}`,
    ModalSectionDivider: styled.hr`${components.ModalSectionDivider}`,
    ModalTextArea: styled.textarea`${components.ModalTextArea}`,
    ModalTitle: styled.h2`${components.ModalTitle}`,
    ModalWrapper: styled.div`${components.ModalWrapper}`,
    SectionBackground: styled.div`${components.SectionBackground}`,
    SectionDivider: styled.hr`${components.SectionDivider}`,
    SpaceBetween: styled.div`${components.SpaceBetween}`,
    TrimmedHeader: styled.div`${components.TrimmedHeader}`,
    TwoColumnRow: styled.div`${components.TwoColumnRow}`
  }
};

export { theme as default };
