import useDebounce from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IStock, IWare } from "@/types";
import callApi from "@/utils/callApi";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  .form-label {
    padding-bottom: 10px;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    ::before {
      content: "*";
      color: #e5285d;
      margin-right: 4px;
    }
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
    :disabled {
      cursor: not-allowed;
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
    overflow: auto;
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
const InputWithSearch = ({
  title,
  _id,
  _type = "name",
  _index = 0,
  func,
}: {
  title: string;
  _id: string;
  _type: "name" | "amount";
  _index: number;
  func: any;
}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setShowDropdown(false));
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItem, setDropdownItem] = useState<IWare[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery, 200);
  const [selectedItem, setSelectedItem] = useState<IWare | {}>({});
  const [amount, setAmount] = useState("");
  useEffect(() => {
    if (searchQueryDebounce !== "") {
      callApi
        .searchWare(searchQueryDebounce, 1)
        .then((res) => setDropdownItem(res.data.docs));
    }
  }, [searchQueryDebounce]);
  useEffect(() => {
    func(selectedItem, _index);
  }, [selectedItem]);
  useEffect(() => {
    func(parseInt(amount), _index);
  }, [amount]);
  return (
    <StyledInputContainer ref={ref}>
      <label className="form-label" htmlFor={_id}>
        {title}
      </label>
      <input
        onFocus={() => setShowDropdown(true)}
        type="text"
        className="form-input"
        id={_id}
        value={_type === "name" ? searchQuery : amount}
        onChange={(e) => {
          if (_type === "name") {
            setSearchQuery(e.target.value);
            if ((selectedItem as IWare)?._id) {
              setSelectedItem({});
            }
          } else if (_type === "amount") {
            setAmount(e.target.value);
          }
        }}
      />
      {_type === "name" && showDropdown && (
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
    </StyledInputContainer>
  );
};

export default InputWithSearch;
