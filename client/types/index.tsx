import { Dispatch, SetStateAction } from "react";

export interface IId {
  _id: string;
}
export interface ITimeStamps {
  created_at: Date | string;
  updated_at: Date | string;
}
export interface IStock extends IId, ITimeStamps {
  hang_hoa?: any;
  ten_mat_hang: string;
  don_gia: number;
  so_luong: number;
  thanh_tien?: number;
}
export interface IPerson extends IId, ITimeStamps {
  ten_khach_hang: string;
  so_dien_thoai: string;
  dia_chi: string;
  so_tien_no?: number;
  tong_tien_mua?: number;
}
export interface IInvoiceVar extends IId, ITimeStamps {
  khach_hang: IPerson;
  so_tien_tra: number;
  ghi_chu: string;
  ngay_mua: Date | string;
  tong_tien?: number;
  hang_hoa?: IStock[];
}
export interface IData<T> {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  total?: number;
}
export interface IWare extends IId, ITimeStamps {
  ten_hang_hoa: string;
  gia_ban: number;
  gia_nhap: number;
  so_luong_da_ban: number;
  so_luong_trong_kho: number;
}

export interface IActivity extends IId, ITimeStamps {
  _type: "_edit" | "_delete" | "_import" | "_debt" | "_create";
  _content: string;
}
