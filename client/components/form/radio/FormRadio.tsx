import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import RadioItem from "./RadioItem";

const StyledFormRadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .form-label {
    padding-bottom: 10px;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 600;
    ::before {
      content: "*";
      color: #e5285d;
      margin-right: 4px;
    }
  }
  .radio-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
const FormRadio = ({
  labelString,
  options,
  checkedValue,
  setCheckedValue,
}: {
  labelString: string;
  options: string[];
  checkedValue: string;
  setCheckedValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <StyledFormRadioContainer>
      <label className="form-label">{labelString}</label>
      <div className="radio-container">
        {categoryList.map((item, index) => (
          <RadioItem
            _id={item.id}
            _value={item.value}
            _name="loai_hang"
            checkedValue={checkedValue}
            setCheckedValue={setCheckedValue}
          />
        ))}
      </div>
    </StyledFormRadioContainer>
  );
};
const categoryList = [
  {
    id: "ong",
    value: "Ống",
  },
  {
    id: "hop",
    value: "Hộp",
  },
  {
    id: "ton",
    value: "Tôn",
  },
  {
    id: "luoi",
    value: "Lưới",
  },
  {
    id: "khac",
    value: "Khác",
  },
];
export default FormRadio;
