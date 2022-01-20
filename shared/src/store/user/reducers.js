// import { combineReducers } from "redux";
import { get, uniq } from 'lodash'
import * as types from './types'

const initialState = {
  sendingFeedback: true
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACCOUNT_INFO_FETCH_SUCCESS:
      return { ...state, accountInfo: action.payload }
    case types.ACCUMULATORS_FETCH:
      return { ...state, accumulators: { pending: true } }
    case types.ACCUMULATORS_FETCH_SUCCESS:
      return { ...state, accumulators: action.payload }
    case types.ASSIGN_CARE_PLAN:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          assignCarePlan: action.payload,
          isAssigningCarePlan: true
        }
      }
    case types.ASSIGN_CARE_PLAN_SUCCESS:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          assignCarePlan: {
            ...state.onboarding.assignCarePlan,
            ...action.payload
          },
          isAssigningCarePlan: false
        }
      }
    case types.ASSIGN_CARE_PLAN_FAILURE:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          assignCarePlan: {
            ...state.onboarding.assignCarePlan,
            error: action.payload
          },
          isAssigningCarePlan: false
        }
      }
    case types.BASIC_INFO_FETCH_SUCCESS:
      return { ...state, basicInfo: action.payload, payload2FA: {} }
    case types.BENEFIT_COVERAGES_FETCH:
      return { ...state, benefitCoverages: { pending: true } }
    case types.BENEFIT_COVERAGES_FETCH_SUCCESS:
      return { ...state, benefitCoverages: action.payload }
    case types.CARE_GUIDE_FETCH_SUCCESS:
      return { ...state, careGuideInfo: action.payload }
    case types.CARE_PLAN_FETCH_SUCCESS:
      return { ...state, carePlan: action.payload }
    case types.CASES_FETCH:
      return {
        ...state,
        cases: {
          request: {
            query: action.payload.query,
            statuses: action.payload.statuses,
            types: action.payload.types
          }
        }
      }
    case types.CASES_FETCH_SUCCESS:
      return { ...state, cases: { ...state.cases, ...action.payload } }
    case types.CLAIMS_SUMMARY_FETCH_SUCCESS:
      return { ...state, claimsSummary: action.payload }
    case types.CLAIM_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        claims: {
          ...(state.claims || {}),
          [action.payload.claim_number]: action.payload
        }
      }
    case types.CLAIMS_LIST_FETCH:
      return {
        ...state,
        claimsList: { request: { query: action.payload.query }, pending: true }
      }
    case types.CLAIMS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        claimsList: { ...state.claimsList, ...action.payload, pending: false }
      }
    case types.CLEAR_AUTH:
      return {
        ...state,
        claimsList: { request: { query: action.payload.query } }
      }
    case types.CLAIMS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        claimsList: { ...state.claimsList, ...action.payload }
      }
    case types.CLEAR_AUTH:
      return {
        ...state,
        auth:
          action.message && action.payload.message
            ? { error: action.payload.message }
            : {}
      }
    case types.CLEAR_AUTH_ERROR:
      return { ...state, auth: {} }
    case types.CLEAR_2FA:
      return { ...state, payload2FA: {}, auth: {} }
    case types.CREATE_CASE:
      return { ...state }
    case types.CREATE_CASE_SUCCESS:
      return { ...state, createCase: action.payload, sendingFeedback: true }
    case types.CREATE_CASE_FAILURE:
      return {
        ...state,
        createCase: { error: action.error },
        sendingFeedback: false
      }
    case types.EVRY_CONTACT_FETCH_SUCCESS:
      return { ...state, evryContactInfo: action.payload }
    case types.EDUCATIONAL_RESOURCES_FETCH_SUCCESS:
      return { ...state, educationalResources: action.payload }
    case types.ELEGIBILITY_ID_SSN_VERIFY:
      return {
        ...state,
        registering: {
          ...action.payload,
          isVerifyingElegibility: true
        }
      }
    case types.ELEGIBILITY_ID_SSN_VERIFY_SUCCESS:
      return {
        ...state,
        registering: {
          ...state.registering,
          phone: action.payload.member_cell_number,
          verified: action.payload.result,
          result: action.payload.result,
          isVerifyingElegibility: false
        }
      }
    case types.ELEGIBILITY_ID_SSN_VERIFY_FAILURE:
      return {
        ...state,
        registering: {
          error: action.error?.response?.data?.messages,
          isVerifyingElegibility: false
        }
      }
    case types.FAMILY_MEMBER_COB_FETCH_SUCCESS:
      return { ...state, familyCOB: action.payload }
    case types.FAMILY_MEMBER_COB_SUMMARY_FETCH_SUCCESS:
      return { ...state, familyCOBSummary: action.payload }
    case types.FILES_FETCH:
      return {
        ...state,
        files: {
          request: {
            query: action.payload.query,
            categories: action.payload.categories,
            documentTypes: action.payload.documentTypes
          }
        }
      }
    case types.FILES_FETCH_SUCCESS:
      return { ...state, files: { ...state.files, ...action.payload } }
    case types.FIND_CASES:
      return {
        ...state,
        findCases: {
          request: {
            query: action.payload.query,
            statuses: action.payload.statuses,
            types: action.payload.types
          }
        }
      }
    case types.FIND_CASES_SUCCESS:
      return { ...state, findCases: { ...state.findCases, ...action.payload } }
    case types.GET_LAST_QUESTIONNAIRE_OR_CREATE:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          carePlanSelection: { id: action.payload.id }
        },
        isChoosingCarePlan: true
      }
    case types.GET_LAST_QUESTIONNAIRE_OR_CREATE_SUCCESS:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          questionnaire: action.payload
        },
        isChoosingCarePlan: false
      }
    case types.INITIATE_PASSWORD_RESET_FAILURE:
    case types.SAVE_PASSWORD_RESET_FAILURE:
      return { ...state, auth: { error: action.error.response.data.messages } }
    case types.SAVE_QUESTIONNAIRE:
      return { ...state, isSavingQuestionnaire: true }
    case types.SAVE_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          questionnaireResponse: action.payload
        },
        isSavingQuestionnaire: false
      }
    case types.SAVE_QUESTIONNAIRE_FAILURE:
      return {
        ...state,
        saveQuestionnaire: { error: action.error.response },
        isSavingQuestionnaire: false
      }
    case types.MEMBERSHIP_SUMMARY_FETCH_SUCCESS:
      return { ...state, membershipSummary: action.payload }
    case types.REWARD_BENEFITS_FETCH_SUCCESS:
      return { ...state, rewardBenefits: action.payload }
    case types.REWARD_CATEGORIES_FETCH_SUCCESS:
      return { ...state, rewardCategories: action.payload }
    case types.SUPPORT_ARTICLES_FETCH_SUCCESS:
      return { ...state, supportArticles: action.payload }
    case types.FAQS_FETCH_SUCCESS:
      return { ...state, faqs: action.payload }
    case types.WELLNESS_GOALS_FETCH_SUCCESS:
      return { ...state, wellnessGoals: action.payload }
    case types.NOTIFICATIONS_READ_FETCH:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          markedQueue: uniq(...action.payload.ids)
        }
      }
    case types.NOTIFICATIONS_READ_FETCH_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: get(state, ['notifications', 'data'], []).map((notification) =>
            action.payload.ids.indexOf(notification.user_notification_id) !== -1
              ? { ...notification, is_read: true }
              : notification
          ),
          markedQueue: []
        }
      }
    case types.NOTIFICATIONS_FETCH:
      return {
        ...state,
        notifications: {
          ...get(state, ['notifications'], {}),
          request: {
            query: action.payload.query,
            read: action.payload.read
          },
          pending: true
        }
      }
    case types.NOTIFICATIONS_FETCH_SUCCESS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload,
          data: [...action.payload.data],
          pending: false
        }
      }
    case types.REGISTER:
      return {
        ...state,
        register: {
          isRegisteringElegibility: true
        }
      }
    case types.REGISTER_SUCCESS:
      return Object.assign(
        {
          ...state,
          register: {
            result: true
          }
        },
        action.payload.two_way_factor_challenge_required
          ? {
              payload2FA: action.payload
            }
          : {
              isSigningIn: false,
              isSignedIn: true,
              auth: action.payload
            }
      )
    case types.REGISTER_FAILURE:
      return {
        ...state,
        register: {
          error: action.error?.response?.data?.messages,
          isRegisteringElegibility: false
        }
      }
    case types.SIGN_IN:
      return { ...state, isSigningIn: true, isSignedIn: false }
    case types.SIGN_IN_SUCCESS:
    case types.TWO_FACTOR_CODE_VERIFY_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: true,
        auth: action.payload
      }
    case types.SIGN_IN_TWO_FACTOR_REQUEST:
      return { ...state, payload2FA: action.payload }
    case types.SIGN_IN_FAILURE:
    case types.TWO_FACTOR_CODE_VERIFY_FAILURE:
      return {
        ...state,
        isSigningIn: false,
        isSignedIn: false,
        auth: { error: action.error.response.data.messages }
      }
    case types.SIGN_OUT:
      return { ...state, isSigningOut: true }
    case types.SIGN_OUT_SUCCESS:
    case types.SIGN_OUT_FAILURE:
      return { ...state, auth: {}, isSigningOut: false }
    case types.UNSET:
      return null
    case types.INITIALIZE:
    default:
      return state
  }
}

export default userReducer
