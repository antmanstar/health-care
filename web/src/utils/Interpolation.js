export default class Interpolation {
  constructor(data) {
    if (!(data instanceof Array)) {
      throw Error('Interpolation constructor: sole argument not of type Array');
    }
    this.data = data;
  }

  interpolate(state) {
    return this.data.map(datum => (typeof datum === 'function' ? datum(state) : datum));
  }
}
