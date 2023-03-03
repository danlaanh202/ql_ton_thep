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
  setStocks: Dispatch<SetStateAction<IStocksState[]>>;
  stocks: IStocksState[];
  index: number;
}) => {
  const [stock, setStock] = useState<IStocksState | {}>({});

  // const handleName = (e: ChangeEvent<HTMLInputElement>) => {
  //   setStock((prev: IStock) => {
  //     return { ...prev, ten_mat_hang: e.target.value as string };
  //   });
  // };
  // const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
  //   setStock((prev: IStock) => {
  //     return { ...prev, don_gia: Number(e.target.value) };
  //   });
  // };
  // const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
  //   setStock((prev: IStock) => {
  //     return { ...prev, so_luong: Number(e.target.value) };
  //   });
  // };
  // useEffect(() => {
  //   setStocks((prev: IStock[]) => {
  //     const prevStocks = [...prev];
  //     prevStocks[index] = stock;
  //     return prevStocks.filter((element) => {
  //       return element.ten_mat_hang !== "";
  //     });
  //   });
  // }, [stock]);
  // useEffect(() => {
  //   if (stock.don_gia && stock.so_luong) {
  //     setStock((prev: IStock) => {
  //       return {
  //         ...prev,
  //         thanh_tien: prev.so_luong * prev.don_gia,
  //         uuid: uuidv4(),
  //       };
  //     });
  //   }
  // }, [stock.don_gia, stock.so_luong]);
  const handleStock = (_stock: IWare, _index: number) => {};
  const handlePrice = (_price: number, _index: number) => {};
  const handleAmount = (_amount: number, _index: number) => {};
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
          {/* Thành tiền: {easyReadMoney(stock.thanh_tien as number)} */}
        </div>
      </div>
    </StyledStockContainer>
  );
};

export default StockRow;
