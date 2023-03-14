const VND = require("../../lib/currency");
const { format } = require("date-fns");
const db = require("../models");
const InvoicesServices = require("../services/InvoicesServices");
const checkUndefinedObject = require("../../lib/checkUndefinedObject");
const ActivityServices = require("../services/ActivityServices");
const mongoose = require("mongoose");

class InvoiceController {
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
  async getInvoiceById(req, res) {
    try {
      const invoice = await InvoicesServices.getInvoiceById(req.query._id);
      return res.status(200).json(invoice);
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
      await ActivityServices.addActivity(
        "_create",
        `Tạo hoá đơn: <a target="_blank" rel="noopener noreferrer" href="/danh_sach_hoa_don/${savedInvoice._id}">${savedInvoice._id}</a><br>`
      );
      return res.status(200).json("xong");
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
      const result = await InvoicesServices.suaHangHoaTrongHoaDon(req.body);
      console.log(result[2]);
      return res.status(200).json(result[2]);
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
