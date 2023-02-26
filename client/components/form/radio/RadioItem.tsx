import { CheckOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const StyledRadioItem = styled.div`
  display: flex;
  align-items: center;

  input {
    display: none;
  }
  label {
    cursor: pointer;
    font-size: 16px;
  }
  .custom-radio {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    svg {
      font-size: 12px;
      fill: white;
    }
  }
  .active {
    background: #27dfd1;
  }
`;
const RadioItem = ({
  _name,
  _value,
  _id,
  checkedValue,
  setCheckedValue,
}: {
  _name: string;
  _value: string;
  _id: string;
  checkedValue: string;
  setCheckedValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <StyledRadioItem>
      <label
        htmlFor={_id}
        className={`custom-radio ${checkedValue === _value ? "active" : ""}`}
      >
        {checkedValue === _value && <CheckOutlined />}
      </label>
      <input
        type="radio"
        id={_id}
        name={_name}
        value={_value}
        onChange={(e) => setCheckedValue(e.target.value)}
        checked={checkedValue === _value}
      />
      <label htmlFor={_id}>{_value}</label>
    </StyledRadioItem>
  );
};

export default RadioItem;
