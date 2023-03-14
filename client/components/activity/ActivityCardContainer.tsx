import useDebounce from "@/hooks/useDebounce";
import { IActivity } from "@/types";
import callApi from "@/utils/callApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CustomSelect from "../form/CustomSelect";
const StyledContainer = styled.div`
  .filter-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .input-container {
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
    .select-container {
      align-self: flex-end;
      display: flex;
      align-items: center;
      gap: 4px;
      span {
        /* color: #827e7f; */
      }
      &-item {
        width: 120px;
      }
    }
  }
`;
const StyledCardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  a {
    color: red;
  }
`;
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  border: 1px solid #6e6e6e;
  .card-header {
    padding: 4px;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    &-title {
      color: #262626;
      flex: 1;
    }
    &-date {
      font-size: 12px;
    }
  }
  .card-content {
    padding: 4px;
  }
`;
const ActivityCardContainer = () => {
  const [data, setData] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery, 200);
  const [listIndex, setListIndex] = useState(0);

  useEffect(() => {
    callApi
      .getActivitiesWithFilter(1, 10, typeList[listIndex], searchQueryDebounce)
      .then((res) => {
        setData(res.data.docs);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => setLoading(false));
  }, [listIndex, searchQueryDebounce]);

  return (
    <StyledContainer>
      <div className="filter-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Nhập vào từ khoá"
            value={searchQuery}
            onChange={(e) => {
              setLoading(true);
              setSearchQuery(e.target.value);
            }}
          />
          {loading && <div className="spinner"></div>}
        </div>
        <div className="select-container">
          <span>Bộ lọc: </span>
          <div className="select-container-item">
            <CustomSelect
              list={typeShow}
              setNumber={(_index: number) => {
                setListIndex(_index);
              }}
            />
          </div>
        </div>
      </div>
      <StyledCardContainer>
        {data?.length > 0 &&
          data.map((item, index) => {
            return <ActivityCard key={item._id} data={item} />;
          })}
      </StyledCardContainer>
    </StyledContainer>
  );
};

export default ActivityCardContainer;

const ActivityCard = ({ data }: { data: IActivity }) => {
  return (
    <StyledCard>
      <div className="card-header">
        <div
          className="card-header-title"
          style={
            data._type === "_delete"
              ? { color: "red", fontWeight: 500 }
              : { fontWeight: 500 }
          }
        >
          {headerList[`${data._type}`]}
        </div>
        <div className="card-header-date">
          {format(new Date(data.created_at as string), "HH 'giờ' dd/MM/yyyy")}
        </div>
      </div>
      <div
        className="card-content"
        dangerouslySetInnerHTML={{ __html: data._content }}
      ></div>
    </StyledCard>
  );
};

const typeList = ["", "_create", "_edit", "_import", "_delete", "_debt"];
const headerList = {
  _create: "Tạo hoá đơn",
  _edit: "Sửa",
  _import: "Nhập hàng",
  _delete: "Xoá",
  _debt: "Trả nợ",
};
const typeShow = ["Tất Cả", "Bán", "Sửa", "Nhập hàng", "Xoá", "Trả nợ"];
