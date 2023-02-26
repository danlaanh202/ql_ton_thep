import useDebounce from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IWare } from "@/types";
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
}: {
  title: string;
  _id: string;
  _type: "name" | "amount";
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowDropdown(false));
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery, 200);
  const [dropdownItem, setDropdownItem] = useState<IWare[]>([]);
  useEffect(() => {
    if (searchQueryDebounce !== "") {
      callApi
        .searchWare(searchQueryDebounce)
        .then((res) => setDropdownItem(res.data));
    }
  }, [searchQueryDebounce]);
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
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {_type === "name" && showDropdown && (
        <div className="dropdown">
          {dropdownItem?.length > 0 &&
            dropdownItem.map((item, index) => (
              <div className="dropdown-item" key={item._id}>
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
