import axios from 'axios';

// function that makes the api request and returns a Promise for response
export function assignCarePlan({ from, id, replace, to, token }) {
  return axios.post(
    '/api/v1/Member/AssignCarePlan',
    {
      care_plan_id: id,
      effective_from_utc: from,
      effective_to_utc: to,
      replace_previously_assigned_care_plan: replace
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function createCase({ files, metadata, token, type }) {
  const data = new FormData();

  data.append(
    'case_info',
    JSON.stringify({
      case_type: type,
      metadata
    })
  );

  files.forEach(file => {
    data.append('files', file);
  });

  return axios.post('/api/v1/Member/CreateCase', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
}

export function checkEmailAddress({ email }) {
  return axios.post(
    '/api/v1/Member/EmailAddressCheck',
    { email_address: email },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function fetchAccountInfo({ token }) {
  return axios.get('/api/v1/Member/GetMemberAccountInfo', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchAnonymousTest({ token }) {
  return axios.get('/api/v1/Member/AnonymousTest', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchAuthorizationRequiredTest({ token }) {
  return axios.get('/api/v1/Member/AuthorizationRequiredTest', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchAvailableLanguages({ token }) {
  return axios.get('/api/v1/Member/GetAvailableLanguages', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchAvailableSpecialties({ token }) {
  return axios.get('/api/v1/Member/GetAvailableSpecialties', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchAccumulators({ token, id, date, type }) {
  return axios.post(
    '/api/v1/Member/GetAccumulators',
    {
      id,
      as_of: date,
      accumulators_type: type
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchBasicInfo({ token }) {
  return axios.get('/api/v1/Member/GetMemberBasicInfo', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchCareGuideInfo({ token }) {
  return axios.get('/api/v1/Member/GetMyCareCoordinator', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchCarePlan({ token }) {
  return axios.get('/api/v1/Member/GetUserAssignedCarePlan', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchCases({
  direction,
  orderBy,
  query,
  recordsPerPage,
  page,
  statuses,
  token,
  types
}) {
  return axios.post(
    '/api/v1/Member/GetCases',
    {
      case_statuses: statuses,
      case_types: types,
      order_by: orderBy,
      order_by_desc: direction,
      records_per_page: recordsPerPage,
      page,
      search_string: query
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchClaimsSummary({ id, token, type }) {
  return axios.post(
    '/api/v1/Member/GetClaimsSummary',
    {
      claims_summary_type: type,
      eligibility_id: id
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchBenefitCoverages({ token }) {
  return axios.get('/api/v1/Member/GetBenefitCoverages', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchClaimsList({ token, page = 1, recordsPerPage = 10, query = null }) {
  return axios.post(
    '/api/v1/Member/GetClaimList',
    {
      page,
      records_per_page: recordsPerPage,
      search_string: query
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchClaimDetail({ token, claimId }) {
  return axios.post(
    '/api/v1/Member/GetClaimDetail',
    {
      id: claimId
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchEducationalResources({ token }) {
  return axios.get('/api/v1/Member/GetMyEducationalResources', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchEvryContactInfo({ token }) {
  return axios.get('/api/v1/Member/GetEvryHealthContact', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchFamilyMemberCOB({ token }) {
  return axios.get('/api/v1/Member/GetFamilyMemberCOB', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchFamilyMemberCOBSummary({ token }) {
  return axios.get('/api/v1/Member/GetFamilyMemberCOBSummary', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchFAQs({
  token,
  page = 1,
  recordsPerPage = 4,
  searchString = null,
  orderBy,
  orderByDesc,
  supportArticleType = 2
}) {
  return axios.post(
    '/api/v1/Member/GetSupportArticles',
    {
      page,
      records_per_page: recordsPerPage,
      search_string: searchString,
      order_by: orderBy,
      order_by_desc: orderByDesc,
      support_article_type: supportArticleType
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchSupportArticles({
  token,
  page = 1,
  recordsPerPage = 6,
  searchString = null,
  orderBy,
  orderByDesc,
  supportArticleType = 1
}) {
  return axios.post(
    '/api/v1/Member/GetSupportArticles',
    {
      page,
      records_per_page: recordsPerPage,
      search_string: searchString,
      order_by: orderBy,
      order_by_desc: orderByDesc,
      support_article_type: supportArticleType
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchFiles({
  token,
  categories = [],
  documentTypes = [],
  page = 1,
  recordsPerPage = 10,
  query = null,
  orderBy,
  direction
}) {
  return axios.post(
    '/api/v1/Member/GetFiles',
    {
      categories,
      document_types: documentTypes,
      page,
      records_per_page: recordsPerPage,
      search_string: query,
      order_by: orderBy,
      order_by_desc: direction
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchFileContent({ token, id }) {
  return axios.post(
    '/api/v1/Member/GetFileContent',
    { id },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchMembershipSummary({ token }) {
  return axios.get('/api/v1/Member/GetMembershipSummary', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchNotifications({
  direction,
  orderBy,
  page = 1,
  query = null,
  read = null,
  recordsPerPage = 10,
  token
}) {
  return axios.post(
    '/api/v1/Member/GetNotifications',
    {
      order_by: orderBy,
      order_by_desc: direction,
      page,
      read_or_not: (read === true && 3) || (read === false && 2) || 1,
      records_per_page: recordsPerPage,
      search_string: query
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function fetchRewardBenefits({ token }) {
  return axios.get('/api/v1/Member/GetMyRewardBenefits', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchRewardCategories({ token }) {
  return axios.get('/api/v1/Member/GetMyRewardBenefitCategories', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchWellnessGoals({ token }) {
  return axios.get('/api/v1/Member/GetMyWellnessGoals', {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetch2FACode({ email, password }) {
  return axios.post(
    '/api/v1/Member/TwoWayFactorCodeRequest',
    {
      email_address: email,
      password
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function initiateAuthentication({ email, password }) {
  return axios.post(
    '/api/v1/Member/Login',
    {
      email_address: email,
      password
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function initiatePasswordReset({ email }) {
  return axios.post(
    '/api/v1/Member/PasswordResetRequest',
    {
      email_address: email
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    }
  );
}

export function markNotificationsAsRead({ ids = [], token }) {
  return axios
    .post(
      '/api/v1/Member/MarkNotificationsAsRead',
      { ids },
      {
        headers: {
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => ({ ...response, data: { ...(response.data || {}), ids } }));
}

export function register({ eligibilityId, email, last4SSN, password, passwordConfirm }) {
  return axios.post(
    '/api/v1/Member/UserRegistration',
    {
      eligibility_id: eligibilityId,
      email_address: email,
      last_4_digits_ssn: last4SSN,
      password,
      password_confirm: passwordConfirm
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function getLastQuestionnaireOrCreate({ id, token }) {
  return axios.post(
    '/api/v1/Member/GetLastUserQuestionnaireAndCreateIfNotExist',
    { id },
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function saveFamilyMemberCOB({
  token,
  data: {
    medicareEligibilityType,
    medicarePartA,
    medicarePartB,
    medicarePartC,
    medicarePartD,
    medicarePartAEffectiveDate,
    otherInsuranceType,
    otherInsuranceCarrierName,
    otherInsurancePolicyNumber,
    otherInsuranceCoverageFrom,
    otherInsuranceCoverageThru,
    hasMedicare,
    hasOtherHealthCoverage,
    memberCOBId
  }
}) {
  return axios.post(
    '/api/v1/Member/Logout',
    {},
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function savePasswordReset({ email, password, passwordConfirm, token }) {
  return axios.post(
    '/api/v1/Member/PasswordReset',
    {
      email_address: email,
      new_password: password,
      new_password_confirm: passwordConfirm,
      password_reset_token: token
    },
    {
      headers: {
        'Content-Type': 'application/json-patch+json'
      }
    }
  );
}

export function saveQuestionnaire({ questionnaire, token }) {
  return axios.post('/api/v1/Member/SaveUserQuestionnaire', questionnaire, {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function signOut({ token }) {
  return axios.post(
    '/api/v1/Member/Logout',
    {},
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function uploadFiles({ token, classification = '22', documentType = '220', files }) {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  return axios.post(
    `/api/v1/Member/UploadFile?classification=${classification}&document_type=${documentType}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function verify2FACode({ email, token, code }) {
  return axios.post(
    '/api/v1/Member/TwoWayFactorChallenge',
    {
      email_address: email,
      identification_code: code,
      two_way_factor_token: token
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function verifyEligibilityIdAndSSN({ eligibilityId, last4SSN }) {
  return axios.post(
    '/api/v1/Member/EligibilityIDAndSSNCheck',
    {
      eligibility_id: eligibilityId,
      last_4_digits_ssn: last4SSN
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function verifyEmail({ token }) {
  return axios.post(
    '/api/v1/Member/EmailVerificationRequest',
    {
      token
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}

export function verifyEmailChallenge({ emailAddress, verificationCode }) {
  return axios.post(
    '/api/v1/Member/EmailVerificationChallenge',
    {
      email_address: emailAddress,
      email_address_verification_code: verificationCode
    },
    {
      'Content-Type': 'application/json-patch+json'
    }
  );
}
