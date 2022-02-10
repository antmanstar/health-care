import * as types from './types'
import constants from '../../constants'

export const {
  TEXT,
  INTEGER,
  DATE_TIME,
  BOOLEAN,
  REQUEST_INFORMATION,
  SCHEDULE_APPOINTMENT,
  SCHEDULE_PHONE_CALL,
  SEND_A_MESSAGE_TO_CARE_COORDINATOR,
  PROVIDER_FEEDBACK,
  CLAIM_FEEDBACK,
  ID_CARD_REQUEST,
  ADDRESS_UPDATE,
  PHONE_NUMBER_UPDATE,
  PCP_UPDATE,
  APPOINTED_REPRESENTATIVE_UPDATE,
  COB_UPDATE
} = constants

export const anonymousTest = (token: string) => ({
  type: types.ANONYMOUS_TEST_FETCH,
  payload: {
    token
  }
})

export const assignCarePlan = ({
  from,
  id,
  replace = true,
  to = null,
  token
}) => ({
  type: types.ASSIGN_CARE_PLAN,
  payload: {
    from,
    id,
    replace,
    to,
    token
  }
})

export const authenticate = (email: string, password: string) => ({
  type: types.SIGN_IN,
  payload: {
    email,
    password
  }
})

export const auhorizationRequiredTest = (token: string) => ({
  type: types.ANONYMOUS_TEST_FETCH,
  payload: {
    token
  }
})

export const checkEmailAddress = (token: string, email: string) => ({
  type: types.MEMBERSHIP_SUMMARY_FETCH,
  payload: {
    token,
    email
  }
})

export const clearAuth = (message?: string) => ({
  type: types.CLEAR_AUTH,
  payload: {
    message
  }
})

export const clearAuthError = () => ({
  type: types.CLEAR_AUTH_ERROR
})

export const clear2FA = () => ({
  type: types.CLEAR_2FA
})

export const createAddressUpdateCase = ({
  address1,
  address2,
  city,
  files,
  state,
  token,
  zip
}: {
  address1: string
  address2: string
  city: string
  files: any[]
  state: string
  token: string
  zip: string
}) =>
  createCase({
    files,
    metadata: [
      {
        name: 'address1',
        value: address1,
        value_type: TEXT
      },
      {
        name: 'address2',
        value: address2,
        value_type: TEXT
      },
      {
        name: 'city',
        value: city,
        value_type: TEXT
      },
      {
        name: 'state',
        value: state,
        value_type: TEXT
      },
      {
        name: 'zip',
        value: zip,
        value_type: TEXT
      }
    ],
    token,
    type: ADDRESS_UPDATE
  })

export const createAppointedRepresentativeUpdateCase = ({ files, token }) =>
  createCase({
    files,
    metadata: [],
    token,
    type: APPOINTED_REPRESENTATIVE_UPDATE
  })

export const createCase = ({ files = [], metadata, token, type }) => ({
  type: types.CREATE_CASE,
  payload: {
    files,
    metadata,
    token,
    type
  }
})
export const createCase_v2 = ({ storeType, metadata, token, type }) => ({
  type: storeType,
  payload: {
    metadata,
    token,
    type
  }
})
export const submitCaseAsComplete = ({ storeType, id, token }) => ({
  type: storeType,
  payload: {
    id,
    token
  }
})
export const createClaimFeedbackCase = ({
  files,
  claimNumber,
  rate,
  comment,
  token
}) =>
  createCase({
    files,
    metadata: [
      {
        name: 'claim_number',
        value: claimNumber,
        value_type: TEXT
      },
      {
        name: 'rate',
        value: rate,
        value_type: TEXT
      },
      {
        name: 'comment',
        value: comment,
        value_type: TEXT
      }
    ],
    token,
    type: CLAIM_FEEDBACK
  })

