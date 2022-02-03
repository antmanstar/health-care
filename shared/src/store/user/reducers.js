// import { combineReducers } from "redux";
import { get, uniq } from 'lodash'
import * as types from './types'

const initialState = {
  sendingFeedback: false
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
        basicInfo: {
          ...state.basicInfo,
          user_assigned_care_plans: [
            {
              care_plan_id: state.onboarding.assignCarePlan.id,
              care_plan_name: 'test'
            }
          ]
        },
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
    case types.INITIALIZE_BASIC_INFO_FETCH:
      return { ...state, basicInfo: action.payload }
    case types.BENEFIT_COVERAGES_FETCH:
      return { ...state, benefitCoverages: { pending: true } }
    case types.BENEFIT_COVERAGES_FETCH_SUCCESS:
      return { ...state, benefitCoverages: action.payload }
    case types.CARE_GUIDE_FETCH_SUCCESS:
      return { ...state, careGuideInfo: action.payload }
    case types.CARE_GUIDE_FETCH_FAILURE:
      return {
        ...state,
        careGuideInfo: {
          first_name: 'Nicole',
          middle_name: '',
          last_name: 'Stevens',
          suffix: '',
          prefix: '',
          title: 'Care Guide',
          user_id: '',
          my_image_file_id: '',
          phone: {
            phone_type: '',
            phone_number: '(214)567-8796',
            phone_number_extension: ''
          },
          email: {
            email_address: 'nstevens@evryhealth.com'
          },
          error: action.error.response.data.messages
        }
      }
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
      const { query, dateFrom, dateTo } = action.payload
      return {
        ...state,
        claimsList: { request: { query, dateFrom, dateTo }, pending: true }
      }
    case types.CLAIMS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        claimsList: { ...state.claimsList, ...action.payload, pending: false }
      }
    case types.CLEAR_AUTH:
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
      return { ...state, createCase: { error: action.error } }
    case types.CREATE_CASE_SCHEDULE_PHONE_SUCCESS:
      return {
        ...state,
        scheduledPhoneCallCase: { status: 'OPEN', id: action.payload.id }
      }
    case types.CREATE_CASE_SCHEDULE_PHONE_FAILURE:
      return {
        ...state,
        scheduledPhoneCallCase: {
          status: 'ERROR-CREATING',
          message: action.payload.messages
        }
      }
    case types.COMPLETE_CASE_SCHEDULE_PHONE_SUCCESS:
      return {
        ...state,
        scheduledPhoneCallCase: {
          ...state.scheduledPhoneCallCase,
          status: 'COMPLETE'
        }
      }
    case types.COMPLETE_CASE_SCHEDULE_PHONE_FAILURE:
      return {
        ...state,
        scheduledPhoneCallCase: {
          status: 'ERROR-COMPLETING',
          message: action.payload.messages
        }
      }
    case types.SCHEDULE_PHONE_CALL_RESET:
      return {
        ...state,
        scheduledPhoneCallCase: { status: null, id: null }
      }
    case types.CREATE_CASE_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendMessageCase: { status: 'OPEN', id: action.payload.id }
      }
    case types.CREATE_CASE_SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendMessageCase: {
          status: 'ERROR-CREATING',
          message: action.payload.messages
        }
      }
    case types.COMPLETE_CASE_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendMessageCase: {
          ...state.sendMessageCase,
          status: 'COMPLETE'
        }
      }
    case types.COMPLETE_CASE_SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendMessageCase: {
          status: 'ERROR-COMPLETING',
          message: action.payload.messages
        }
      }
    case types.SEND_MESSAGE_RESET:
      return {
        ...state,
        sendMessageCase: { status: null, id: null }
      }
    case types.CREATE_CASE_REQUEST_INFORMATION_SUCCESS:
      return {
        ...state,
        requestInformationCase: { status: 'OPEN', id: action.payload.id }
      }
    case types.CREATE_CASE_REQUEST_INFORMATION_FAILURE:
      return {
        ...state,
        requestInformationCase: {
          status: 'ERROR-CREATING',
          message: action.payload.messages
        }
      }
    case types.COMPLETE_CASE_REQUEST_INFORMATION_SUCCESS:
      return {
        ...state,
        requestInformationCase: {
          ...state.requestInformationCase,
          status: 'COMPLETE'
        }
      }
    case types.COMPLETE_CASE_REQUEST_INFORMATION_FAILURE:
      return {
        ...state,
        requestInformationCase: {
          status: 'ERROR-COMPLETING',
          message: action.payload.messages
        }
      }

    case types.CREATE_CASE_REQUEST_MAILED_CARD_SUCCESS:
      return {
        ...state,
        requestMailedCardCase: {
          status: 'OPEN',
          id: action.payload.id
        }
      }
    case types.CREATE_CASE_REQUEST_MAILED_CARD_FAILURE:
      console.log(action);
      return {
        ...state,
        requestMailedCardCase: {
          status: 'ERROR-CREATING',
          messages: (action.payload ? action.payload.messages : ['An error has occured.'])
        }
      }
    case types.COMPLETE_CASE_REQUEST_MAILED_CARD_SUCCESS:
      return {
        ...state,
        requestMailedCardCase: {
          ...state.requestMailedCardCase,
          status: 'COMPLETE'
        }
      }
    case types.COMPLETE_CASE_REQUEST_MAILED_CARD_FAILURE:
      return {
        ...state,
        requestMailedCardCase: {
          status: 'ERROR-COMPLETING',
          messages: action.payload.messages
        }
      }

    case types.REQUEST_INFORMATION_RESET:
      return {
        ...state,
        requestInformationCase: { status: null, id: null }
      }
    case types.REQUEST_MAILED_CARD_RESET:
      return {
        ...state,
        requestMailedCardCase: { status: null, id: null }
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
            read: action.payload.read,
            dateFrom: action.payload.dateFrom,
            dateTo: action.payload.dateTo
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
          data: [
            ...get(state, ['notifications', 'data'], []),
            ...action.payload.data
          ],
          pending: false
        }
      }
    case types.NOTIFICATIONS_CLEAR:
      return {
        ...state,
        notifications: {
          data: []
        }
      }
    case types.EMAIL_VERIFY_CHALLENGE_SUCCESS:
      return {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          email_verified: true
        },
        emailVerificationChallengeStatus: 'success'
      }
    case types.EMAIL_VERIFY_CHALLENGE_FAILURE:
      return {
        ...state,
        emailVerificationChallengeStatus: 'failure'
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
    case types.UPDATE_CONTACT_PREFERENCES:
      return {
        ...state,
        accountInfo: {
          ...state.accountInfo,
          contact_preferences: {
            paperless: action.payload.paperless,
            receive_emails: action.payload.receive_emails,
            receive_text_messages: action.payload.receive_text_messages,
            receive_phone_calls: action.payload.receive_phone_calls
          }
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
