module.exports = (_updateObj) => {
  for (let [key, value] of Object.entries(_updateObj)) {
    if (value !== undefined) {
      _updateObj[key] = value;
    }
  }
  return _updateObj;
};