export const createCOBUpdateCase = ({
  files,
  hasMedicare,
  hasOtherHealthCoverage,
  medicareEligibilityType,
  medicarePartA,
  medicarePartAEffectiveDate,
  medicarePartB,
  medicarePartC,
  medicarePartD,
  otherInsuranceCarrierName,
  otherInsuranceCoverageFrom,
  otherInsuranceCoverageThru,
  otherInsurancePolicyNumber,
  otherInsuranceType,
  token
}) =>
  createCase({
    files,
    metadata: [
      {
        name: 'has_medicare',
        value: hasMedicare,
        value_type: BOOLEAN
      },
      {
        name: 'has_other_health_coverage',
        value: hasOtherHealthCoverage,
        value_type: BOOLEAN
      },
      {
        name: 'medicare_eligibility_type',
        value: medicareEligibilityType,
        value_type: INTEGER
      },
      {
        name: 'medicare_part_a',
        value: medicarePartA,
        value_type: BOOLEAN
      },
      {
        name: 'medicare_part_b',
        value: medicarePartB,
        value_type: BOOLEAN
      },
      {
        name: 'medicare_part_c',
        value: medicarePartC,
        value_type: BOOLEAN
      },
      {
        name: 'medicare_part_d',
        value: medicarePartD,
        value_type: BOOLEAN
      },
      {
        name: 'medicare_part_a_effective_date',
        value: medicarePartAEffectiveDate,
        value_type: DATE_TIME
      },
      {
        name: 'other_insurance_carrier_name',
        value: otherInsuranceCarrierName,
        value_type: TEXT
      },
      {
        name: 'other_insurance_coverage_from',
        value: otherInsuranceCoverageFrom,
        value_type: DATE_TIME
      },
      {
        name: 'other_insurance_coverage_thru',
        value: otherInsuranceCoverageThru,
        value_type: DATE_TIME
      },
      {
        name: 'other_insurance_policy_number',
        value: otherInsurancePolicyNumber,
        value_type: TEXT
      },
      {
        name: 'other_insurance_type',
        value: otherInsuranceType,
        value_type: INTEGER
      }
    ],
    token,
    type: COB_UPDATE
  })

export const createPCPUpdateCase = ({ files, providerNPI, token }) =>
  createCase({
    files,
    metadata: [
      {
        name: 'provider_npi',
        value: providerNPI,
        value_type: TEXT
      }
    ],
    token,
    type: PCP_UPDATE
  })

export const createPhoneNumberUpdateCase = ({
  files,
  phoneNumber,
  phoneType,
  token
}: {
  files
  phoneNumber: string
  phoneType
  token
}) =>
  createCase({
    files,
    metadata: [
      {
        name: 'phone_number',
        value: phoneNumber,
        value_type: TEXT
      },
      {
        name: 'phone_type',
        value: phoneType,
        value_type: TEXT
      }
    ],
    token,
    type: PHONE_NUMBER_UPDATE
  })

export const createProviderFeedbackCase = ({
  files,
  providerNPI,
  rate,
  token
}) =>
  createCase({
    files,
    metadata: [
      {
        name: 'provider_npi',
        value: providerNPI,
        value_type: TEXT
      },
      {
        name: 'rate',
        value: rate,
        value_type: TEXT
      }
    ],
    token,
    type: PROVIDER_FEEDBACK
  })

export const createRequestForIdCardCase = ({ files, token }) =>
  createCase({
    files,
    metadata: [],
    token,
    type: ID_CARD_REQUEST
  })

export const createRequestInformationCase = ({
  //files,
  informationType,
  message,
  token
}) =>
  createCase_v2({
    storeType: types.CREATE_CASE_REQUEST_INFORMATION,
    metadata: [
      {
        name: 'information_type',
        value: informationType,
        value_type: TEXT
      },
      {
        name: 'message',
        value: message,
        value_type: TEXT
      }
    ],
    token,
    type: REQUEST_INFORMATION
  })
// createCase({
//   files,
//   metadata: [
//     {
//       name: "information_type",
//       value: informationType,
//       value_type: TEXT,
//     },
//     {
//       name: "message",
//       value: message,
//       value_type: TEXT,
//     },
//   ],
//   token,
//   type: REQUEST_INFORMATION,
// });
export const completeRequestInformationCase = ({ caseID, token }) => ({
  type: types.COMPLETE_CASE_REQUEST_INFORMATION,
  payload: {
    id: caseID,
    token
  }
})
export const requestInformationReset = () => ({
  type: types.REQUEST_INFORMATION_RESET
})

export const createScheduleAppointmentCase = ({
  appointmentDataTime,
  files,
  providerNPI,
  providerPracticeOfficeId,
  reasonForVisit,
  token
}) =>
  createCase({
    files,
    metadata: [
      {
        name: 'appointment_date_time',
        value: appointmentDataTime,
        value_type: DATE_TIME
      },
      {
        name: 'provider_npi',
        value: providerNPI,
        value_type: TEXT
      },
      {
        name: 'provider_practice_office_id',
        value: providerPracticeOfficeId,
        value_type: INTEGER
      },
      {
        name: 'reason_for_visit',
        value: reasonForVisit,
        value_type: TEXT
      }
    ],
    token,
    type: SCHEDULE_APPOINTMENT
  })

