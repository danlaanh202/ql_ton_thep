import * as yup from "yup";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormRadio from "./radio/FormRadio";
import { useState } from "react";
import callApi from "@/utils/callApi";
const schema = yup.object({});
const StyledForm = styled.form`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  .row-container {
    display: flex;
    gap: 40px;
    margin: 0 8px 12px;
    align-items: center;
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
const WareForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [wareType, setWareType] = useState<string>("Ống");
  const onSubmitHandler = async (data: any) => {
    console.log({ ...data, wareType });
    try {
      await callApi.createWare({ ...data, loai_hang: wareType }).then((res) => {
        console.log(res.data);
        reset();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledForm
      onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
    >
      <div className="row-container">
        <FormInput
          control={control}
          labelString="Tên hàng hoá"
          inputId="ten_hang_hoa"
        />
        <FormInput control={control} labelString="Giá bán" inputId="gia_ban" />

        <FormInput
          control={control}
          labelString="Giá nhập"
          inputId="gia_nhap"
        />
      </div>
      <div className="row-container">
        <FormInput
          control={control}
          labelString="Số lượng"
          inputId="so_luong"
        />
        <div style={{ flex: 2 }}>
          <FormRadio
            labelString="Loại hàng"
            options={[]}
            checkedValue={wareType}
            setCheckedValue={setWareType}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Hoàn tất
      </button>
    </StyledForm>
  );
};

export default WareForm;
