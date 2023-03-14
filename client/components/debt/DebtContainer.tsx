import useDebounce from "@/hooks/useDebounce";
import useNotifications from "@/hooks/useNotifications";
import { IPerson } from "@/types";
import callApi from "@/utils/callApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DebtCard from "./DebtCard";
import DebtModal from "./DebtModal";

const StyledDebt = styled.div`
  .input-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto 20px;
    position: relative;
    input {
      width: 100%;
      padding: 12px 16px;
      border: none;
      outline: none;
      ::placeholder {
        color: #827e7f;
      }
      :focus {
        border-color: #4096ff;
      }
      :disabled {
        cursor: not-allowed;
      }
    }
    .spinner {
      width: 20px;
      height: 20px;
    }
  }
  .card-container {
    width: 100%;
    padding: 18px;
    max-width: 860px;
    margin: 20px auto;
  }
`;
const DebtContainer = () => {
  const [pName, setPName] = useState("");
  const pNameDebounce = useDebounce(pName);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IPerson[]>([]);
  const [selected, setSelected] = useState<IPerson>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showMsg, contextHolder] = useNotifications();

  const openM = (_index: number) => {
    setSelected(data[_index]);
    setSelectedIndex(_index);
    setOpenModal(true);
  };
  const updateData = (_money: number) => {
    setData((prev) => {
      let prevArr = [...prev];
      prev[selectedIndex].so_tien_no =
        Number(prev[selectedIndex].so_tien_no) - _money;
      return prevArr;
    });
  };
  useEffect(() => {
    callApi.getPeopleWithSearchQuery(pNameDebounce, 1).then((res) => {
      // console.log(res.data);
      setLoading(false);
      setData(res.data.docs);
    });
  }, [pNameDebounce]);
  return (
    <>
      {contextHolder}
      <StyledDebt>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nhập vào tên khách hàng"
            value={pName}
            onChange={(e) => {
              setLoading(true);
              setPName(e.target.value);
            }}
          />
          {loading && <div className="spinner"></div>}
        </div>
        <div className="card-container">
          {data?.length > 0 &&
            data.map((item, index) => {
              return (
                <DebtCard
                  key={item._id}
                  handleOpenModal={() => {
                    openM(index);
                  }}
                  _data={item}
                />
              );
            })}
        </div>
        {openModal && selected && (
          <DebtModal
            open={openModal}
            setOpen={setOpenModal}
            _data={selected}
            showMsg={showMsg}
            updateData={updateData}
          />
        )}
      </StyledDebt>
    </>
  );
};

export default DebtContainer;
