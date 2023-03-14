const ActivityServices = require("../services/ActivityServices");
const WareServices = require("../services/WareServices");

module.exports = new (class {
  async createWare(req, res) {
    try {
      const doc = await WareServices.createWare(req.body);
      await ActivityServices.addActivity(
        "_import",
        `Nhập hàng hoá mới:<br>
        Tên hàng hoá: ${req.body.ten_hang_hoa} - Số lượng: ${req.body.so_luong}
        <br>Giá bán: ${req.body.gia_ban} - Giá nhập: ${req.body.gia_nhap}.<br>`
      );
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
      await ActivityServices.addActivity(
        "_import",
        `Nhập hàng hoá:<br>${req.body.updateWares.reduce((prev, curr) => {
          return (
            prev +
            `Tên hàng: ${curr.stock.ten_hang_hoa} - Số lượng: ${curr.amount}<br>`
          );
        }, "")}`
      );
      return res.status(200).json(doc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editWare(req, res) {
    try {
      const doc = await WareServices.editWare(req.body.ware);
      await ActivityServices.addActivity(
        "_edit",
        `Sửa hàng hoá:<br>Từ {Tên hàng hoá: ${doc.ten_hang_hoa}, Giá bán: ${doc.gia_ban}, Giá Nhập: ${doc.gia_nhap}, Số lượng: ${doc.so_luong_trong_kho}}
        <br>Thành {Tên hàng hoá: ${req.body.ware.ten_hang_hoa}, Giá bán: ${req.body.ware.gia_ban}, Giá Nhập: ${req.body.ware.gia_nhap}, Số lượng: ${req.body.ware.so_luong_trong_kho}}
        `
      );
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
      await ActivityServices.addActivity(
        "_delete",
        `Xoá hàng hoá - ID: ${deleteDoc._id}<br>{Tên hàng hoá: ${deleteDoc.ten_hang_hoa}, Giá bán: ${deleteDoc.gia_ban}, Giá Nhập: ${deleteDoc.gia_nhap}, Số lượng: ${deleteDoc.so_luong_trong_kho}}`
      );
      return res.status(200).json(deleteDoc);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
})();
