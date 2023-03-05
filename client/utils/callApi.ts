import { IStockState } from "@/components/ware/UpdateWareAmount";
import { IStocksState } from "@/pages/nhap_hoa_don";
import { IStock, IWare } from "@/types";
import axios from "axios";

export const publicRequest = axios.create({
  baseURL: "http://localhost:4000",
});

export default new (class CallApi {
  // ====================================== INVOICES =====================================
  async createInvoice(data: any, _id: string) {
    return await publicRequest.post("/invoice/post", {
      khach_hang_id: _id,
      so_tien_tra: data.so_tien_tra,
      hang_hoa: data.stocks as IStocksState[],
      ngay_mua: data.buyDate.toISOString(),
      ghi_chu: data.ghi_chu,
      tong_tien: data.totalPrice,
    });
  }
  async getInvoices() {
    return await publicRequest.get("/invoice/get");
  }
  async getInvoicesById(_id: string) {
    return await publicRequest.get("/invoice/get_by_person_id", {
      params: {
        khach_hang_id: _id,
      },
    });
  }
  async getInvoicesWithQuery(personName: string, _page: number | string) {
    return await publicRequest.get("/invoice/get_with_query", {
      params: {
        ten_khach_hang: personName,
        _page: _page,
      },
    });
  }
  async changeInvoiceInfo(
    _id: string,
    so_tien_tra: number,
    khach_hang_id: string
  ) {
    return await publicRequest.put("/invoice/change_invoice_info", {
      _id,
      so_tien_tra,
      khach_hang_id,
    });
  }
  async getInvoicesWithPagination(_page: number) {
    return await publicRequest.get("/invoice/get_with_paginate", {
      params: {
        _page: _page,
      },
    });
  }
  // ================================== PEOPLE/CUSTOMER =======================
  async createPerson(_data: any, _searchQuery: string) {
    return await publicRequest.post("/person/post", {
      ten_khach_hang: _searchQuery,
      so_dien_thoai: _data.so_dien_thoai,
      dia_chi: _data.dia_chi,
    });
  }
  async getPeople() {
    return await publicRequest.get("/person/get");
  }
  async getPeopleWithSearchQuery(_searchQuery: string, _page: number) {
    return await publicRequest.get("/person/get_people", {
      params: {
        ten_khach_hang: _searchQuery,
        _page: _page,
      },
    });
  }
  async getPeopleWithPagination(_page: number) {
    return await publicRequest.get("/person/get_with_paginate", {
      params: {
        _page,
      },
    });
  }
  // ================================== Ware ===================================
  async createWare(_data: IWare) {
    return await publicRequest.post("/ware/create", _data);
  }
  async searchWare(searchQuery: string, _page: number, _limit = 10) {
    return await publicRequest.get("/ware/search", {
      params: {
        searchQuery,
        _page,
        _limit,
      },
    });
  }
  async changeWaresAmount(_data: IStockState[]) {
    return await publicRequest.put("/ware/update_amount", {
      updateWares: _data,
    });
  }
  async editWare(_data: IWare) {
    return await publicRequest.put("/ware/update", {
      ware: _data,
    });
  }
  async deleteWare(_id: string) {
    return await publicRequest.delete("ware/delete", {
      params: {
        _id,
      },
    });
  }
})();
