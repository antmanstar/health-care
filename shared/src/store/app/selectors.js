import get from 'lodash/get';

export const getInboxFilters = state => get(state, ['app', 'inboxFilters']);
export const getCurrentModal = state => get(state, ['app', 'currentModal']);
export const getModalData = state => get(state, ['app', 'modalData']);
export const getMobileFilterStatus = state => get(state, ['app', 'mobileFiltersOpen']);
export const getNewSupportRequestModalStatus = state =>
  get(state, ['app', 'newSupportRequestModalOpen']);
export const getViewDescription = state => get(state, ['app', 'view', 'description']);
export const getViewIcon = state => get(state, ['app', 'view', 'icon']);
export const getViewSubtitle = state => get(state, ['app', 'view', 'subtitle']);
export const getViewTitle = state => get(state, ['app', 'view', 'title']);
export const getSupportRequestContent = state => get(state, ['app', 'supportRequestContent']);
export const getProviderSearchData = state => get(state, ['app', 'providerSearch']);
export const getProviderSearchQuery = state => get(state, ['app', 'providerSearch', 'query']);
export const getProviderSearchLocation = state => get(state, ['app', 'providerSearch', 'location']);
export const getLocationData = state => get(state, ['app', 'geoLocation']);
