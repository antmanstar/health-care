import {
  all,
  call,
  cancel,
  debounce,
  fork,
  getContext,
  put,
  select,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import {
  getNotificationsMarkedQueue,
  getToken,
  isOnboardingComplete
} from './selectors'
import * as types from './types'
import api from '../../interfaces/apis/evry'
import { getHistory } from '../../utils/history'
import { generateFetchWorker, takeAllBundler } from '../sagas'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield all([
    authSaga(),
    takeLatest(types.SIGN_IN_SUCCESS, successfulAuthWorkerSaga),
    takeLatest(types.TWO_FACTOR_CODE_VERIFY_SUCCESS, successfulAuthWorkerSaga),
    takeLatest(types.ELEGIBILITY_ID_SSN_VERIFY_FAILURE, initRegistration),
    takeLatest(
      ...takeAllBundler(
        types.ACCOUNT_INFO_FETCH,
        generateFetchWorker,
        api.fetchAccountInfo
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ACCUMULATORS_FETCH,
        generateFetchWorker,
        api.fetchAccumulators
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ANONYMOUS_TEST_FETCH,
        generateFetchWorker,
        api.fetchAnonymousTest
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ASSIGN_CARE_PLAN,
        generateFetchWorker,
        api.assignCarePlan
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.AUTHORIZATION_REQUIRED_TEST_FETCH,
        generateFetchWorker,
        api.fetchAuthorizationRequiredTest
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.BASIC_INFO_FETCH,
        generateFetchWorker,
        api.fetchBasicInfo
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.BENEFIT_COVERAGES_FETCH,
        generateFetchWorker,
        api.fetchBenefitCoverages
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CARE_GUIDE_FETCH,
        generateFetchWorker,
        api.fetchCareGuideInfo
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CARE_PLAN_FETCH,
        generateFetchWorker,
        api.fetchCarePlan
      )
    ),
    takeLatest(
      ...takeAllBundler(types.CASES_FETCH, generateFetchWorker, api.fetchCases)
    ),
    takeLatest(
      ...takeAllBundler(
        types.CHECK_EMAIL_ADDRESS,
        generateFetchWorker,
        api.checkEmailAddress
      )
    ),
    takeEvery(
      ...takeAllBundler(
        types.CLAIM_DETAIL_FETCH,
        generateFetchWorker,
        api.fetchClaimDetail
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CLAIMS_SUMMARY_FETCH,
        generateFetchWorker,
        api.fetchClaimsSummary
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CLAIMS_LIST_FETCH,
        generateFetchWorker,
        api.fetchClaimsList
      )
    ),
    takeLatest(
      ...takeAllBundler(types.CREATE_CASE, generateFetchWorker, api.createCase)
    ),
    takeLatest(
      ...takeAllBundler(
        types.CREATE_CASE_SCHEDULE_PHONE,
        generateFetchWorker,
        api.createCase_v2
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.COMPLETE_CASE_SCHEDULE_PHONE,
        generateFetchWorker,
        api.markCaseAsSubmitComplete
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CREATE_CASE_SEND_MESSAGE,
        generateFetchWorker,
        api.createCase_v2
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.COMPLETE_CASE_SEND_MESSAGE,
        generateFetchWorker,
        api.markCaseAsSubmitComplete
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CREATE_CASE_REQUEST_INFORMATION,
        generateFetchWorker,
        api.createCase_v2
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.COMPLETE_CASE_REQUEST_INFORMATION,
        generateFetchWorker,
        api.markCaseAsSubmitComplete
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.CREATE_CASE_REQUEST_MAILED_CARD,
        generateFetchWorker,
        api.createCase_v2
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.COMPLETE_CASE_REQUEST_MAILED_CARD,
        generateFetchWorker,
        api.markCaseAsSubmitComplete
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.EDUCATIONAL_RESOURCES_FETCH,
        generateFetchWorker,
        api.fetchEducationalResources
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ELEGIBILITY_ID_SSN_VERIFY,
        generateFetchWorker,
        api.verifyEligibilityIdAndSSN
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.EVRY_CONTACT_FETCH,
        generateFetchWorker,
        api.fetchEvryContactInfo
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.EMAIL_VERIFY,
        generateFetchWorker,
        api.verifyEmail
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.EMAIL_VERIFY_CHALLENGE,
        generateFetchWorker,
        api.verifyEmailChallenge
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.FAMILY_MEMBER_COB_FETCH,
        generateFetchWorker,
        api.fetchFamilyMemberCOB
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.FAMILY_MEMBER_COB_SUMMARY_FETCH,
        generateFetchWorker,
        api.fetchFamilyMemberCOBSummary
      )
    ),
    takeLatest(
      ...takeAllBundler(types.FAQS_FETCH, generateFetchWorker, api.fetchFAQs)
    ),
    takeLatest(
      ...takeAllBundler(types.FILES_FETCH, generateFetchWorker, api.fetchFiles)
    ),
    takeLatest(
      ...takeAllBundler(types.FIND_CASES, generateFetchWorker, api.fetchCases)
    ),
    takeLatest(
      ...takeAllBundler(
        types.GET_LAST_QUESTIONNAIRE_OR_CREATE,
        generateFetchWorker,
        api.getLastQuestionnaireOrCreate
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.INITIATE_PASSWORD_RESET,
        generateFetchWorker,
        api.initiatePasswordReset
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.MEMBERSHIP_SUMMARY_FETCH,
        generateFetchWorker,
        api.fetchMembershipSummary
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.NOTIFICATIONS_FETCH,
        generateFetchWorker,
        api.fetchNotifications
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.REWARD_BENEFITS_FETCH,
        generateFetchWorker,
        api.fetchRewardBenefits
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.REWARD_CATEGORIES_FETCH,
        generateFetchWorker,
        api.fetchRewardCategories
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.ERROR_500_TEST,
        generateFetchWorker,
        api.error500Test
      )
    ),
    debounce(
      1000,
      types.NOTIFICATIONS_READ_FETCH,
      function* workerSaga(action) {
        try {
          const ids = yield select(getNotificationsMarkedQueue)
          const response = yield call(api.markNotificationsAsRead, {
            ...action.payload,
            ids
          })

          yield put({
            type: types.NOTIFICATIONS_READ_FETCH_SUCCESS,
            payload: response.data
          })
          return response.data
        } catch (error) {
          yield put({ type: types.NOTIFICATIONS_READ_FETCH_FAILURE, error })
          return error
        }
      }
    ),
    takeLatest(
      ...takeAllBundler(types.REGISTER, generateFetchWorker, api.register)
    ),
    takeLatest(
      ...takeAllBundler(
        types.SAVE_PASSWORD_RESET,
        generateFetchWorker,
        api.savePasswordReset
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.SUPPORT_ARTICLES_FETCH,
        generateFetchWorker,
        api.fetchSupportArticles
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.SAVE_QUESTIONNAIRE,
        generateFetchWorker,
        api.saveQuestionnaire
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.TWO_FACTOR_CODE_FETCH,
        generateFetchWorker,
        api.fetch2FACode
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.TWO_FACTOR_CODE_VERIFY,
        generateFetchWorker,
        api.verify2FACode
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.WELLNESS_GOALS_FETCH,
        generateFetchWorker,
        api.fetchWellnessGoals
      )
    ),
    takeLatest(
      ...takeAllBundler(
        types.UPDATE_CONTACT_PREFERENCES,
        generateFetchWorker,
        api.updateContactPreferences
      )
    )
  ])
}

