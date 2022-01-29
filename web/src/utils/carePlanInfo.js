import constants from '@evry-member-app/shared/constants';

const {
  BONE_AND_JOINT_HEALTH_PLAN_ID,
  CANCER_TREATMENT_PLAN_ID,
  HEALTH_AND_WELLNESS_PLAN_ID,
  HEART_HEALTH_PLAN_ID,
  WOMENS_HEALTH_PLAN_ID
} = constants;

const getCarePlanInfo = planId => {
  switch (planId) {
    case HEART_HEALTH_PLAN_ID:
      return {
        title: 'Heart & Lung Health',
        description:
          'This Care Plan focuses on controling blood pressure, weight, cholesterol, and much more.',
        image: 'heart-health'
      };
    case HEALTH_AND_WELLNESS_PLAN_ID:
      return {
        title: 'Wellness & Fitness',
        description:
          'I am healthy and want to stay healthy.',
        image: 'wellness-and-fitness'
      };
    case BONE_AND_JOINT_HEALTH_PLAN_ID:
      return {
        title: 'Bone & Joint Health',
        description:
          'I frequently have bone or joint pain and would like to find good ways of dealing with that.',
        image: 'bone-and-joint-health'
      };
    case CANCER_TREATMENT_PLAN_ID:
      return {
        title: 'Cancer Treatment',
        description:
          'I am a cancer survivor or have recently been diagnosed with cancer.',
        image: 'cancer-treatment'
      };
    case WOMENS_HEALTH_PLAN_ID:
      return {
        title: "Women's Health",
        description:
          'I am planning on becoming pregnant or I am currently pregnant.',
        image: 'womens-health'
      };

    default:
      return null;
  }
};

export default getCarePlanInfo;