export const createSchedulePhoneCallCase = ({
  //files,
  phoneNumber,
  reasonForCall,
  scheduleDateTime,
  token
}) =>
  createCase_v2({
    storeType: types.CREATE_CASE_SCHEDULE_PHONE,
    metadata: [
      {
        name: 'reason_for_call',
        value: reasonForCall,
        value_type: TEXT
      },
      {
        name: 'phone_number',
        value: phoneNumber,
        value_type: TEXT
      },
      {
        name: 'schedule_date_time',
        value: scheduleDateTime,
        value_type: DATE_TIME
      }
    ],
    token,
    type: SCHEDULE_PHONE_CALL
  })
// createCase({
//   files,
//   metadata: [
//     {
//       name: 'phone_number',
//       value: phoneNumber,
//       value_type: TEXT
//     },
//     {
//       name: 'reason_for_call',
//       value: reasonForCall,
//       value_type: TEXT
//     },
//     {
//       name: 'schedule_date_time',
//       value: scheduleDateTime,
//       value_type: DATE_TIME
//     }
//   ],
//   token,
//   type: SCHEDULE_PHONE_CALL
//});
export const completeScheduledPhoneCallCase = ({ caseID, token }) => ({
  type: types.COMPLETE_CASE_SCHEDULE_PHONE,
  payload: {
    id: caseID,
    token
  }
})
export const schedulePhoneCallReset = () => ({
  type: types.SCHEDULE_PHONE_CALL_RESET
})

export const createSendAMessageToCareCoordinatorCase = ({
  //files,
  message,
  title,
  token
}) =>
  createCase_v2({
    storeType: types.CREATE_CASE_SEND_MESSAGE,
    metadata: [
      {
        name: 'message',
        value: message,
        value_type: TEXT
      },
      {
        name: 'title',
        value: title,
        value_type: TEXT
      }
    ],
    token,
    type: SEND_A_MESSAGE_TO_CARE_COORDINATOR
  })
// createCase({
//     files,
//     metadata: [
//       {
//         name: "message",
//         value: message,
//         value_type: TEXT,
//       },
//       {
//         name: "title",
//         value: title,
//         value_type: TEXT,
//       },
//     ],
//     token,
//     type: SEND_A_MESSAGE_TO_CARE_COORDINATOR,
//   });

export const completeSendMessageCase = ({ caseID, token }) => ({
  type: types.COMPLETE_CASE_SEND_MESSAGE,
  payload: {
    id: caseID,
    token
  }
})
export const submitProviderFeedbackCase = ({ metadata, token, type }) => ({
  type: types.CREATE_CASE,
  payload: {
    metadata,
    token,
    type
  }
})

export const sendMessageReset = () => ({
  type: types.SEND_MESSAGE_RESET
})

export const createRequestMailedCardCase = ({ token }) => {
  return createCase_v2({
    storeType: types.CREATE_CASE_REQUEST_MAILED_CARD,
    metadata: [],
    token,
    type: ID_CARD_REQUEST
  })
}

export const completeRequestMailedCardCase = ({ caseID, token }) => ({
  type: types.COMPLETE_CASE_REQUEST_MAILED_CARD,
  payload: {
    id: caseID,
    token
  }
})

export const requestMailedCardReset = () => ({
  type: types.REQUEST_MAILED_CARD_RESET
})

export const createAppointedRepFormUploadCase = ({ token }) => {
  return createCase_v2({
    storeType: types.CREATE_CASE_APPOINTED_REP_FORM_UPLOAD,
    metadata: [],
    token,
    type: APPOINTED_REPRESENTATIVE_UPDATE
  })
}
export const appointedRepFormUpload = ({ caseID, files, token }) => ({
  type: types.APPOINTED_REP_FORM_UPLOAD,
  payload: {
    id: caseID,
    files,
    token
  }
})
export const completeAppointedRepFormUploadCase = ({ caseID, token }) => ({
  type: types.COMPLETE_CASE_APPOINTED_REP_FORM_UPLOAD,
  payload: {
    id: caseID,
    token
  }
})
export const appointedRepFormUploadReset = () => ({
  type: types.APPOINTED_REP_FORM_UPLOAD_RESET
})
export const fetchAccountInfo = (token) => ({
  type: types.ACCOUNT_INFO_FETCH,
  payload: {
    token
  }
})

export const fetchAccumulators = (token, id, date, type) => ({
  type: types.ACCUMULATORS_FETCH,
  payload: {
    token,
    id,
    date,
    type
  }
})

export const fetchAvailableLanguages = (token) => ({
  type: types.ACCOUNT_INFO_FETCH,
  payload: {
    token
  }
})