export function* authSaga() {
  const initToken = yield select(getToken)
  let init = true
  while (true) {
    let authTask

    if (!init || !initToken) {
      const { payload } = yield take(types.SIGN_IN)

      authTask = yield fork(
        generateFetchWorker(types.SIGN_IN, api.initiateAuthentication),
        {
          payload
        }
      )
    }

    const action = yield take([
      types.SIGN_OUT,
      types.SIGN_IN_FAILURE,
      types.CLEAR_2FA
    ])

    if (action.type === types.SIGN_OUT) {
      if (authTask) {
        yield cancel(authTask)
      }
      yield fork(generateFetchWorker(types.SIGN_OUT, api.signOut), action)
      yield take([types.SIGN_OUT_SUCCESS, types.SIGN_OUT_FAILURE])
      //clear registration stores
      yield put({ type: types.ELEGIBILITY_ID_SSN_VERIFY_FAILURE, error: {} })
      const history = yield getContext('history')
      history.push('/sign-in')
    }

    init = false
  }
}

function* successfulAuthWorkerSaga(action) {
  if (action.payload.two_way_factor_challenge_required) {
    yield put({
      type: types.SIGN_IN_TWO_FACTOR_REQUEST,
      payload: action.payload
    })
  } else {
    yield put({
      type: types.BASIC_INFO_FETCH,
      payload: { token: action.payload.auth_token }
    })
    yield take(types.BASIC_INFO_FETCH_SUCCESS)

    const history = yield getContext('history')
    yield history.push('/')
  }
}

function* initRegistration(action) {
  yield put({ type: types.REGISTER_FAILURE, error: {} })
}
