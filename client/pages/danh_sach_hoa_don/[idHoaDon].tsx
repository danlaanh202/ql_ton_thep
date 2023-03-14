import { IInvoiceVar } from "@/types";
import { publicRequest } from "@/utils/callApi";
import { easyReadMoney } from "@/utils/convert";
import _helper from "@/utils/_helper";
import axios from "axios";
import { format } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

const StyledHoaDon = styled.div`
  min-height: 100vh;
  background: white;
  /* width: 100%; */
  width: 560px;
  margin: auto;
  padding: 20px;

  * {
    color: red;
  }
  .line {
    width: 60%;
    margin: 4px auto;
    height: 2px;
    background: red;
  }
  .tb {
  }
  .top-table-container {
    /* .top-table {
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
    } */
    .top-title {
      text-align: center;
      margin-bottom: 8px;
      font-size: 32px;
    }
    .top-content {
      font-size: 16px;
      text-align: center;
    }
  }
  .cua-hang__information {
    text-align: center;
  }
  .information {
    margin-bottom: 20px;
    &-item {
      margin: 2px 0;
      color: #262626;
      display: flex;
      label {
      }
      span {
        margin-left: 4px;
        color: #262626;
        /* font-weight: 600; */
        position: relative;

        flex: 1;
        ::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border-bottom: 1px dotted red;
        }
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
          width: 180px;
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
  .total-money {
    margin: 8px 0;
    display: flex;
    gap: 4px;
    span {
      position: relative;
      /* width: 100%; */
      flex: 1;
      color: #262626;
      font-weight: 500;
      ::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px dotted red;
      }
    }
  }
  .bottom-container {
    display: flex;

    .sign-left {
      text-align: center;
      flex: 1;
      padding-top: 16px;
    }
    .sign-right {
      .date {
        height: 16px;
        text-align: center;
      }
      .sign {
        text-align: center;
      }
      flex: 1;
    }
  }
`;
const HoaDon = ({ data }: { data?: IInvoiceVar }) => {
  return (
    <StyledHoaDon>
      <Head>
        <title>{`Hoá đơn của ${data?.khach_hang.ten_khach_hang}`}</title>
      </Head>
      <div className="top-table-container tb">
        <h1 className="top-title">Cửa hàng Kiên Phước</h1>
        <div className="top-content">
          Kinh Doanh: SƠN NƯỚC NỘI THẤT - NGOẠI THẤT
        </div>
        <div className="top-content">
          ỐNG - HỘP MẠ KẼM - NGÓI FUJI - TÔN ZẮC - TÔN LỢP CÁC LOẠI
        </div>
        <div className="top-content">
          LƯỚI B40 - NHỰA ĐẶC - NHỰA SÁNG - PHỤ KIỆN CƠ KHÍ CÁC LOẠI
        </div>
      </div>
      <div className="line"></div>
      <div className="cua-hang__information">
        Địa chỉ: Thôn Sâm Văn Hội - Trường Sơn - Đức Thọ - Hà Tĩnh
      </div>
      <div className="cua-hang__information" style={{ marginBottom: "20px" }}>
        Điện thoại: 0911.651.015 - 0972.851.015
      </div>
      <div className="information">
        <div className="information-item">
          <label htmlFor="">Họ tên khách hàng:</label>
          <span>{data?.khach_hang.ten_khach_hang}</span>
        </div>
        <div className="information-item">
          <label htmlFor="">Địa chỉ:</label>
          <span>{data?.khach_hang.dia_chi}</span>
        </div>
        {/* <div className="information-item">
          <label htmlFor="">Ngày mua:</label>
          <span>
            {format(new Date(data?.ngay_mua as string), "dd/MM/yyyy")}
          </span>
        </div> */}
      </div>
      <div className="stock-table-container tb">
        <table className="stock-table">
          <tbody>
            <tr className="stock-table-row">
              <th>STT</th>
              <th>TÊN HÀNG</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>

            {(data?.hang_hoa?.length as number) > 0 &&
              data?.hang_hoa?.map((item, index) => {
                return (
                  <tr key={item._id} className="stock-table-row">
                    <td>{index + 1}</td>
                    <td className="name-col">{item.hang_hoa.ten_hang_hoa}</td>
                    <td className="amount-col">{item.so_luong}</td>
                    <td>{easyReadMoney(item.don_gia)}</td>
                    <td>{easyReadMoney(item.don_gia * item.so_luong)}</td>
                  </tr>
                );
              })}
            {(data?.hang_hoa?.length as number) < 17 &&
              (data?.hang_hoa?.length as number) > 0 &&
              Array(17 - (data?.hang_hoa?.length as number))
                .fill(0)
                .map((item, index) => {
                  return (
                    <tr key={`abc ${index}`} className="stock-table-row">
                      <td>{(data?.hang_hoa?.length as number) + index + 1}</td>
                      <td className="name-col"></td>
                      <td className="amount-col"></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
            <tr className="last-row">
              <td colSpan={4} style={{ textAlign: "center", padding: "8px" }}>
                TỔNG CỘNG
              </td>
              <td colSpan={2} style={{ padding: "8px", textAlign: "center" }}>
                {easyReadMoney(data?.tong_tien as number)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="total-money">
          <div>Số tiền bằng chữ: </div>{" "}
          <span>{_helper.docTien.doc(data?.tong_tien as number)}</span>
        </div>
        <div className="bottom-container">
          <div className="sign-left">KHÁCH HÀNG</div>
          <div className="sign-right">
            <div className="date">
              {format(
                new Date(data?.created_at as string),
                "HH' giờ,' 'ngày 'dd ' tháng ' MM ' năm ' yyyy"
              )}
            </div>
            <div className="sign">NGƯỜI BÁN HÀNG</div>
          </div>
        </div>
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
