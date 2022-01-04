// import { combineReducers } from "redux";
import get from 'lodash/get';
import * as types from './types';

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_INBOX_FILTERS:
      return { ...state, inboxFilters: {} };
    case types.CLEAR_VIEW_DESCRIPTION:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          description: null
        }
      };
    case types.CLEAR_VIEW_ICON:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          icon: null
        }
      };
    case types.CLEAR_VIEW_SUBTITLE:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          subtitle: null
        }
      };
    case types.CLEAR_VIEW_TITLE:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          title: null
        }
      };
    case types.CLOSE_MOBILE_FILTERS:
      return { ...state, mobileFiltersOpen: false };
    case types.CLOSE_NEW_SUPPORT_REQUEST_MODAL:
      return { ...state, newSupportRequestModalOpen: false, supportRequestContent: null };
    case types.HIDE_MODAL:
      return { ...state, currentModal: null, modalData: null };
    case types.OPEN_MOBILE_FILTERS:
      return { ...state, mobileFiltersOpen: true };
    case types.OPEN_NEW_SUPPORT_REQUEST_MODAL:
      return {
        ...state,
        newSupportRequestModalOpen: true,
        supportRequestContent: action.supportRequestContent
      };
    case types.SAVE_INBOX_FILTERS:
      return { ...state, inboxFilters: action.payload };
    case types.SET_MODAL_DATA:
      return { ...state, modalData: action.modalData };
    case types.SET_VIEW_DESCRIPTION:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          description: action.payload.description
        }
      };
    case types.SET_VIEW_ICON:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          icon: action.payload.icon
        }
      };
    case types.SET_VIEW_SUBTITLE:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          subtitle: action.payload.subtitle
        }
      };
    case types.SET_VIEW_TITLE:
      return {
        ...state,
        view: {
          ...get(state, ['view'], {}),
          title: action.payload.title
        }
      };
    case types.SHOW_MODAL:
      return { ...state, currentModal: action.currentModal };
    default:
      return state;
  }
};

export default appReducer;
