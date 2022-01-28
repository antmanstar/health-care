const numberFormat = amount => {
  return amount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export default numberFormat;
