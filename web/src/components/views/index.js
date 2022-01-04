import Account, { reflection as accountReflection } from './Account';
import ChooseCarePlan, { reflection as chooseCarePlanReflection } from './ChooseCarePlan';
import CarePlanSuggestion, {
  reflection as carePlanSuggestionReflection
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
  reflection as articlesAndResourcesReflection
} from './ArticlesAndResources';
import Rewards, { reflection as rewardsReflection } from './Rewards';
import WellnessProgram, { reflection as wellnessProgramReflection } from './WellnessProgram';
import Dashboard, { reflection as dashboardReflection } from './Dashboard';
import ContactEvry, { reflection as contactEvryReflection } from './ContactEvry';
import CreateAccount, { reflection as createAccountReflection } from './CreateAccount';
import Onboarding, { reflection as onboardingReflection } from './Onboarding';
import ClaimsDetails, { reflection as claimsDetailsReflection } from './ClaimsDetails';
import SupportRequest, { reflection as supportRequestReflection } from './SupportRequest';
import SupportRequests, { reflection as supportRequestsReflection } from './SupportRequests';
import ReceivedDocuments, { reflection as receivedDocumentsReflection } from './ReceivedDocuments';
import DownloadForms, { reflection as downloadFormsReflection } from './DownloadForms';
import MemberTools, { reflection as memberToolsReflection } from './MemberTools';
import HealthAssessment, { reflection as healthAssessmentReflection } from './HealthAssessment';
import PasswordReset, { reflection as passwordResetReflection } from './PasswordReset';
import UpdatePassword, { reflection as updatePasswordReflection } from './UpdatePassword';
import UpdateSecurityQuestions, {
  reflection as updateSecurityQuestionsReflection
} from './UpdateSecurityQuestions';
import ContactSupportClaim, {
  reflection as contactSupportClaimReflection
} from './ContactSupportClaim';
import PersonalInformation, {
  reflection as personalInformationReflection
} from './PersonalInformation';
import ContactPreferences, {
  reflection as contactPreferencesReflection
} from './ContactPreferences';

const reflections = [
  accountReflection,
  articlesAndResourcesReflection,
  carePlanSuggestionReflection,
  chooseCarePlanReflection,
  claimsReflection,
  claimsDetailsReflection,
  contactEvryReflection,
  contactPreferencesReflection,
  contactSupportClaimReflection,
  coverageReflection,
  createAccountReflection,
  dashboardReflection,
  documentReflection,
  downloadFormsReflection,
  getStartedReflection,
  healthAssessmentReflection,
  meetYourGoalsReflection,
  memberToolsReflection,
  onboardingReflection,
  passwordResetReflection,
  personalInformationReflection,
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
  updatePasswordReflection,
  updateSecurityQuestionsReflection,
  wellnessProgramReflection
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
  ContactPreferences,
  ContactSupportClaim,
  Coverage,
  CreateAccount,
  Dashboard,
  Documents,
  DownloadForms,
  GetStarted,
  HealthAssessment,
  MeetYourGoals,
  MemberTools,
  Onboarding,
  PasswordReset,
  PersonalInformation,
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
  UpdatePassword,
  UpdateSecurityQuestions,
  WellnessProgram
};
