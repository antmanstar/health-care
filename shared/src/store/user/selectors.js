import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'

const nameMethods = {
  isEmpty() {
    return !(this.last || this.last_name)
  },
  isPerson() {
    return (this.first || this.first_name) && (this.last || this.last_name)
  },
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    return this.isPerson()
      ? `${this.first || this.first_name} ${this.last || this.last_name}`
      : this.last || this.last_name
  }
}

const addressMethods = {
  isEmpty() {
    return isEmpty(omit(this, 'toString', 'isEmpty'))
  },
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    return `${this.address1 || ''}\n${this.address2 || ''}\n${
      this.city || ''
    }, ${this.state || ''} ${this.zip || ''}`
  }
}

const getAuth = (state) => get(state, ['user', 'auth'])
const getFirstName = (state, baseGetter = getBasicInfo) =>
  get(baseGetter(state), ['first_name'])
const getMiddleName = (state, baseGetter = getBasicInfo) =>
  get(baseGetter(state), ['middle_name'])
const getLastName = (state, baseGetter = getBasicInfo) =>
  get(baseGetter(state), ['last_name'])
const getMembershipSummary = (state, additional = [], defaultValue = null) =>
  get(state, ['user', 'membershipSummary'].concat(additional), defaultValue)
const getMembershipSummaryBenefits = (state) =>
  getMembershipSummary(state, ['membership_benefit_summary'], [])
const getMembershipFamilyMembers = (state) =>
  getMembershipSummary(state, ['membership_family_members'], [])
const getMembershipSummaryDocuments = (state) =>
  getMembershipSummary(state, ['membership_documents'], [])
const getMembershipSummaryRx = (state) =>
  getMembershipSummary(state, ['membership_rx_id'])

export const isSignedIn = (state) => get(state, ['user', 'isSignedIn'])

export const isSigningIn = (state) => get(state, ['user', 'isSigningIn'])

export const isSignedOut = (state) => get(state, ['user', 'isSignedOut'])

export const isSigningOut = (state) => get(state, ['user', 'isSigningOut'])

export const isVerifyingElegibility = (state) =>
  get(state, ['user', 'registering', 'isVerifyingElegibility'])

export const isRegisteringElegibility = (state) =>
  get(state, ['user', 'register', 'isRegisteringElegibility'])

export const isChoosingCarePlan = (state) =>
  get(state, ['user', 'isChoosingCarePlan'])

export const isSavingQuestionnaire = (state) =>
  get(state, ['user', 'isSavingQuestionnaire'])

export const isAssigningCarePlan = (state) =>
  get(state, ['user', 'onboarding', 'isAssigningCarePlan'])

export const getToken = (state) => get(getAuth(state), ['auth_token'])

export const getAccountInfo = (state) => get(state, ['user', 'accountInfo'])

export const getBasicInfo = (state) => get(state, ['user', 'basicInfo'])

export const hasBasicInfo = (state) => !isEmpty(getBasicInfo(state))

export const getCareGuideInfo = (state) => get(state, ['user', 'careGuideInfo'])

export const getCarePlan = (state) => get(state, ['user', 'carePlan', 0])

export const getCarePlanSuggestion = (state) =>
  get(state, [
    'user',
    'onboarding',
    'questionnaireResponse',
    'suggested_care_plan'
  ])

export const getSuggestedCarePlanId = (state) =>
  get(getCarePlanSuggestion(state), ['care_plan_id'])

export const getCarePlanSelection = (state) =>
  get(state, ['user', 'onboarding', 'carePlanSelection'])

export const getSelectedCarePlanId = (state) =>
  get(getCarePlanSelection(state), ['id'])

export const successfulRegistration = (state) =>
  get(state, ['user', 'register', 'result']) === true

export const successfulCarePlanAssignment = (state) =>
  get(state, ['user', 'onboarding', 'assignCarePlan', 'result']) === true

export const foundCases = (state) =>
  get(state, ['user', 'findCases', 'total_records']) > 0

export const findCases = (state) =>
  get(state, ['user', 'findCases', 'data'], [])

export const getCasesDataFrame = (state) => {
  const dataFrame = get(state, ['user', 'cases'])

  return dataFrame && omit(dataFrame, 'data')
}

export const getCases = (state) => get(state, ['user', 'cases', 'data'], [])

export const getEvryContactInfo = (state) =>
  get(state, ['user', 'evryContactInfo'])