export const fetchAvailableSpecialties = (token) => ({
  type: types.AVAILABLE_SPECIALTIES_FETCH,
  payload: {
    token
  }
})

export const initializeBasicInfo = (data) => ({
  type: types.INITIALIZE_BASIC_INFO_FETCH,
  payload: data
})

export const fetchBasicInfo = (token) => ({
  type: types.BASIC_INFO_FETCH,
  payload: {
    token
  }
})

export const fetchBenefitCoverages = (token) => ({
  type: types.BENEFIT_COVERAGES_FETCH,
  payload: {
    token
  }
})

export const fetchCareGuideInfo = (token) => ({
  type: types.CARE_GUIDE_FETCH,
  payload: {
    token
  }
})

export const fetchCarePlan = (token) => ({
  type: types.CARE_PLAN_FETCH,
  payload: {
    token
  }
})

export const fetchCases = ({
  direction,
  orderBy,
  query = null,
  recordsPerPage = 10,
  page = 1,
  statuses = [],
  token,
  types: caseTypes = []
}) => ({
  type: types.CASES_FETCH,
  payload: {
    direction,
    orderBy,
    query,
    page,
    recordsPerPage,
    statuses,
    token,
    types: caseTypes
  }
})

export const fetchClaimsSummary = ({ id, token, type }) => ({
  type: types.CLAIMS_SUMMARY_FETCH,
  payload: {
    id,
    token,
    type
  }
})

export const fetchClaimDetail = (token, claimId) => ({
  type: types.CLAIM_DETAIL_FETCH,
  payload: {
    token,
    claimId
  }
})

export const fetchClaimsList = ({
  page = 1,
  query,
  recordsPerPage = 10,
  token,
  dateFrom,
  dateTo
}) => {
  return {
    type: types.CLAIMS_LIST_FETCH,
    payload: {
      token,
      page,
      recordsPerPage,
      query,
      dateFrom,
      dateTo
    }
  }
}

export const fetchEOB = (token, id) => {
  return {
    type: types.FETCH_EOB,
    payload: {
      token,
      id
    }
  }
}

export const fetchEducationalResources = ({
  token,
  page,
  recordsPerPage,
  searchString,
  orderBy,
  orderByDesc
}) => {
  return {
    type: types.EDUCATIONAL_RESOURCES_FETCH,
    payload: {
      token,
      page,
      recordsPerPage,
      searchString,
      orderBy,
      orderByDesc
    }
  }
}

export const fetchEvryContactInfo = (token) => ({
  type: types.EVRY_CONTACT_FETCH,
  payload: {
    token
  }
})

export const fetchFamilyMemberCOB = (token) => ({
  type: types.FAMILY_MEMBER_COB_FETCH,
  payload: {
    token
  }
})

export const fetchFamilyMemberCOBSummary = (token) => ({
  type: types.FAMILY_MEMBER_COB_SUMMARY_FETCH,
  payload: {
    token
  }
})

export const fetchFiles = ({
  token,
  categories,
  direction,
  documentTypes,
  page,
  query,
  recordsPerPage,
  orderBy,
  dateFrom,
  dateTo
}) => {
  return {
    type: types.FILES_FETCH,
    payload: {
      token,
      categories,
      documentTypes,
      page,
      recordsPerPage,
      query,
      orderBy,
      direction,
      dateFrom,
      dateTo
    }
  }
}

export const fetchForms = ({ category, formType, token }) => {
  return {
    types: null,
    payload: {
      token,
      category,
      formType
    }
  }
}

export const getLastQuestionnaireOrCreate = ({ id, token }) => ({
  type: types.GET_LAST_QUESTIONNAIRE_OR_CREATE,
  payload: {
    id,
    token
  }
})

export const fetchMembershipSummary = (token) => ({
  type: types.MEMBERSHIP_SUMMARY_FETCH,
  payload: {
    token
  }
})

export const fetchRewardBenefits = (token) => ({
  type: types.REWARD_BENEFITS_FETCH,
  payload: {
    token
  }
})

export const fetchRewardCategories = (token) => ({
  type: types.REWARD_CATEGORIES_FETCH,
  payload: {
    token
  }
})

export const fetchWellnessGoals = (token) => ({
  type: types.WELLNESS_GOALS_FETCH,
  payload: {
    token
  }
})

export const clearNotifications = () => ({
  type: types.NOTIFICATIONS_CLEAR,
  payload: {}
})

