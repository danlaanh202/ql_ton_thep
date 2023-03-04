import PersonTable from "@/components/table/PersonTable";
import useDebounce from "@/hooks/useDebounce";
import MainLayout from "@/layout/MainLayout";
import { IPerson } from "@/types";
import callApi from "@/utils/callApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
const StyledSearchContainer = styled.div`
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
  .table-container {
  }
`;
const index = () => {
  const [personName, setPersonName] = useState("");
  const personNameDebounce = useDebounce(personName, 500);
  const [data, setData] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalDocs, setTotalDocs] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (personNameDebounce !== "") {
      callApi
        .getPeopleWithSearchQuery(
          personNameDebounce,
          parseInt(router.query._page as string) || 1
        )
        .then((res) => {
          setTotalDocs(res.data.totalDocs);
          setData(res.data.docs);
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [personNameDebounce, router.query._page]);
  return (
    <MainLayout>
      <title>Tìm kiếm khách hàng</title>
      <StyledSearchContainer>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nhập vào tên khách hàng"
            value={personName}
            onChange={(e) => {
              router.push("/tim_kiem_khach_hang?_page=1", undefined, {
                shallow: true,
              });
              setLoading(true);
              setPersonName(e.target.value);
            }}
          />
          {loading && <div className="spinner"></div>}
        </div>
        <div className="table-container">
          <PersonTable total={totalDocs} data={data} setData={setData} />
        </div>
      </StyledSearchContainer>
    </MainLayout>
  );
};

export default index;