export const getEvryPhoneNumbers = (state, baseGetter = getEvryContactInfo) =>
  get(baseGetter(state), ['phones'])

export const getSupportPhoneNumber = (
  state,
  baseGetter = getEvryPhoneNumbers
) => get(baseGetter(state), [0, 'phone_number'])

export const getGroupId = (state) => get(getBasicInfo(state), ['group_id'])

export const getMemberId = (state) =>
  get(getBasicInfo(state), ['eligibility_id'])

export const getClientName = (state) =>
  get(getBasicInfo(state), ['client_name'])

export const isAuthenticated = (state) => Boolean(getToken(state))

export const getCarePlans = (state, defaultValue) =>
  get(getBasicInfo(state), ['user_assigned_care_plans'], defaultValue)

export const isOnboardingComplete = (state) =>
  getCarePlans(state, []).length > 0

export const getQuestionnaireStatus = (state, defaultValue) =>
  get(getBasicInfo(state), ['onboarding_process_status'], defaultValue)

export const isQuestionnaireComplete = (state) =>
  getQuestionnaireStatus(state, []).filter(
    (questionnaire) => questionnaire.completion == true
  ).length > 0

export const getQuestionnaire = (state) =>
  get(state, ['user', 'onboarding', 'questionnaire'])

export const isQuestionnaireLoaded = (state) =>
  !isEmpty(getQuestionnaire(state))

export const getAuthError = (state) => get(state, ['user', 'auth', 'error'])

export const getRegisterError = (state) => get(state, ['user', 'register'])

export const getVerifyMembershipError = (state) =>
  get(state, ['user', 'registering'])

export const getPayload2FA = (state) => get(state, ['user', 'payload2FA'])
  
export const getEmailVerificationChallengeStatus = (state) => get(state, ['user', 'emailVerificationChallengeStatus']);

export const getMemberName = (state, baseGetter) => ({
  first: getFirstName(state, baseGetter),
  middle: getMiddleName(state, baseGetter),
  last: getLastName(state, baseGetter),
  ...nameMethods
})

export const getEmail = (state, baseGetter = getAccountInfo) =>
  get(baseGetter(state), ['email_address'])

export const getIsEmailVerified = (state) =>
  get(getBasicInfo(state), ['email_verified'])

export const getAddress = (state, baseGetter = getAccountInfo) => ({
  ...get(baseGetter(state), ['address'], {}),
  ...addressMethods
})

export const getPhoneNumbers = (state, baseGetter = getAccountInfo) => [
  ...get(baseGetter(state), ['phones'], [])
]

export const getFamilyMemberCOBSummary = (state) => {
  const familyMembers = get(state, ['user', 'familyCOBSummary'])

  if (!familyMembers) {
    return null
  }

  return familyMembers.map(
    ({
      first_name: first,
      middle_name: middle,
      last_name: last,
      prefix,
      suffix,
      ...values
    }) => ({
      name: {
        first,
        middle,
        last,
        prefix,
        suffix,
        ...nameMethods
      },
      ...values
    })
  )
}

export const getPCPs = (state) => {
  const pcps = get(getAccountInfo(state), ['pcps'])
  return (
    pcps &&
    pcps.map((pcp) => ({
      ...pcp,
      provider_name: {
        ...pcp.provider_name,
        ...nameMethods
      },
      provider_addresses: (
        pcp.provider_addresse ||
        pcp.provider_addresses ||
        []
      ).map((address) => ({
        ...address,
        ...addressMethods
      }))
    }))
  )
}

export const getRepresentative = (state) => {
  const representative = get(getAccountInfo(state), [
    'appointed_representative'
  ])
  return (
    representative && {
      ...representative,
      name: {
        ...representative.name,
        ...nameMethods
      },
      address: {
        ...representative.address,
        ...addressMethods
      }
    }
  )
}

export const getUnreadNotifications = (state) =>
  get(getBasicInfo(state), ['unread_notifications'])

export const getContactPreferences = (state) =>
  get(getAccountInfo(state), ['contact_preferences'])

export const getRxId = (state) => get(getMembershipSummaryRx(state), 'rx_id')

export const getRxPcn = (state) => get(getMembershipSummaryRx(state), 'rx_pcn')

export const getRxBin = (state) => get(getMembershipSummaryRx(state), 'rx_bin')

