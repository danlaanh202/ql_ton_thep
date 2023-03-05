const VND = require("../../lib/currency");
const { updatePersonMoneyById } = require("../../lib/personHandle");
const { format } = require("date-fns");
const db = require("../models");

const InvoicesServices = require("../services/InvoicesServices");
const checkUndefinedObject = require("../../lib/checkUndefinedObject");
const mongoose = require("mongoose");

class InvoiceController {
  async createInvoice(req, res) {
    const newInvoice = new db.Invoice({
      khach_hang: req.body.khach_hang_id,
      so_tien_tra: req.body.so_tien_tra,
      hang_hoa: req.body.hang_hoa.map((item) => {
        return {
          ...item,
          hang_hoa: mongoose.Types.ObjectId(item.hang_hoa._id),
        };
      }),
      ngay_mua: req.body.ngay_mua,
      ghi_chu: `Tạo hoá đơn với số tiền ban đầu là: ${VND(
        req.body.so_tien_tra
      )} vào ngày ${format(new Date(req.body.ngay_mua), "dd/MM/yyyy")}.<br>${
        req.body.ghi_chu
      }`,
      tong_tien: req.body.tong_tien,
    });
    try {
      const savedInvoice = await InvoicesServices.createInvoiceFunc(
        req.body,
        newInvoice
      );
      return res.status(200).json(savedInvoice);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getInvoices(req, res) {
    try {
      const invoices = await InvoicesServices.getAllInvoices();
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getInvoicesOfId(req, res) {
    try {
      const invoices = await InvoicesServices.getInvoicesOfId(
        req.query.khach_hang_id
      );
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getInvoicesByName(req, res) {
    try {
      const invoices = await InvoicesServices.getByName(
        req.query.ten_khach_hang,
        req.query._page || 1
      );
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async changeInvoiceInfo(req, res) {
    try {
      const updatedInvoice = await InvoicesServices.editInvoice(req.body);
      return res.status(200).json(updatedInvoice);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async editWareListsOfInvoice(req, res) {
    try {
      const result = await InvoicesServices.suaHangHoaTrongHoaDon();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(200).json(error);
    }
  }

  // ====================
  async getInvoicesWithPagination(req, res) {
    try {
      const invoices = await InvoicesServices.getInvoicesWithPagination(
        req.query._page,
        10
      );
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new InvoiceController();
