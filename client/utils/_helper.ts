import { IStockState } from "@/components/ware/UpdateWareAmount";
import { IStock } from "@/types";
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
helper.removeUndefined = removeUndefined;
helper.isDuplicateStock = isDuplicateStock;
export default helper;
