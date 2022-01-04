const getCarePlanInfo = planId => {
  switch (planId) {
    case 1:
      return {
        title: 'Heart & Lung Health',
        description:
          'This care plan focuses on helping with diseases that affect your heart and lungs, and on conditions and health habits that increase your likelihood of developing heart disease.',
        image: 'plan-icon-heart'
      };
    case 2:
      return {
        title: 'Heart & Lung Health',
        description:
          'This care plan focuses on helping with diseases that affect your heart and lungs, and on conditions and health habits that increase your likelihood of developing heart disease.',
        image: 'plan-icon-heart'
      };
    case 3:
      return {
        title: 'Heart & Lung Health',
        description:
          'This care plan focuses on helping with diseases that affect your heart and lungs, and on conditions and health habits that increase your likelihood of developing heart disease.',
        image: 'plan-icon-heart'
      };
    case 4:
      return {
        title: 'Heart & Lung Health',
        description:
          'This care plan focuses on helping with diseases that affect your heart and lungs, and on conditions and health habits that increase your likelihood of developing heart disease.',
        image: 'plan-icon-heart'
      };
    case 5:
      return {
        title: 'Heart & Lung Health',
        description:
          'This care plan focuses on helping with diseases that affect your heart and lungs, and on conditions and health habits that increase your likelihood of developing heart disease.',
        image: 'plan-icon-heart'
      };

    default:
      return null;
  }
};

export default getCarePlanInfo;
