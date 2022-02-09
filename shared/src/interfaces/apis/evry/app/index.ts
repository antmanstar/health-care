import { axios } from '..'

// eslint-disable-next-line import/prefer-default-export
export function providerSearch({
  page = 1,
  searchWithinBound = false,
  recordsPerPage = 10,
  search = '',
  orderBy = null,
  desc = false,
  location,
  bounds,
  languages = [],
  specialties = [],
  gender = null,
  token
}) {
  return axios.post(
    '/api/v1/Member/ProviderSearch',
    {
      page,
      only_search_within_bound: searchWithinBound,
      records_per_page: recordsPerPage,
      search_string: search,
      order_by: orderBy,
      order_by_desc: desc,
      my_location: location,
      latitude_longitude_bounds: bounds,
      languages,
      specialties,
      gender
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export function geoCoder({
  addressBelongsTo,
  address1,
  city,
  state,
  zip,
  token
}) {
  return axios.post(
    `/api/v1/Member/GetGeoLocationFromAddress`,
    {
      address_belongs_to: 1,
      address1: address1,
      city: city,
      state: state,
      zip: zip
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export function geoLocationSearch({ city, state, zip, token }) {
  return axios.post(
    `/api/v1/Member/GetGeoLocationFromCityStateOrZip`,
    {
      city: city,
      state: state,
      zip: zip
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  )
}
