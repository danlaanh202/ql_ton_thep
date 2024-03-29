import * as yup from "yup";
import _ from "lodash";
import FormInput from "@/components/form/FormInput";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";
import styled from "styled-components";
import Spinner from "@/components/loading/Spinner";
import StockRow from "@/components/form/StockRow";
import callApi from "@/utils/callApi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IPerson, IStock, IWare } from "@/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { easyReadMoney } from "@/utils/convert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useNotifications from "@/hooks/useNotifications";
import _helper from "@/utils/_helper";
const StyledFormContainer = styled.form`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  .row-container {
    display: flex;
    gap: 40px;
    margin: 0 8px 12px;
    align-items: center;
  }
  .total {
    font-size: 20px;
    font-weight: 600;
  }
  .icon-container {
    justify-content: center;
    font-size: 20px;
    .add-btn {
      border: none;
      background: #1f28af;
      padding: 8px 20px;
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
  .hoadon-title {
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0;
  }
  .submit-btn {
    margin-top: 40px;
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
const schema = yup.object({
  so_tien_tra: yup.number().required(),
  ghi_chu: yup.string(),
  dia_chi: yup.string().required(),
});

export interface IStocksState {
  hang_hoa: IWare | {};
  don_gia: number;
  so_luong: number;
}

const NhapHoaDon = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<IStocksState[] | {}[]>([]);
  const [defaultNumber, setDefaultNumber] = useState(3);
  const [buyDate, setBuyDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchPeople, setSearchPeople] = useState<IPerson[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<IPerson>();
  const [showMsg, contextHolder] = useNotifications();

  const onSubmitHandler = async (data: any) => {
    let filterStocks = _helper.removeUndefinedFromInvoices(stocks);
    if (
      !isValid ||
      isLoading ||
      _helper.isDuplicateFromInvoices(filterStocks) ||
      filterStocks.length === 0
    ) {
      showMsg("Có lỗi xảy ra", "error");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      if (selectedPerson?.ten_khach_hang !== searchQuery) {
        await callApi.createPerson(data, searchQuery).then(
          async (response) =>
            await callApi
              .createInvoice(
                { ...data, stocks: filterStocks, buyDate, totalPrice },
                response.data._id
              )
              .then((res) => {
                showMsg("Tạo hoá đơn thành công", "success");
                setIsLoading(false);
                router.push("/danh_sach_hoa_don?_page=1");
              })
        );
      } else {
        // console.log("đã tồn tại");
        await callApi
          .createInvoice(
            { ...data, stocks: filterStocks, buyDate, totalPrice },
            selectedPerson._id
          )
          .then((res) => {
            showMsg("Tạo hoá đơn thành công", "success");
            setIsLoading(false);
            router.push("/danh_sach_hoa_don?_page=1");
          });
      }
    } catch (error) {
      showMsg("Có lỗi khi tạo hoá đơn", "error");
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTotalPrice(
      (stocks as IStocksState[]).reduce(
        (prev: number, curr: IStocksState) =>
          (curr.hang_hoa as IWare)._id
            ? prev + (curr.don_gia * curr.so_luong || 0)
            : prev,
        0
      )
    );
  }, [stocks]);
  useEffect(() => {
    if (searchQuery !== "")
      callApi
        .getPeopleWithSearchQuery(searchQuery, 1)
        .then((res) => setSearchPeople(res.data.docs));
    if (searchQuery !== selectedPerson?.ten_khach_hang) {
      setSelectedPerson({} as IPerson);
    }
  }, [searchQuery]);
  useEffect(() => {
    if (searchQuery === selectedPerson?.ten_khach_hang) {
      setValue("so_dien_thoai", selectedPerson.so_dien_thoai);
      setValue("dia_chi", selectedPerson.dia_chi);
    }
  }, [selectedPerson, searchQuery]);

  return (
    <>
      {contextHolder}
      <MainLayout>
        <Head>
          <title>Nhập hoá đơn</title>
        </Head>
        <StyledFormContainer
          onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
        >
          <div className="hoadon-title">Thông tin người mua hàng</div>
          <div className="row-container">
            <FormInput
              control={control}
              labelString="Tên khách hàng"
              inputId="ten_khach_hang"
              withSearch={true}
              outerVal={searchQuery}
              setOuterVal={setSearchQuery}
              setSelectVal={setSelectedPerson}
              dropdownData={searchPeople}
            />
            <FormInput
              control={control}
              labelString="Số điện thoại"
              inputId="so_dien_thoai"
              disabled={searchQuery === selectedPerson?.ten_khach_hang}
              disabledVal={selectedPerson?.so_dien_thoai}
            />
            <FormInput
              control={control}
              labelString="Địa chỉ"
              inputId="dia_chi"
              disabled={searchQuery === selectedPerson?.ten_khach_hang}
              disabledVal={selectedPerson?.dia_chi}
            />
          </div>
          <div className="hoadon-title">Hoá đơn bán hàng</div>
          {new Array(defaultNumber).fill(0).map((item, index) => (
            <StockRow
              key={index}
              setStocks={setStocks}
              stocks={stocks}
              index={index}
            />
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

          <div className="row-container total">
            Tổng tiền hoá đơn: {easyReadMoney(totalPrice)} -{" "}
            {_helper.docTien.doc(totalPrice)}
          </div>
          <div className="row-container">
            <FormInput
              control={control}
              labelString="Số tiền khách trả"
              inputId="so_tien_tra"
              placeholder="Ví dụ: 60000"
              error={!!errors.so_tien_tra}
            />
            <FormInput
              control={control}
              labelString="Ngày mua"
              type="date"
              inputId="ngay_mua"
              setOuterDate={setBuyDate}
              outerDate={buyDate}
            />
          </div>
          <div className="row-container">
            <FormInput
              control={control}
              labelString="Ghi chú"
              inputId="ghi_chu"
              type="textarea"
            />
          </div>
          <button type="submit" className="submit-btn">
            {!isLoading ? (
              <>Lưu hoá đơn</>
            ) : (
              <>
                <Spinner />
              </>
            )}
          </button>
        </StyledFormContainer>
      </MainLayout>
    </>
  );
};

export default NhapHoaDon;
