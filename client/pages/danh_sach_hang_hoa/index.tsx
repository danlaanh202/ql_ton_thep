import MainLayout from "@/layout/MainLayout";
import Head from "next/head";
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
            // value={personName}
            // onChange={(e) => {
            //   setPersonName(e.target.value);
            //   setLoading(true);
            // }}
          />
          {/* {loading && <div className="spinner"></div>} */}
        </div>
        <div className="table-container">
          {/* <InvoiceListTable data={data} setData={setData} /> */}
        </div>
      </StyledContainer>
    </MainLayout>
  );
};

export default index;
