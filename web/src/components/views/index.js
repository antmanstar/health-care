import Account, { reflection as accountReflection } from './Account';
import ChooseCarePlan, { reflection as chooseCarePlanReflection } from './ChooseCarePlan';
import CarePlanSuggestion, {
  reflection as carePlanSuggestionReflection,
} from './CarePlanSuggestion';
import Questionnaire, { reflection as questionnaireReflection } from './Questionnaire';
import Claims, { reflection as claimsReflection } from './Claims';
import Coverage, { reflection as coverageReflection } from './Coverage';
import Documents, { reflection as documentReflection } from './Documents';
import Plan, { reflection as planReflection } from './Plan';
import ProviderLookup, { reflection as providerReflection } from './ProviderLookup';
import Register, { reflection as registerReflection } from './Register';
import SignIn, { reflection as signInReflection } from './SignIn';
import Support, { reflection as supportReflection } from './Support';
import MeetYourGoals, { reflection as meetYourGoalsReflection } from './MeetYourGoals';
import GetStarted, { reflection as getStartedReflection } from './GetStarted';
import ArticlesAndResources, {
  reflection as articlesAndResourcesReflection,
} from './ArticlesAndResources';
import Rewards, { reflection as rewardsReflection } from './Rewards';
import WellnessProgram, { reflection as wellnessProgramReflection } from './WellnessProgram';
import Dashboard, { reflection as dashboardReflection } from './Dashboard';
import ContactEvry, { reflection as contactEvryReflection } from './ContactEvry';
import CreateAccount, { reflection as createAccountReflection } from './CreateAccount';
import RegisterSuccess, { reflection as registerSuccessReflection } from './RegisterSuccess';
import Onboarding, { reflection as onboardingReflection } from './Onboarding';
import ClaimsDetails, { reflection as claimsDetailsReflection } from './ClaimsDetails';
import SupportRequest, { reflection as supportRequestReflection } from './SupportRequest';
import SupportRequests, { reflection as supportRequestsReflection } from './SupportRequests';
import ReceivedDocuments, { reflection as receivedDocumentsReflection } from './ReceivedDocuments';
import DownloadForms, { reflection as downloadFormsReflection } from './DownloadForms';
import MemberTools, { reflection as memberToolsReflection } from './MemberTools';
import HealthAssessment, { reflection as healthAssessmentReflection } from './HealthAssessment';
import PasswordReset, { reflection as passwordResetReflection } from './PasswordReset';
import PasswordResetSuccess, { reflection as passwordResetSuccessReflection } from './PasswordResetSuccess';
import ContactSupportClaim, {
  reflection as contactSupportClaimReflection,
} from './ContactSupportClaim';
import EmailVerificationSent, {
  reflection as emailVerificationSentReflection,
} from './EmailVerificationSent';
import EmailVerification, { reflection as emailVerificationReflection } from './EmailVerification';

const reflections = [
  accountReflection,
  articlesAndResourcesReflection,
  carePlanSuggestionReflection,
  chooseCarePlanReflection,
  claimsReflection,
  claimsDetailsReflection,
  contactEvryReflection,
  contactSupportClaimReflection,
  coverageReflection,
  createAccountReflection,
  registerSuccessReflection,
  dashboardReflection,
  documentReflection,
  downloadFormsReflection,
  emailVerificationSentReflection,
  emailVerificationReflection,
  getStartedReflection,
  healthAssessmentReflection,
  meetYourGoalsReflection,
  memberToolsReflection,
  onboardingReflection,
  passwordResetReflection,
  passwordResetSuccessReflection,
  planReflection,
  providerReflection,
  questionnaireReflection,
  receivedDocumentsReflection,
  registerReflection,
  rewardsReflection,
  signInReflection,
  supportReflection,
  supportRequestReflection,
  supportRequestsReflection,
  wellnessProgramReflection,
];

export default reflections;

export {
  Account,
  ArticlesAndResources,
  CarePlanSuggestion,
  ChooseCarePlan,
  Claims,
  ClaimsDetails,
  ContactEvry,
  ContactSupportClaim,
  Coverage,
  CreateAccount,
  RegisterSuccess,
  Dashboard,
  Documents,
  DownloadForms,
  EmailVerificationSent,
  EmailVerification,
  GetStarted,
  HealthAssessment,
  MeetYourGoals,
  MemberTools,
  Onboarding,
  PasswordReset,
  PasswordResetSuccess,
  Plan,
  ProviderLookup,
  Questionnaire,
  ReceivedDocuments,
  Register,
  Rewards,
  SignIn,
  Support,
  SupportRequest,
  SupportRequests,
  WellnessProgram,
};
