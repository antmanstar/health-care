export const FILE_CATEGORIES = {
  USER_NOTICES: [20],
  CLAIMS_DOCUMENTS: [21],
  DOWNLOADABLE_FORMS: [101],
  combine: (...categories: Array<[number]>) =>
    categories.reduce((prev, category) => prev.concat(category), [])
}

export const INDIVIDUAL = 1
export const FAMILY = 2

export const MEDICAL_MOOP = 1
export const MEDICAL_DEDUCTIBLE = 2
export const PRESCRIPTION_MOOP = 3
export const PRESCRIPTION_DEDUCTIBLE = 4

export const IN_NETWORK = 1
export const OUT_OF_NETWORK = 2

export const REQUEST_INFORMATION = 1
export const SCHEDULE_APPOINTMENT = 2
export const SCHEDULE_PHONE_CALL = 3
export const SEND_A_MESSAGE_TO_CARE_COORDINATOR = 4
export const PROVIDER_FEEDBACK = 5
export const CLAIM_FEEDBACK = 6
export const ID_CARD_REQUEST = 7
export const ADDRESS_UPDATE = 8
export const PHONE_NUMBER_UPDATE = 9
export const PCP_UPDATE = 10
export const APPOINTED_REPRESENTATIVE_UPDATE = 11
export const COB_UPDATE = 12

export const TEXT = 11
export const INTEGER = 12
export const DOUBLE = 13
export const DECIMAL = 14
export const DATE_TIME = 15
export const BOOLEAN = 16

export const SUBMITTED = 1
export const CREATED = 2
export const ON_HOLD = 3
export const ESCALATED = 4
export const CLOSED = 5

export const HEALTH_AND_WELLNESS_PLAN_ID = 5
export const HEART_HEALTH_PLAN_ID = 1
export const BONE_AND_JOINT_HEALTH_PLAN_ID = 2
export const CANCER_TREATMENT_PLAN_ID = 3
export const WOMENS_HEALTH_PLAN_ID = 4
