export function isClientMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 550
  ) {
    return true;
  }
  return false;
}

export function iOS() {
  if (process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

export function supportsPassive() {
  let passiveIfSupported = false;

  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line getter-return
        get() {
          passiveIfSupported = { passive: true };
        }
      })
    );
    // eslint-disable-next-line no-empty
  } catch (err) {}

  return passiveIfSupported;
}
