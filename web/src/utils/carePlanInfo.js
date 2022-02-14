import constants from '@evry-member-app/shared/constants';

const {
  BONE_AND_JOINT_HEALTH_PLAN_ID,
  CANCER_TREATMENT_PLAN_ID,
  HEALTH_AND_WELLNESS_PLAN_ID,
  HEART_HEALTH_PLAN_ID,
  WOMENS_HEALTH_PLAN_ID,
  BONE_AND_JOINT_HEALTH_PLAN_NAME,
  CANCER_TREATMENT_PLAN_NAME,
  HEALTH_AND_WELLNESS_PLAN_NAME,
  HEART_HEALTH_PLAN_NAME,
  WOMENS_HEALTH_PLAN_NAME
} = constants;

const getCarePlanInfo = planId => {
  switch (planId) {
    case HEART_HEALTH_PLAN_ID:
      return {
        title: HEART_HEALTH_PLAN_NAME,
        note:
          'This Care Plan focuses on controlling blood pressure, weight, cholesterol, and much more.',
        description:
          'The Heart & Lung care plan is designed to promote and improve cardiovascular and lung health. It’s full of resources to help manage asthma, weight, blood pressure, high cholesterol, COPD or diabetes. <br>This plan is intended for individuals who have previously had a heart attack, coronary artery disease, valvular heart disease, hypertension, hyperlipidemia, diabetes, renal disease, peripheral artery disease, blood dycrasias, or similar conditions. This plan is probably not a fit for you if you are pregnant or planning to become pregnant, anticipate an orthopedic surgery within the next three months, actively manage chronic back or joint pain with opioids, are currently receiving treatment for cancer or have received treatment within the past six months. ',
        image: 'heart-health'
      };
    case HEALTH_AND_WELLNESS_PLAN_ID:
      return {
        title: HEALTH_AND_WELLNESS_PLAN_NAME,
        note: 'I am healthy and want to stay healthy.',
        description:
          'The Health & Wellness care plan is designed for people who don’t have a severe medical condition and want to sustain their current health or achieve a specific fitness goal. This plan is full of resources focused on exercise, nutrition, mental health support, and quitting smoking, alcohol, or drugs. <br>A different care plan can serve you better if you have ever had a heart attack, stroke, cancer, chronic joint or back pain, or are pregnant or planning to become pregnant.',

        image: 'wellness-and-fitness'
      };
    case BONE_AND_JOINT_HEALTH_PLAN_ID:
      return {
        title: BONE_AND_JOINT_HEALTH_PLAN_NAME,
        note:
          'I frequently have bone or joint pain and would like to find good ways of dealing with that.',
        description:
          'The Bone & Joint care plan is designed to support and improve joint and bone health, as well as to manage chronic pain. It’s full of resources to help prepare for orthopedic surgery within the next 12 months and to help you deal with your pain. <br>A different care plan can serve you better if you are currently receiving treatment for cancer or have received treatment within the past six months, or are pregnant or planning to become pregnant.',
        image: 'bone-and-joint-health'
      };
    case CANCER_TREATMENT_PLAN_ID:
      return {
        title: CANCER_TREATMENT_PLAN_NAME,
        note: 'I am a cancer survivor or have recently been diagnosed with cancer.',
        description:
          'The cancer prevention and treatment care plan is full of resources to help you deal with a recent cancer diagnosis and to support you throughout treatment and post recovery. This plan is also well suited for anyone with a history, or family history, of cancer. Due to the complexities inherent with cancer, a one size fit all program is difficult and we encourage you to contact your Evry Care Guide to learn more about all the ways Evry can support you.',
        image: 'cancer-treatment'
      };
    case WOMENS_HEALTH_PLAN_ID:
      return {
        title: WOMENS_HEALTH_PLAN_NAME,
        note: 'I am planning on becoming pregnant or I am currently pregnant.',
        description:
          'The women’s health and maternity care plan is full of resources for women who are starting family planning through trying to become pregnant, pregnancy, and the post-partum period. It’s also designed to provide support for a variety of health issues ranging from gynecological health to low libido to ovarian conditions to infertility. <br>This plan contains most of the resources found in the general health and wellness care plan while also providing additional women-centric support. ',
        image: 'womens-health'
      };

    default:
      return null;
  }
};

export default getCarePlanInfo;
