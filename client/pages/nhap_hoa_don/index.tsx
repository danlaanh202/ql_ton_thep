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

const index = () => {
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
    setIsLoading(true);
    let filterStocks = _helper.removeUndefinedFromInvoices(stocks);
    if (
      !isValid ||
      isLoading ||
      _helper.isDuplicateFromInvoices(filterStocks) ||
      filterStocks.length === 0
    ) {
      showMsg("C?? l???i x???y ra", "error");
      setIsLoading(false);
      return;
    }

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
                showMsg("T???o ho?? ????n th??nh c??ng", "success");
                setIsLoading(false);
                router.push("/danh_sach_hoa_don?_page=1");
              })
        );
      } else {
        // console.log("???? t???n t???i");
        await callApi
          .createInvoice(
            { ...data, stocks: filterStocks, buyDate, totalPrice },
            selectedPerson._id
          )
          .then((res) => {
            showMsg("T???o ho?? ????n th??nh c??ng", "success");
            setIsLoading(false);
            router.push("/danh_sach_hoa_don?_page=1");
          });
      }
    } catch (error) {
      showMsg("C?? l???i khi t???o ho?? ????n", "error");
      console.log(error);
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
          <title>Nh???p ho?? ????n</title>
        </Head>
        <StyledFormContainer
          onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
        >
          <div className="hoadon-title">Th??ng tin ng?????i mua h??ng</div>
          <div className="row-container">
            <FormInput
              control={control}
              labelString="T??n kh??ch h??ng"
              inputId="ten_khach_hang"
              withSearch={true}
              outerVal={searchQuery}
              setOuterVal={setSearchQuery}
              setSelectVal={setSelectedPerson}
              dropdownData={searchPeople}
            />
            <FormInput
              control={control}
              labelString="S??? ??i???n tho???i"
              inputId="so_dien_thoai"
              disabled={searchQuery === selectedPerson?.ten_khach_hang}
              disabledVal={selectedPerson?.so_dien_thoai}
            />
            <FormInput
              control={control}
              labelString="?????a ch???"
              inputId="dia_chi"
              disabled={searchQuery === selectedPerson?.ten_khach_hang}
              disabledVal={selectedPerson?.dia_chi}
            />
          </div>
          <div className="hoadon-title">Ho?? ????n b??n h??ng</div>
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
              <PlusCircleOutlined /> Th??m h??ng ho??
            </button>
          </div>

          <div className="row-container total">
            T???ng ti???n ho?? ????n: {easyReadMoney(totalPrice)}
          </div>
          <div className="row-container">
            <FormInput
              control={control}
              labelString="S??? ti???n kh??ch tr???"
              inputId="so_tien_tra"
              placeholder="V?? d???: 60000"
              error={!!errors.so_tien_tra}
            />
            <FormInput
              control={control}
              labelString="Ng??y mua"
              type="date"
              inputId="ngay_mua"
              setOuterDate={setBuyDate}
              outerDate={buyDate}
            />
          </div>
          <div className="row-container">
            <FormInput
              control={control}
              labelString="Ghi ch??"
              inputId="ghi_chu"
              type="textarea"
            />
          </div>
          <button type="submit" className="submit-btn">
            {!isLoading ? (
              <>L??u ho?? ????n</>
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

export default index;
