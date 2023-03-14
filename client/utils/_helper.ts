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

class DocTienBangChu {
  chuSo: string[];
  tien: string[];
  constructor() {
    this.chuSo = [
      " không ",
      " một ",
      " hai ",
      " ba ",
      " bốn ",
      " năm ",
      " sáu ",
      " bảy ",
      " tám ",
      " chín ",
    ];
    this.tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];
  }
  docSo3ChuSo(baso: number) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(String(baso / 100));
    chuc = parseInt(String((baso % 100) / 10));
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
      KetQua += this.chuSo[tram] + " trăm ";
      if (chuc == 0 && donvi != 0) KetQua += " linh ";
    }
    if (chuc != 0 && chuc != 1) {
      KetQua += this.chuSo[chuc] + " mươi";
      if (chuc == 0 && donvi != 0) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
      case 1:
        if (chuc != 0 && chuc != 1) {
          KetQua += " mốt ";
        } else {
          KetQua += this.chuSo[donvi];
        }
        break;
      case 5:
        if (chuc == 0) {
          KetQua += this.chuSo[donvi];
        } else {
          KetQua += " lăm ";
        }
        break;
      default:
        if (donvi != 0) {
          KetQua += this.chuSo[donvi];
        }
        break;
    }
    return KetQua;
  }
  doc(SoTien: number) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var soAm = false;
    var ViTri = new Array();
    if (SoTien < 0) soAm = true; //return "Số tiền âm !";
    if (SoTien == 0) return "Không đồng"; //"Không đồng !";
    if (SoTien > 0) {
      so = SoTien;
    } else {
      so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
      //SoTien = 0;
      return ""; //"Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5])) ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4])) ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3])) ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(String(so / 1000000));
    if (isNaN(ViTri[2])) ViTri[2] = "0";
    ViTri[1] = parseInt(String((so % 1000000) / 1000));
    if (isNaN(ViTri[1])) ViTri[1] = "0";
    ViTri[0] = parseInt(String(so % 1000));
    if (isNaN(ViTri[0])) ViTri[0] = "0";
    if (ViTri[5] > 0) {
      lan = 5;
    } else if (ViTri[4] > 0) {
      lan = 4;
    } else if (ViTri[3] > 0) {
      lan = 3;
    } else if (ViTri[2] > 0) {
      lan = 2;
    } else if (ViTri[1] > 0) {
      lan = 1;
    } else {
      lan = 0;
    }
    for (i = lan; i >= 0; i--) {
      tmp = this.docSo3ChuSo(ViTri[i]);
      KetQua += tmp;
      if (ViTri[i] > 0) KetQua += this.tien[i];
      if (i > 0 && tmp.length > 0) KetQua += ","; //',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ",") {
      KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    if (soAm) {
      return "Âm " + KetQua + " đồng"; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    } else {
      return KetQua + " đồng"; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }
  }
}

helper.removeUndefined = removeUndefined;
helper.removeUndefinedFromInvoices = removeUndefinedFromInvoices;
helper.isDuplicateStock = isDuplicateStock;
helper.isDuplicateFromInvoices = isDuplicateFromInvoices;
helper.docTien = new DocTienBangChu();
export default helper;
