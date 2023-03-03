import useDebounce from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IWare } from "@/types";
import callApi from "@/utils/callApi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  .form-label {
    padding-bottom: 10px;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 600;
  }
  .form-input {
    background: white;
    border: none;
    outline: none;
    border: 1px solid #dbdbdb;
    color: black;
    padding: 12px;
    border-radius: 4px;
    ::placeholder {
      color: #d2c9cc;
    }
    :focus {
      border-color: #4096ff;
    }
  }
  .dropdown {
    position: absolute;
    left: 0;
    right: 0;
    min-height: 200px;
    background: white;
    top: 100%;
    border-radius: 4px;
    max-height: 320px;
    z-index: 10;
    border: 1px solid #dbdbdb;
    &-item {
      padding: 12px;
      cursor: pointer;
      :hover {
        background: #f4f4f4;
      }
      &-name {
        font-size: 15px;
        margin-bottom: 4px;
      }
      &-amount {
        font-size: 12px;
      }
    }
  }
`;
const FormInputNoControl = ({
  labelString,
  _type = "name",
  placeholder = "",
  handleInput = () => {},
  withDropdown = false,
  _index,
}: {
  labelString: string;
  placeholder?: string;
  handleInput?: any;
  withDropdown?: boolean;
  _type?: "name" | "amount" | "price";
  _index: number;
}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setShowDropdown(false);
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItem, setDropdownItem] = useState<IWare[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery, 200);
  const [selectedItem, setSelectedItem] = useState<IWare | {}>({});
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (withDropdown) {
      callApi.searchWare(searchQueryDebounce, 1, 5).then((res) => {
        setDropdownItem(res.data.docs);
      });
    }
  }, [searchQueryDebounce]);
  useEffect(() => {
    handleInput(selectedItem, _index);
  }, [selectedItem]);
  useEffect(() => {
    if (amount !== "") {
      handleInput(parseInt(amount), _index);
    }
  }, [amount]);
  useEffect(() => {
    handleInput(parseInt(price), _index);
  }, [price]);
  return (
    <StyledFormInput ref={ref}>
      <label className="form-label">{labelString}</label>

      <input
        onChange={(e) => {
          if (_type === "name") {
            setSearchQuery(e.target.value);
            if ((selectedItem as IWare)?._id) {
              setSelectedItem({});
            }
          } else if (_type === "amount") {
            setAmount(e.target.value);
          } else if (_type === "price") {
            setPrice(e.target.value);
          }
        }}
        value={
          _type === "name" ? searchQuery : _type === "amount" ? amount : price
        }
        className="form-input"
        type="text"
        placeholder={placeholder}
        onFocus={() => setShowDropdown(true)}
      />

      {withDropdown && showDropdown && (
        <div className="dropdown">
          {dropdownItem?.length > 0 &&
            dropdownItem.map((item, index) => (
              <div
                className="dropdown-item"
                key={item._id}
                onClick={() => {
                  setSelectedItem(item);
                  setSearchQuery(item.ten_hang_hoa);
                  setShowDropdown(false);
                }}
              >
                <div className="dropdown-item-name">{item.ten_hang_hoa}</div>
                <div className="dropdown-item-amount">
                  Số lượng: {item.so_luong_trong_kho}
                </div>
              </div>
            ))}
          {dropdownItem.length <= 0 && (
            <div
              style={{
                marginTop: "20px",
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Không có dữ liệu
            </div>
          )}
        </div>
      )}
    </StyledFormInput>
  );
};

export default FormInputNoControl;
