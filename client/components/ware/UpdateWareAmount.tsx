import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import InputWithSearch from "../form/InputWithSearch";

const StyledUpdateForm = styled.form`
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
    max-width: 200px;
    text-align: center;
  }
`;
const UpdateWareAmount = () => {
  const [defaultNumber, setDefaultNumber] = useState(3);
  return (
    <StyledUpdateForm>
      {new Array(defaultNumber).fill(0).map((item, index) => (
        <div className="row-container" key={`abc ${index}`}>
          <InputWithSearch
            _type="name"
            title="Tên hàng hoá"
            _id={`hang_hoa_${index}`}
          />
          <InputWithSearch
            _type="amount"
            title="Số lượng"
            _id={`so_luong_${index}`}
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
      <button className="submit-btn">Hoàn tất</button>
    </StyledUpdateForm>
  );
};

export default UpdateWareAmount;
