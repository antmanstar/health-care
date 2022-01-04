/* stylelint-disable no-descending-specificity  */
import styled from 'styled-components/native';
import { style as sharedStyles } from '@evry-member-app/shared'

// Building the theme

const { colors, gradients, components } = sharedStyles.themes.main;

// Assembling the theme

const theme = {
  colors,
  gradients,
  components: {
    // Container: styled.div`${components.Container}`,
    // DateWrapper: styled.div`${components.DateWrapper}`,
    // DateWrapperIcon: styled.i`${components.DateWrapperIcon}`,
    // FormLabel: styled.h4`${components.FormLabel}`,
    // Scrim: styled.div`${components.Scrim}`,
    // Input: styled.input`${components.Input}`,
    // LayoutWrapper: styled.div`${components.LayoutWrapper}`,
    // MobileModalBackButton: styled.button`${components.MobileModalBackButton}`,
    // MobileModalDivider: styled.div`${components.MobileModalDivider}`,
    // MobileModalTitleWrapper: styled.div`${components.MobileModalTitleWrapper}`,
    // MobileModalTitle: styled.h2`${components.MobileModalTitle}`,
    // MobileModalFlexColumn: styled.div`${components.MobileModalFlexColumn}`,
    MobileSectionBackground: styled.View`${components.MobileSectionBackground}`,
    // MobileContainer: styled.div`${components.MobileContainer}`,
    MobileContentWrapper: styled.View`${components.MobileContentWrapper}`,
    MobileFixedBottomButton: styled.View`${components.MobileFixedBottomButton}`,
    // MobileInput: styled.input`${components.MobileInput}`,
    // MobileListTitle: styled.h2`${components.MobileListTitle}`,
    // MobileModalListTitle: styled.h2`${components.MobileModalListTitle}`,
    // MobileSectionInstruction: styled.p`${components.MobileSectionInstruction}`,
    // MobileTextArea: styled.textarea`${components.MobileTextArea}`,
    // ModalBody: styled.div`${components.ModalBody}`,
    // ModalButtonsCenter: styled.div`${components.ModalButtonsCenter}`,
    // ModalButtonsRight: styled.div`${components.ModalButtonsRight}`,
    // ModalHalfColumn: styled.div`${components.ModalHalfColumn}`,
    // ModalHeader: styled.div`${components.ModalHeader}`,
    // ModalSectionDivider: styled.hr`${components.ModalSectionDivider}`,
    // ModalTextArea: styled.textarea`${components.ModalTextArea}`,
    // ModalTitle: styled.h2`${components.ModalTitle}`,
    // ModalWrapper: styled.div`${components.ModalWrapper}`,
    // SectionBackground: styled.div`${components.SectionBackground}`,
    SectionDivider: styled.View`${components.SectionDivider}`,
    // SpaceBetween: styled.div`${components.SpaceBetween}`,
    // TrimmedHeader: styled.div`${components.TrimmedHeader}`,
    // TwoColumnRow: styled.div`${components.TwoColumnRow}`
  }
};

export { theme as default };