export const getRxGroup = (state) =>
  get(getMembershipSummaryRx(state), 'rx_group')

export const getPayerId = (state) =>
  get(getMembershipSummaryRx(state), 'payer_id')

export const getBenefitType = (state) =>
  get(getMembershipSummaryRx(state), 'benefit_type')

export const getFamilyMembers = (state) =>
  getMembershipFamilyMembers(state).map((dependent) => ({
    first: dependent.first_name,
    middle: dependent.middle_name,
    last: dependent.last_name,
    ...nameMethods
  }))

export const getBenefits = (state) =>
  getMembershipSummaryBenefits(state).map((benefit) => ({
    name: benefit.benefit_name,
    coverage: benefit.coverage
  }))

export const getDocuments = (state) =>
  getMembershipSummaryDocuments(state).map((document) => ({
    date: document.utc_date,
    displayName: document.display_name,
    fileId: document.file_id,
    fileName: document.file_name,
    tag: document.tag
  }))

export const getMembership = (state) => ({
  benefitType: getBenefitType(state),
  benefits: getBenefits(state),
  familyMembers: getFamilyMembers(state),
  documents: getDocuments(state),
  memberId: getMemberId(state),
  name: getMemberName(state),
  payerId: getPayerId(state),
  rxBin: getRxBin(state),
  rxGroup: getRxGroup(state),
  rxId: getRxId(state),
  rxPcn: getRxPcn(state)
})

export const getClaimsSummary = (state) => get(state, ['user', 'claimsSummary'])

export const getClaimDetail = (state, claimNumber) =>
  get(state, ['user', 'claims', claimNumber], {})

export const getClaimsList = (state) => {
  const claimsList = get(state, ['user', 'claimsList', 'data'])

  return (
    claimsList &&
    claimsList.map((claim) => ({
      ...claim,
      provider_addresses: (claim.provider_addresses || []).map(
        (address = {}) => ({
          ...omitBy(address, isNil),
          ...addressMethods
        })
      )
    }))
  )
}

export const getClaimLoading = (state) => {
  const pending = get(state, 'user.claimsList.pending')
  return pending
}

export const getClaimsListDataFrame = (state) => {
  const dataFrame = get(state, ['user', 'claimsList'])

  return dataFrame && omit(dataFrame, 'data')
}

export const getBenefitCoverages = (state) =>
  get(state, ['user', 'benefitCoverages'], [])

export const getSupportArticles = (state) =>
  get(state, ['user', 'supportArticles'])

export const getFAQs = (state) => get(state, ['user', 'faqs'])

export const getFiles = (state, type) => {
  const files = get(state, ['user', 'files'])
  return files == null ? files : files.data || []
}

export const getFilesDataFrame = (state) => {
  const dataFrame = get(state, ['user', 'files'])

  return dataFrame && omit(dataFrame, 'data')
}

export const getNotifications = (state) => {
  const notifications = get(state, ['user', 'notifications', 'data'])

  return (
    notifications && notifications.map((notification) => ({ ...notification }))
  )
}

export const getNotificationsMarkedQueue = (state) =>
  get(state, ['user', 'notifications', 'markedQueue'], [])

export const getNotificationsDataFrame = (state) => {
  const dataFrame = get(state, ['user', 'notifications'])

  return dataFrame && omit(dataFrame, 'data')
}

export const getAccumulators = (state) => ({
  ...get(state, ['user', 'accumulators'], null)
})

export const getWellnessGoals = (state) => [
  ...get(state, ['user', 'wellnessGoals'], [])
]

export const getWellnessGoal = ({ id, state }) => ({
  ...(getWellnessGoals(state) || []).find(
    (goal) => Number(goal.wellness_goal_id) === Number(id)
  )
})

export const getEducationalResources = (state) => ({
  ...get(state, ['user', 'educationalResources'])
})

export const getRewardBenefits = (state) => ({
  ...get(state, ['user', 'rewardBenefits'])
})

export const getRewardCategories = (state) => ({
  ...get(state, ['user', 'rewardCategories'])
})

export const getRegisteringUser = (state) => ({
  ...get(state, ['user', 'registering'], null)
})

export const isRegisteringUser = (state) => Boolean(getRegisteringUser(state))

export const isVerifiedRegisteringUser = (state) =>
  isRegisteringUser(state) && Boolean(getRegisteringUser(state).verified)
