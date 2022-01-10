import { all, call, put, select } from 'redux-saga/effects'
import app from './app/sagas'
import user from './user/sagas'
import { isAuthenticated } from './user/selectors'
import { clearAuth } from './user/actions'

const allSagas = [app, user]

export default function* rootSaga() {
  yield all(allSagas.map((saga) => saga()))
}

export const generateFetchWorker = (type, fetch) =>
  function* workerSaga(action) {
    try {
      const response = yield call(fetch, action.payload)

      // dispatch a success action to the store with the new user with auth info
      yield put({ type: `${type}_SUCCESS`, payload: response.data })
      return response.data
    } catch (error) {
      // dispatch a failure action to the store with the error
      console.log('error ', error)

      const { response } = error
      error = { ...error.toJSON(), response }
      yield put({ type: `${type}_FAILURE`, payload: error })
      if (response.status === 401 && (yield select(isAuthenticated))) {
        yield put(clearAuth('Signed out automatically'))
      }
      return error
    }
  }

export const takeAllBundler = (type, factory, ...args) => [
  type,
  factory(type, ...args)
]

export { allSagas as all, app, user }
