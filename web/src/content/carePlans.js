import constants from '@evry-member-app/shared/constants';

const {
  BONE_AND_JOINT_HEALTH_PLAN_ID,
  CANCER_TREATMENT_PLAN_ID,
  HEALTH_AND_WELLNESS_PLAN_ID,
  HEART_HEALTH_PLAN_ID,
  WOMENS_HEALTH_PLAN_ID
} = constants;

const carePlans = [
  {
    active: true,
    title: 'Wellness & Fitness',
    icon: 'wellness-and-fitness',
    desc: 'I am healthy and want to stay healthy.',
    id: HEALTH_AND_WELLNESS_PLAN_ID
  },
  {
    title: 'Heart Health',
    icon: 'heart-health',
    desc: 'I have been treated for a heart or lung condition, or I am concerned of being at risk for one.',
    id: HEART_HEALTH_PLAN_ID
  },
  {
    title: 'Bone & Joint Health',
    icon: 'bone-and-joint-health',
    desc: 'I frequently have bone or joint pain and would like to find good ways of dealing with that.',
    id: BONE_AND_JOINT_HEALTH_PLAN_ID
  },
  {
    title: 'Cancer Treatment',
    icon: 'cancer-treatment',
    desc: 'I am a cancer survivor or have recently been diagnosed with cancer.',
    id: CANCER_TREATMENT_PLAN_ID
  },
  {
    title: "Women's Health",
    icon: 'womens-health',
    desc: 'I am planning on becoming pregnant or I am currently pregnant.',
    id: WOMENS_HEALTH_PLAN_ID
  }
];

export default carePlans;
