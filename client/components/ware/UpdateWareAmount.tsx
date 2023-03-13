import { IStock } from "@/types";
import _helper from "../../utils/_helper";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import InputWithSearch from "../form/InputWithSearch";
import callApi from "@/utils/callApi";
import Spinner from "../loading/Spinner";
import useNotifications from "@/hooks/useNotifications";

const StyledUpdateForm = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  .row-container {
    display: flex;
    gap: 40px;
    margin: 0 8px 12px;
    align-items: center;
  }
  .icon-container {
    justify-content: center;
    font-size: 20px;
    margin-top: 20px;
    .add-btn {
      border: none;
      background: #1f28af;
      padding: 6px 20px;
      display: flex;
      align-items: center;
      color: white;
      cursor: pointer;
      border-radius: 8px;
      svg {
        font-size: 26px;
        color: white;
        margin-right: 8px;
      }
    }
  }
  .submit-btn {
    margin-top: 20px;
    background: #1f28af;
    color: white;
    padding: 12px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export interface IStockState {
  stock: IStock;
  amount: number;
}
const UpdateWareAmount = () => {
  const [defaultNumber, setDefaultNumber] = useState(3);
  const [stocks, setStocks] = useState<IStockState[] | {}[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMsg, contextHolder] = useNotifications();
  const addStock = (_stock: IStock, _index: number) => {
    setStocks((_prev) => {
      let prevArray = [..._prev];
      for (let i = prevArray.length; i <= _index; i++) {
        if (i === _index) {
          prevArray.push({
            stock: _stock,
            amount: 0,
          });
          return prevArray;
        }
        if (!prevArray[_index] && i !== _index) {
          prevArray.push({
            stock: {},
            amount: 0,
          });
        }
      }

      prevArray[_index] = {
        stock: _stock,
        amount:
          typeof (prevArray[_index] as IStockState).amount === "undefined"
            ? 0
            : (prevArray[_index] as IStockState).amount,
      };
      return prevArray;
    });
  };
  const addAmount = (_amount: number, _index: number) => {
    setStocks((_prev) => {
      let prevArray = [..._prev];
      prevArray[_index] = {
        ...prevArray[_index],
        amount: _amount,
      };
      return prevArray;
    });
  };
  const handleUpdateAmount = async () => {
    let filterStocks = _helper.removeUndefined(stocks);

    if (
      loading ||
      _helper.isDuplicateStock(filterStocks) ||
      filterStocks.length === 0
    ) {
      showMsg("Vui lòng thử lại", "error");
      return;
    }
    setLoading(true);
    try {
      await callApi.changeWaresAmount(filterStocks).then((res) => {
        showMsg("Nhập số lượng thành công", "success");
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      showMsg("Vui lòng thử lại !!", "error");
    }
  };
  // useEffect(() => {
  //   console.log(_helper.isDuplicateStock(_helper.removeUndefined(stocks)));
  //   console.log(_helper.removeUndefined(stocks));
  // }, [stocks]);
  return (
    <>
      {contextHolder}
      <StyledUpdateForm>
        {new Array(defaultNumber).fill(0).map((item, index) => (
          <div className="row-container" key={`abc ${index}`}>
            <InputWithSearch
              _type="name"
              title="Tên hàng hoá"
              _id={`hang_hoa_${index}`}
              _index={index}
              func={addStock}
            />
            <InputWithSearch
              _type="amount"
              title="Số lượng"
              _id={`so_luong_${index}`}
              _index={index}
              func={addAmount}
            />
          </div>
        ))}

        <div className="row-container icon-container">
          <button
            onClick={() => setDefaultNumber((prev) => prev + 1)}
            type="button"
            className="add-btn"
          >
            <PlusCircleOutlined /> Thêm hàng hoá
          </button>
        </div>
        <button className="submit-btn" onClick={handleUpdateAmount}>
          {loading ? <Spinner /> : "Hoàn tất"}
        </button>
      </StyledUpdateForm>
    </>
  );
};

export default UpdateWareAmount;
