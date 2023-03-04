import { IStockState } from "@/components/ware/UpdateWareAmount";
import { IStocksState } from "@/pages/nhap_hoa_don";
import { IStock, IWare } from "@/types";
const helper: any = {};
// function isEmptyObject(obj: any) {}

function removeUndefined(_data: IStockState[]): IStockState[] {
  return _data.filter((item) => item.stock._id && item.amount);
}
function isDuplicateStock(_data: IStockState[]) {
  const uniqueArray = new Set(_data.map((item) => item.stock._id));
  return uniqueArray.size < _data.length;
}
// helper.validateWaresAmount = validateWaresAmount;

function removeUndefinedFromInvoices(_data: IStocksState[]): IStocksState[] {
  return _data.filter(
    (item) => (item.hang_hoa as IWare)._id && item.so_luong && item.don_gia
  );
}
function isDuplicateFromInvoices(_data: IStocksState[]) {
  const uniqueArray = new Set(
    _data.map((item) => (item.hang_hoa as IWare)._id)
  );
  return uniqueArray.size < _data.length;
}
helper.removeUndefined = removeUndefined;
helper.removeUndefinedFromInvoices = removeUndefinedFromInvoices;
helper.isDuplicateStock = isDuplicateStock;
helper.isDuplicateFromInvoices = isDuplicateFromInvoices;
export default helper;
