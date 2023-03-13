import { IInvoiceVar } from "@/types";
import { publicRequest } from "@/utils/callApi";
import { easyReadMoney } from "@/utils/convert";
import axios from "axios";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import styled from "styled-components";

const StyledHoaDon = styled.div`
  min-height: 100vh;
  background: white;
  width: 100%;
  max-width: 560px;
  margin: auto;
  padding: 20px;

  * {
    color: red;
  }
  .tb {
  }
  .top-table-container {
    .top-table {
      width: 100%;
      &-row {
        display: flex;

        .top-table-logo {
        }
        .top-table-description {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
  .title {
    text-align: center;
    margin: 20px 0;
  }
  .information {
    margin-bottom: 20px;
    &-item {
      margin: 2px 0;
      color: #262626;
      label {
        color: #262626;
      }
      span {
        margin-left: 4px;
        color: #262626;
      }
    }
  }
  .stock-table-container {
    table,
    th,
    td {
      border: 1px solid red;
      border-collapse: collapse;
    }
    .stock-table {
      width: 100%;
      &-row {
        height: 24px;
        td {
          font-size: 12px;
          text-align: center;
          color: #262626;
        }
        .name-col {
          width: 200px;
          max-width: 210px;
          padding: 2px;
          text-align: left;
        }
        .amount-col {
          width: 65px;
        }
      }
    }
  }
`;
const HoaDon = ({ data }: { data?: IInvoiceVar }) => {
  console.log(data);
  return (
    <StyledHoaDon>
      <div className="top-table-container tb">
        <table className="top-table">
          <tbody>
            <tr className="top-table-row">
              <td className="top-table-logo">Cửa hàng Kiên Phước</td>
              <td className="top-table-description">
                Chuyên kinh doanh các mặt hàng sắt thép
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="title">HOÁ ĐƠN BÁN HÀNG</div>
      <div className="information">
        <div className="information-item">
          <label htmlFor="">Họ tên khách hàng:</label>
          <span>{data?.khach_hang.ten_khach_hang}</span>
        </div>
        <div className="information-item">
          <label htmlFor="">Địa chỉ:</label>
          <span>{data?.khach_hang.dia_chi}</span>
        </div>
        <div className="information-item">
          <label htmlFor="">Ngày mua:</label>
          <span>
            {format(new Date(data?.ngay_mua as string), "dd/MM/yyyy")}
          </span>
        </div>
      </div>
      <div className="stock-table-container tb">
        <table className="stock-table">
          <tbody>
            <tr className="stock-table-row">
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>

            {(data?.hang_hoa?.length as number) > 0 &&
              data?.hang_hoa?.map((item, index) => {
                return (
                  <tr className="stock-table-row">
                    <td>1</td>
                    <td className="name-col">{item.hang_hoa.ten_hang_hoa}</td>
                    <td className="amount-col">{item.so_luong}</td>
                    <td>{easyReadMoney(item.don_gia)}</td>
                    <td>{easyReadMoney(item.don_gia * item.so_luong)}</td>
                  </tr>
                );
              })}
            <tr className="last-row">
              <td colSpan={3} style={{ textAlign: "right", padding: "8px" }}>
                Tổng hoá đơn
              </td>
              <td colSpan={2} style={{ padding: "8px" }}>
                {easyReadMoney(data?.tong_tien as number)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </StyledHoaDon>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const doc = await publicRequest
    .get("/invoice/get_by_id", {
      params: {
        _id: context.params?.idHoaDon,
      },
    })
    .then((res) => res.data);
  return {
    props: {
      data: doc,
    },
  };
};

export default HoaDon;
