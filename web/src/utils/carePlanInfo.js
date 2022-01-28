const getCarePlanInfo = planId => {
  switch (planId) {
    case 1:
      return {
        title: 'Heart & Lung Health',
        description:
          'This Care Plan focuses on controling blood pressure, weight, cholesterol, and much more.',
        image: 'plan-icon-heart'
      };
    case 2:
      return {
        title: 'Heart & Lung Health',
        description:
          'This Care Plan focuses on controling blood pressure, weight, cholesterol, and much more.',
        image: 'plan-icon-heart'
      };
    case 3:
      return {
        title: 'Heart & Lung Health',
        description:
          'This Care Plan focuses on controling blood pressure, weight, cholesterol, and much more.',
        image: 'plan-icon-heart'
      };
    case 4:
      return {
        title: 'Heart & Lung Health',
        description:
          'This Care Plan focuses on controling blood pressure, weight, cholesterol, and much more.',
        image: 'plan-icon-heart'
      };
    case 5:
      return {
        title: 'Heart & Lung Health',
        description:
          'This Care Plan focuses on controling blood pressure, weight, cholesterol, and much more.',
        image: 'plan-icon-heart'
      };

    default:
      return null;
  }
};

export default getCarePlanInfo;