export const fetchNotifications = ({
  direction,
  orderBy,
  page,
  query,
  read,
  dateFrom,
  dateTo,
  recordsPerPage,
  token
}) => ({
  type: types.NOTIFICATIONS_FETCH,
  payload: {
    direction,
    orderBy,
    page,
    query,
    read,
    recordsPerPage,
    dateFrom,
    dateTo,
    token
  }
})

export const fetch2FACode = (email, password) => ({
  type: types.TWO_FACTOR_CODE_FETCH,
  payload: {
    email,
    password
  }
})

export const fetchFAQs = ({
  token,
  page,
  recordsPerPage,
  searchString,
  orderBy,
  orderByDesc,
  supportArticleType
}) => ({
  type: types.FAQS_FETCH,
  payload: {
    token,
    page,
    recordsPerPage,
    searchString,
    orderBy,
    orderByDesc,
    supportArticleType
  }
})

export const fetchSupportArticles = ({
  token,
  page,
  recordsPerPage,
  searchString,
  orderBy,
  orderByDesc,
  supportArticleType
}) => ({
  type: types.SUPPORT_ARTICLES_FETCH,
  payload: {
    token,
    page,
    recordsPerPage,
    searchString,
    orderBy,
    orderByDesc,
    supportArticleType
  }
})

export const findCases = ({
  direction,
  orderBy,
  query = null,
  recordsPerPage = 10,
  page = 1,
  statuses = [],
  token,
  types: caseTypes = []
}) => ({
  type: types.FIND_CASES,
  payload: {
    direction,
    orderBy,
    query,
    page,
    recordsPerPage,
    token,
    types: caseTypes
  }
})

export const initiatePasswordReset = (email) => ({
  type: types.INITIATE_PASSWORD_RESET,
  payload: {
    email
  }
})

export const markNotificationsAsRead = ({ ids, token }) => ({
  type: types.NOTIFICATIONS_READ_FETCH,
  payload: { ids, token }
})

export const register = ({
  eligibilityId,
  email,
  last4SSN,
  password,
  passwordConfirm
}) => ({
  type: types.REGISTER,
  payload: {
    eligibilityId,
    email,
    last4SSN,
    password,
    passwordConfirm
  }
})

export const savePasswordReset = (email, password, passwordConfirm, token) => ({
  type: types.SAVE_PASSWORD_RESET,
  payload: {
    email,
    password,
    passwordConfirm,
    token
  }
})

export const saveQuestionnaire = ({ questionnaire, token }) => ({
  type: types.SAVE_QUESTIONNAIRE,
  payload: {
    questionnaire,
    token
  }
})

export const signOut = (token) => ({
  type: types.SIGN_OUT,
  payload: {
    token
  }
})

export const unsetUser = () => ({
  type: types.UNSET,
  payload: {}
})

export const uploadFiles = () => ({
  type: types.UPLOAD_FILES,
  payload: {}
})

export const verifyEligibilityIdAndSSN = ({ eligibilityId, last4SSN }) => ({
  type: types.ELEGIBILITY_ID_SSN_VERIFY,
  payload: {
    eligibilityId,
    last4SSN
  }
})

export const verifyEmail = (token) => ({
  type: types.EMAIL_VERIFY,
  payload: {
    token
  }
})

export const verifyEmailChallenge = (emailAddress, verificationCode) => ({
  type: types.EMAIL_VERIFY_CHALLENGE,
  payload: {
    emailAddress,
    verificationCode
  }
})

export const verify2FACode = (email, code, token) => ({
  type: types.TWO_FACTOR_CODE_VERIFY,
  payload: {
    email,
    code,
    token
  }
})

export const initRegister = () => ({
  type: types.ELEGIBILITY_ID_SSN_VERIFY_FAILURE,
  error: {}
})

export const updateContactPreferences = (payload) => ({
  type: types.UPDATE_CONTACT_PREFERENCES,
  payload
})

export const error500Test = () => ({
  type: types.ERROR_500_TEST,
  payload: {}
})

export const sessionTimedOut = () => ({
  type: types.SESSION_TIMED_OUT,
  payload: {}
})

export const clearSessionTimedOut = () => ({
  type: types.CLEAR_SESSION_TIMED_OUT,
  payload: {}
})

export const clearSendingFeedback = () => ({
  type: types.CLEAR_SENDING_FEEDBACK,
  payload: {}
})

export const fetchFileContent = (id, fileName, token) => ({
  type: types.FILE_CONTENT_FETCH,
  payload: {
    id,
    fileName,
    token
  }
})

export const downloadUnderstandYourBenefits = (token) => ({
  type: types.DOWNLOAD_UNDERSTAND_BENEFITS,
  payload: {
    token
  }
})
