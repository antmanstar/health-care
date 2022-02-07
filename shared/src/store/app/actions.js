import * as types from './types'

export const clearInboxFilters = () => ({
  type: types.CLEAR_INBOX_FILTERS,
  payload: {}
})

export const closeMobileFilters = () => ({
  type: types.CLOSE_MOBILE_FILTERS,
  payload: {}
})

export const clearViewDescription = (title) => ({
  type: types.CLEAR_VIEW_DESCRIPTION
})

export const clearViewIcon = (title) => ({
  type: types.CLEAR_VIEW_ICON
})

export const clearViewSubtitle = () => ({
  type: types.CLEAR_VIEW_SUBTITLE
})

export const clearViewTitle = (title) => ({
  type: types.CLEAR_VIEW_TITLE
})

export const openMobileFilters = () => ({
  type: types.OPEN_MOBILE_FILTERS,
  payload: {}
})

export const openNewSupportRequestModal = (supportRequestContent) => ({
  type: types.OPEN_NEW_SUPPORT_REQUEST_MODAL,
  supportRequestContent
})

export const closeNewSupportRequestModal = () => ({
  type: types.CLOSE_NEW_SUPPORT_REQUEST_MODAL
})

export const hideModal = () => ({
  type: types.HIDE_MODAL
})

export const geoCoder = ({ address1, city, state, zip, token }) => ({
  type: types.GEOCODER,
  payload: {
    address1,
    city,
    state,
    zip,
    token
  }
})

export const geoLocationSearch = ({ city, state, zip, token }) => ({
  type: types.GEOLOCATIONSEARCH,
  payload: {
    city,
    state,
    zip,
    token
  }
})

export const providerSearch = ({
  page,
  searchWithinBound,
  recordsPerPage,
  search,
  orderBy,
  desc,
  location,
  bounds,
  languages,
  specialties,
  gender,
  token
}) => ({
  type: types.PROVIDER_SEARCH,
  payload: {
    page,
    searchWithinBound,
    recordsPerPage,
    search,
    orderBy,
    desc,
    location,
    bounds,
    languages,
    specialties,
    gender,
    token
  }
})

export const providerSearchQuery = (query) => ({
  type: types.PROVIDER_SEARCH_QUERY,
  payload: {
    ...query
  }
})

export const providerSearchQueryClear = () => ({
  type: types.PROVIDER_SEARCH_QUERY_CLEAR,
  payload: {}
})

export const saveInboxFilters = (startDate, endDate) => ({
  type: types.SAVE_INBOX_FILTERS,
  payload: {
    dates: {
      from: startDate,
      to: endDate
    }
  }
})

export const setModalData = (modalData) => ({
  type: types.SET_MODAL_DATA,
  modalData
})

export const setViewDescription = (description) => ({
  type: types.SET_VIEW_DESCRIPTION,
  payload: {
    description
  }
})

export const setViewIcon = (icon) => ({
  type: types.SET_VIEW_ICON,
  payload: {
    icon
  }
})

export const setViewSubtitle = (subtitle) => ({
  type: types.SET_VIEW_SUBTITLE,
  payload: {
    subtitle
  }
})

export const setViewTitle = (title) => ({
  type: types.SET_VIEW_TITLE,
  payload: {
    title
  }
})

export const showModal = (currentModal) => ({
  type: types.SHOW_MODAL,
  currentModal
})
