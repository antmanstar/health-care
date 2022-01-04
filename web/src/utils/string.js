const truncate = (length, offset = 0, separator = ' ', omission = '...') => str => {
  if (str.length > length) {
    let truncatedStr = str.substring(0, length - offset);
    if (separator !== '' && truncatedStr.lastIndexOf(separator) !== -1) {
      truncatedStr = truncatedStr.substring(0, truncatedStr.lastIndexOf(separator));
    }
    return `${truncatedStr}${omission}`;
  }
  return str;
};

export default truncate;
