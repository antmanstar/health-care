/* stylelint-disable no-descending-specificity  */
import { css } from 'styled-components';

// Building the theme

const colors = {
  shades: {
    white: '#ffffff',
    nearlyWhite: '#f4f4f4',
    blue: '#00263a',
    tealBlue: '#02324c',
    darkTealBlue: '#022639',
    grayTeal: '#9aabb4',
    pinkRed: '#f03a47',
    pinkOrange: '#f9423a',
    gray: '#959595',
    mediumGray: '#bbbcbc',
    darkGray: '#4a4a4b',
    black: '#252526'
  },
  // TODO: replace usage of colors.shades.shadeName
  // with an appropriate colors.roles.roleName, when
  // roles become solidified
  roles: {
    danger: '#f03a47',
    success: '#8ed081',
    warning: '#f9c22e',
    pending: '#f9c22e',
    actionRequired: '#f03a47'
  }
};

// Assembling the theme

const theme = {
  colors,
  gradients: {
    main: `linear-gradient(to bottom right, ${colors.shades.darkTealBlue}, ${
      colors.shades.tealBlue
    })`
  },
  components: {
    Container: css`
      height: 100%;
      width: 100%;
      padding: 32px;
      box-sizing: border-box;
    `,
    FormLabel: css`
      margin-bottom: 16px;
      font-weight: 400;
      color: ${props => props.theme.colors.shades.blue};
    `,
    Scrim: css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #000000;
      opacity: 0.32;
      z-index: 100;
    `,
    Input: css`
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 8px;
      padding: 0 16px;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
      background: ${props => props.theme.colors.shades.nearlyWhite};
      color: ${props => props.theme.colors.shades.blue};
      border: 1px solid transparent;
      border-radius: 4px;

      &:last-child {
        margin-bottom: 0;
      }

      ::placeholder {
        font-weight: 300;
        color: ${props => props.theme.colors.shades.gray};
      }

      &:hover {
        border-color: ${props => props.theme.colors.shades.mediumGray};
      }

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.shades.darkGray};
      }

      &.error {
        border-color: ${props => props.theme.colors.roles.danger};
      }
    `,
    LayoutWrapper: css`
      margin: 0 auto 16px;
    `,
    MobileModalBackButton: css`
      position: absolute;
      top: 16px;
      font-size: 12px;
      font-weight: 500;
      color: ${props => props.theme.colors.shades.white};
      outline: none;
      background: none;
      border: none;
      padding: 0;
      text-transform: uppercase;
    `,
    MobileModalDivider: css`
      padding: 0 0 12px;
      width: 100%;
      border-bottom: solid 1px ${props => props.theme.colors.shades.white};
    `,
    MobileModalTitleWrapper: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 64px 0 8px;
    `,
    MobileModalTitle: css`
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    `,
    MobileModalFlexColumn: css`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 100vh;
    `,
    MobileSectionBackground: css`
      width: 100%;
      margin: 0 auto 8px;
      background: ${props => props.theme.colors.shades.white};
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    `,
    MobileContainer: css`
      padding: 16px;
    `,
    MobileContentWrapper: css`
      width: calc(100% - 32px);
      margin: 0 auto;

      &.no-margin-on-last {
        > *:last-child {
          margin-bottom: 0;
        }
      }
    `,
    MobileFixedBottomButton: css`
      position: relative;
      padding: 16px;
      border-top: 1px solid #ebebeb;
      z-index: 10;
      margin-top: auto;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
    `,
    MobileInput: css`
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 16px;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      background: ${props => props.theme.colors.shades.white};
      color: ${props => props.theme.colors.shades.blue};
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

      ::placeholder {
        font-weight: 300;
        color: ${props => props.theme.colors.shades.gray};
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        border-color: ${props => props.theme.colors.shades.mediumGray};
      }

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.shades.darkGray};
      }

      &.error {
        border-color: ${props => props.theme.colors.roles.danger};
      }
    `,
    MobileListTitle: css`
      margin: 24px 0 16px;
      font-size: 16px;
      font-weight: 700;
      color: ${props => props.theme.colors.shades.blue};
    `,
    MobileModalListTitle: css`
      margin: 24px 0 16px;
      font-size: 16px;
      font-weight: 300;
      color: ${props => props.theme.colors.shades.white};
    `,
    MobileSectionInstruction: css`
      margin: 0;
      font-size: 13px;
      font-weight: 400;
      color: ${props => props.theme.colors.shades.gray};
    `,
    MobileTextArea: css`
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 16px;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      background: ${props => props.theme.colors.shades.white};
      color: ${props => props.theme.colors.shades.blue};
      border: 1px solid transparent;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

      ::placeholder {
        font-weight: 300;
        color: ${props => props.theme.colors.shades.gray};
      }

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        border-color: ${props => props.theme.colors.shades.mediumGray};
      }

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.shades.darkGray};
      }

      &.error {
        border-color: ${props => props.theme.colors.roles.danger};
      }
    `,
    ModalBody: css`
      margin: 32px 0;
    `,
    ModalButtonsCenter: css`
      display: flex;
      justify-content: center;

      button {
        margin: 0 8px;
      }
    `,
    ModalButtonsRight: css`
      display: flex;
      justify-content: flex-end;

      button:last-child {
        margin-left: 8px;
      }
    `,
    ModalHalfColumn: css`
      width: calc(50% - 4px);
    `,
    ModalHeader: css`
      margin: -48px -48px 0;
      padding: 48px 48px 24px;
      background: ${props => props.theme.colors.shades.nearlyWhite};
      border-radius: 4px 4px 0 0;
    `,
    ModalSectionDivider: css`
      margin: 24px 0;
      border: none;
      border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
    `,
    ModalTextArea: css`
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 8px;
      padding: 0 16px;
      line-height: 48px;
      font-size: 16px;
      font-weight: 400;
      background: ${props => props.theme.colors.shades.nearlyWhite};
      color: ${props => props.theme.colors.shades.blue};
      border: 1px solid transparent;
      border-radius: 4px;

      &:last-child {
        margin-bottom: 0;
      }

      ::placeholder {
        font-weight: 300;
        color: ${props => props.theme.colors.shades.gray};
      }

      &:hover {
        border-color: ${props => props.theme.colors.shades.mediumGray};
      }

      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.shades.darkGray};
      }
    `,
    ModalTitle: css`
      margin: 0;
      font-size: 24px;
      font-weight: 400;
      color: ${props => props.theme.colors.shades.blue};
    `,
    ModalWrapper: css`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 432px;
      width: 80%;
      max-width: 800px;
      padding: 48px;
      background: ${props => props.theme.colors.shades.white};
      border-radius: 4px;
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
      box-sizing: border-box;
      z-index: 100;
      &.narrow {
        max-width: 650px;
      }
      &.extra-narrow {
        max-width: 500px;
      }
    `,
    SectionBackground: css`
      background: ${props => props.theme.colors.shades.white};
      width: 100%;
      margin: 0 auto 16px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    `,
    SectionDivider: css`
      margin: 0;
      border: none;
      border-bottom: 1px solid ${props => props.theme.colors.shades.nearlyWhite};
    `,
    SpaceBetween: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    TrimmedHeader: css`
      height: 100px;
      width: 100%;
      background: ${props => props.theme.colors.shades.nearlyWhite};
      clip-path: polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 50% 100%, 50% 100%, 0 80%, 0 0);
      z-index: -1;
      &.long {
        height: 220px;
      }
      &.short {
        height: 60px;
      }
    `,
    TwoColumnRow: css`
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 32px;
      &:last-child {
        margin: 0;
      }
    `
  }
};

export { theme as default };
