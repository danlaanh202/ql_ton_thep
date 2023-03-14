import { IStock, IWare } from "@/types";
import { easyReadMoney } from "@/utils/convert";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import FormInputNoControl from "./FormInputNoControl";
import { IStocksState } from "@/pages/nhap_hoa_don";

const StyledStockContainer = styled.div`
  .row-container {
    display: flex;
    gap: 40px;
    margin: 0 8px 12px;
    align-items: center;
    .stock_total {
      font-size: 16px;
    }
  }
`;
const StockRow = ({
  setStocks,
  stocks,
  index,
}: {
  setStocks: Dispatch<SetStateAction<IStocksState[] | {}[]>>;
  stocks: IStocksState[] | {}[];
  index: number;
}) => {
  const [thanhTien, setThanhTien] = useState(0);

  const handleStock = (_stock: IWare, _index: number) => {
    setStocks((_prev) => {
      let prevArray = [..._prev];
      for (let i = prevArray.length; i <= _index; i++) {
        if (i === _index) {
          prevArray.push({
            hang_hoa: _stock,
            don_gia: 0,
            so_luong: 0,
          });
          return prevArray;
        }
        if (!prevArray[_index] && i !== _index) {
          prevArray.push({
            hang_hoa: {},
            don_gia: 0,
            so_luong: 0,
          });
        }
      }
      prevArray[_index] = {
        hang_hoa: _stock,
        so_luong:
          typeof (prevArray[_index] as IStocksState).so_luong === "undefined"
            ? 0
            : (prevArray[_index] as IStocksState).so_luong,
        don_gia:
          typeof (prevArray[_index] as IStocksState).don_gia === "undefined"
            ? 0
            : (prevArray[_index] as IStocksState).don_gia,
      };
      return prevArray;
    });
  };
  const handlePrice = (_price: number, _index: number) => {
    setStocks((_prev) => {
      let prevArray = [..._prev];
      prevArray[_index] = { ...prevArray[_index], don_gia: _price };
      return prevArray;
    });
  };
  const handleAmount = (_amount: number, _index: number) => {
    setStocks((_prev) => {
      let prevArray = [..._prev];
      prevArray[_index] = { ...prevArray[_index], so_luong: _amount };
      return prevArray;
    });
  };
  useEffect(() => {
    setThanhTien(
      ((stocks[index] as IStocksState)?.so_luong || 0) *
        ((stocks[index] as IStocksState)?.don_gia || 0)
    );
    // console.log(stocks[index]);
  }, [stocks[index]]);
  return (
    <StyledStockContainer>
      <div className="row-container">
        <FormInputNoControl
          _index={index}
          labelString="Tên mặt hàng"
          handleInput={handleStock}
          withDropdown={true}
          _type="name"
        />
        <FormInputNoControl
          _index={index}
          handleInput={handlePrice}
          labelString="Đơn giá "
          placeholder="Ví dụ: (60000)"
          _type="price"
        />
        <FormInputNoControl
          _index={index}
          labelString="Số lượng"
          handleInput={handleAmount}
          _type="amount"
        />
      </div>
      <div className="row-container">
        <div className="stock_total">
          Thành tiền: {easyReadMoney((thanhTien as number) || 0)}
        </div>
      </div>
    </StyledStockContainer>
  );
};

export default StockRow;
