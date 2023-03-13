import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "antd";
import { IPerson } from "@/types";
import styled from "styled-components";
import { easyReadMoney } from "@/utils/convert";
import callApi from "@/utils/callApi";
const StyledDebtContent = styled.div`
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
  }
  .input-container {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      padding: 8px;
      outline: none;
      border: 1px solid #dbdbdb;
      width: 60%;
    }
  }
`;
const DebtModal = ({
  open,
  setOpen,
  _data,
  showMsg,
  updateData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  _data: IPerson;
  showMsg: any;
  updateData: (_money: number) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [money, setMoney] = useState("");

  const handleCancel = () => {
    setOpen(false);
  };
  const handlePayDebt = async () => {
    setLoading(true);
    try {
      await callApi.payDebt(_data._id, Number(money)).then((res) => {
        updateData(Number(money));
        showMsg(
          `${_data.ten_khach_hang} trả số tiền: ${easyReadMoney(
            Number(money)
          )} thành công!!`,
          "success"
        );
        handleCancel();
      });
    } catch (error) {
      setLoading(false);
      handleCancel();
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title="Trả nợ"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handlePayDebt}
          >
            Hoàn tất
          </Button>,
        ]}
      >
        <StyledDebtContent>
          <div className="card">
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
            </div>
          </div>
          <div className="input-container">
            <input
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              type="text"
              placeholder="Nhập vào số tiền trả"
            />
          </div>
        </StyledDebtContent>
      </Modal>
    </>
  );
};

export default DebtModal;
