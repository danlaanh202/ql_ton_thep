const WareServices = require("../services/WareServices");

module.exports = new (class {
  async createWare(req, res) {
    try {
      const doc = await WareServices.createWare(req.body);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getWaresWithPagination(req, res) {
    try {
      const doc = await WareServices.getWithPagination(
        req.query._page,
        req.query._limit
      );
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async updateWareAmount(req, res) {
    try {
      const doc = await WareServices.changeWareAmount(req.body.updateWares);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editWare(req, res) {
    try {
      const doc = await WareServices.editWare(req.body.ware);
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async searchWare(req, res) {
    try {
      const doc = await WareServices.searchWare(
        req.query.searchQuery,
        req.query._page,
        req.query._limit
      );
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async deleteWare(req, res) {
    try {
      const deleteDoc = await WareServices.deleteWare(req.query._id);
      return res.status(200).json(deleteDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
