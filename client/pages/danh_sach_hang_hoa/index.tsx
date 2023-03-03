import WareTable from "@/components/table/wareTable";
import useDebounce from "@/hooks/useDebounce";
import MainLayout from "@/layout/MainLayout";
import { IWare } from "@/types";
import callApi from "@/utils/callApi";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery, 500);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IWare[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    callApi
      .searchWare(
        searchQueryDebounce,
        parseInt(router.query._page as string) || 1
      )
      .then((res) => {
        setData(res.data.docs);
        setLoading(false);
        setTotal(res.data.totalDocs);
      })
      .catch((err) => setLoading(false));
  }, [searchQueryDebounce, router.query._page]);
  return (
    <MainLayout>
      <Head>
        <title>Danh sách hàng hoá</title>
      </Head>
      <StyledContainer>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nhập vào tên hàng hoá"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLoading(true);
              router.push("/danh_sach_hang_hoa?_page=1", undefined, {
                shallow: true,
              });
            }}
          />
          {loading && <div className="spinner"></div>}
        </div>
        <div className="table-container">
          <WareTable total={total} data={data} setData={setData} />
        </div>
      </StyledContainer>
    </MainLayout>
  );
};

export default index;
