import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { DownOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import styled from "styled-components";

const StyledCustomSelect = styled.div`
  position: relative;
  width: 100%;
  .select-list {
    width: 100%;
    border: 1px solid black;
    background: white;
    display: flex;
    align-items: center;
    position: relative;
    padding: 4px;
    .placeholder {
      cursor: pointer;
    }
    .icon {
      position: absolute;
      right: 4px;
    }
  }
  .dropdown-container {
    position: absolute;
    /* background: blue; */
    height: 40px;
    left: 0;
    right: 0;
    border: 1px solid black;
    z-index: 10;
    height: 144px;
    border-radius: 0 0 4px 4px;

    .dropdown-item {
      padding: 4px;
      background: white;
      z-index: 20;
      cursor: pointer;
      :hover {
        background: #ebebeb;
      }
    }
  }
`;
const CustomSelect = ({
  list,
  setNumber,
}: {
  list: string[];
  setNumber: (_index: number) => void;
}) => {
  const [data, setData] = useState("Tất cả");
  const [openDropdown, setOpenDropdown] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setOpenDropdown(false);
  });
  return (
    <StyledCustomSelect ref={ref}>
      <div
        className="select-list"
        onClick={() => {
          setOpenDropdown((prev) => !prev);
        }}
      >
        <span className="placeholder">{data}</span>
        <div className="icon">
          <DownOutlined />
        </div>
      </div>
      {openDropdown && (
        <div className="dropdown-container">
          {list?.length > 0 &&
            list.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setData(item);
                    setNumber(index);
                    setOpenDropdown(false);
                  }}
                  key={item}
                  className="dropdown-item"
                >
                  {item}
                </div>
              );
            })}
        </div>
      )}
    </StyledCustomSelect>
  );
};

export default CustomSelect;
