import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import SideBar from "./Sidebar";
import * as S from "./styles";

function AdminLayout() {
  const { isShowAdminSidebar, themeLight } = useSelector(
    (state) => state.common
  );
  return (
    <S.AdminWrapper>
      <SideBar />
      <S.AdminContainer
        $isShowAdminSidebar={isShowAdminSidebar}
        $themeLight={themeLight}
      >
        <Header />
        <S.AdminContent $themeLight={themeLight}>
          <Outlet />
        </S.AdminContent>
      </S.AdminContainer>
    </S.AdminWrapper>
  );
}
export default AdminLayout;
