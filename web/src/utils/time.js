function getGreetingTime(m) {
  let g = null;

  if (!m || !m.isValid()) {
    return;
  }

  const splitAfternoon = 12;
  const splitEvening = 17;
  const currentHour = parseFloat(m.format('HH'));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    g = 'afternoon';
  } else if (currentHour >= splitEvening) {
    g = 'evening';
  } else {
    g = 'morning';
  }

  return g;
}

export default getGreetingTime;
