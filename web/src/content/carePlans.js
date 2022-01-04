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
    desc: 'COPY NEEDED HERE',
    id: HEART_HEALTH_PLAN_ID
  },
  {
    title: 'Bone & Joint Health',
    icon: 'bone-and-joint-health',
    desc: 'COPY NEEDED HERE',
    id: BONE_AND_JOINT_HEALTH_PLAN_ID
  },
  {
    title: 'Cancer Treatment',
    icon: 'cancer-treatment',
    desc: 'COPY NEEDED HERE',
    id: CANCER_TREATMENT_PLAN_ID
  },
  {
    title: "Women's Health",
    icon: 'womens-health',
    desc: 'COPY NEEDED HERE',
    id: WOMENS_HEALTH_PLAN_ID
  }
];

export default carePlans;
