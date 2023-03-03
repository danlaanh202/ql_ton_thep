import {
  FileAddOutlined,
  FileSearchOutlined,
  HomeOutlined,
  ImportOutlined,
  MoneyCollectOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

const StyledMainLayout = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;
const StyledAsideContainer = styled.aside`
  width: 300px;
  border: 1px solid #dbdbdb;
  background: #f3f4f6;
  position: sticky;
  top: 0;
  left: 0;

  .list-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow-y: auto;
    padding: 16px 12px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    .list {
      margin-top: 0.5rem;
      .list-item {
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 8px;
        color: #374151;
        font-weight: 600;
        cursor: pointer;
        :hover {
          background: #ebeef1;
        }
        .icon {
          margin: 0 12px;
        }
        .content {
          margin-left: 12px;
          font-size: 16px;
        }
      }
      .active {
        background: #d1d5db;
        :hover {
          background: #d1d5db;
        }
      }
    }
  }
`;
const StyledMainContainer = styled.main`
  height: 100%;
  flex: 1;
  position: relative;
  overflow-y: auto;
`;
const StyledHeader = styled.div`
  width: 100%;
  height: 56px;
  background: #f3f4f6;
  display: flex;
  align-items: center;

  .header-content {
    font-weight: 600;
    font-size: 20px;
    margin-left: 20px;
  }
`;
const StyledMainContent = styled.div`
  padding: 16px 12px;
`;
const MainLayout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const [activeId, setActiveId] = useState(0);
  useEffect(() => {
    sidebarList.every((item, index) => {
      if (router.asPath.replace("?", "/").split("/")[1] === item.checkRoute) {
        setActiveId(index);
        return false;
      }
      return true;
    });
  }, [router.asPath]);
  return (
    <StyledMainLayout>
      <StyledAsideContainer aria-label="Side bar">
        <div className="list-container">
          <ul className="list">
            {sidebarList.map((item, index) => (
              <Link key={item.href} href={item.href}>
                <li
                  key={item.href}
                  className={`list-item ${activeId === index && "active"}`}
                >
                  <div className="icon">{item.icon}</div>
                  <span className="content">{item.title}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </StyledAsideContainer>
      <StyledMainContainer>
        <StyledHeader>
          <div className="header-content">{sidebarList[activeId].title}</div>
        </StyledHeader>
        <StyledMainContent>{children}</StyledMainContent>
      </StyledMainContainer>
    </StyledMainLayout>
  );
};
const sidebarList = [
  {
    title: "Trang chủ",
    icon: <HomeOutlined />,
    href: "/",
    checkRoute: "",
  },
  {
    title: "Nhập hoá đơn",
    icon: <FileAddOutlined />,
    href: "/nhap_hoa_don",
    checkRoute: "nhap_hoa_don",
  },
  {
    title: "Danh sách hoá đơn",
    icon: <UnorderedListOutlined />,
    href: "/danh_sach_hoa_don?_page=1",
    checkRoute: "danh_sach_hoa_don",
  },
  {
    title: "Danh sách khách hàng",
    icon: <UnorderedListOutlined />,
    href: "/danh_sach_khach_hang?_page=1",
    checkRoute: "danh_sach_khach_hang",
  },
  {
    title: "Tìm kiếm hoá đơn",
    icon: <FileSearchOutlined />,
    href: "/tim_kiem_hoa_don",
    checkRoute: "tim_kiem_hoa_don",
  },
  {
    title: "Tìm kiếm khách hàng",
    icon: <SearchOutlined />,
    href: "/tim_kiem_khach_hang",
    checkRoute: "tim_kiem_khach_hang",
  },
  {
    title: "Trả nợ",
    icon: <MoneyCollectOutlined />,
    href: "/tra_no",
    checkRoute: "tra_no",
  },
  {
    title: "Nhập hàng hoá",
    href: "/nhap_hang_hoa?type=unset",
    icon: <ImportOutlined />,
    checkRoute: "nhap_hang_hoa",
  },
  {
    title: "Danh sách hàng hoá",
    href: "/danh_sach_hang_hoa?_page=1",
    icon: <UnorderedListOutlined />,
    checkRoute: "danh_sach_hang_hoa",
  },
];
export default MainLayout;
