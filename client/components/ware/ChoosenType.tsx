import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
const StyledWareContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  height: calc(100vh - 100px);
  .card {
    padding: 20px;
    font-weight: 600;
    border: 1px solid #ccc;
    min-width: 200px;
    text-align: center;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    :hover {
      background: #f5f4f4;
    }
  }
`;
const ChoosenType = () => {
  const router = useRouter();

  return (
    <StyledWareContainer>
      <div
        className="card"
        onClick={() => router.push("/nhap_hang_hoa?type=old")}
      >
        Nhập thêm số lượng
      </div>
      <div
        className="card"
        onClick={() => router.push("/nhap_hang_hoa?type=new")}
      >
        Nhập hàng mới
      </div>
    </StyledWareContainer>
  );
};

export default ChoosenType;
