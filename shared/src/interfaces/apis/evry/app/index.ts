import { axios } from '..'

// eslint-disable-next-line import/prefer-default-export
export function providerSearch({
  page,
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
}) {
  return axios.post(
    '/api/v1/Member/ProviderSearch',
    {
      page,
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
