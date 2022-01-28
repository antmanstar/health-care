import { all, takeLatest } from 'redux-saga/effects'
import * as types from './types'
import api from '../../interfaces/apis/evry'
import { generateFetchWorker, takeAllBundler } from '../sagas'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield all([
    takeLatest(
      ...takeAllBundler(
        types.PROVIDER_SEARCH,
        generateFetchWorker,
        api.providerSearch
      )
    ),
    takeLatest(
      ...takeAllBundler(types.GEOCODER, generateFetchWorker, api.geoCoder)
    ),
    takeLatest(
      ...takeAllBundler(
        types.GEOLOCATIONSEARCH,
        generateFetchWorker,
        api.geoLocationSearch
      )
    )
  ])
}
