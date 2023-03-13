import { IPerson } from "@/types";
import { easyReadMoney } from "@/utils/convert";
import styled from "styled-components";

const StyledDebtCard = styled.div`
  background: white;
  border: 1px solid #dbdbdb;
  padding: 12px;
  display: flex;
  align-items: center;
  .card-left {
    flex: 1;
    &-item {
      &__label {
        font-size: 14px;
        color: #262626;
      }
      span {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .card-right {
    display: flex;
    align-items: center;
    gap: 20px;
    &__debt-remain {
      &__label {
        font-size: 14px;
        color: #262626;
      }
      span {
        font-size: 14px;
        font-weight: 600;
      }
    }
    &__btn-container {
      button {
        background: #1f28af;
        color: white;
        padding: 8px 16px;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
`;
const DebtCard = ({
  handleOpenModal,
  _data,
}: {
  handleOpenModal: () => void;
  _data: IPerson;
}) => {
  return (
    <StyledDebtCard>
      <div className="card-left">
        <div className="card-left-item">
          <label htmlFor="" className="card-left-item__label">
            Họ và tên:{" "}
          </label>
          <span>{_data.ten_khach_hang}</span>
        </div>
        <div className="card-left-item">
          <label htmlFor="" className="card-left-item__label">
            Số điện thoại:{" "}
          </label>
          <span>{_data.so_dien_thoai}</span>
        </div>
        <div className="card-left-item">
          <label htmlFor="" className="card-left-item__label">
            Địa chỉ:{" "}
          </label>
          <span>{_data.dia_chi}</span>
        </div>
      </div>
      <div className="card-right">
        <div className="card-right__debt-remain">
          <label className="card-right__debt-remain__label">
            Số tiền còn nợ:{" "}
          </label>
          <span
            style={
              (_data.so_tien_no as number) > 0
                ? { color: "#e2574c", fontWeight: 600 }
                : { color: "#59ad6a", fontWeight: 600 }
            }
          >
            {easyReadMoney(_data.so_tien_no as number)}
          </span>
        </div>
        <div className="card-right__btn-container">
          <button onClick={handleOpenModal}>Trả nợ</button>
        </div>
      </div>
    </StyledDebtCard>
  );
};

export default DebtCard;
