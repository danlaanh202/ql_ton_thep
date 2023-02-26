module.exports = (_updateObj) => {
  for (let [key, value] of Object.entries(payload)) {
    if (value !== undefined) {
      _updateObj[key] = value;
    }
  }
  return _updateObj;
};
