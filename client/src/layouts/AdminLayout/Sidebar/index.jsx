import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { SIDE_BAR_ITEM } from "./constants";

import * as S from "./styles";

function SideBar() {
  const { pathname } = useLocation();
  const { isShowAdminSidebar, themeLight } = useSelector(
    (state) => state.common
  );
  const renderSideBar = SIDE_BAR_ITEM.map((item, index) => {
    return (
      <S.SideBarElement
        key={index}
        to={item.path}
        $active={item.path === pathname}
        $themeLight={themeLight}
      >
        {item.icon}
        {item.name}
      </S.SideBarElement>
    );
  });
  return (
    <S.SideBarWrapper
      $isShowAdminSidebar={isShowAdminSidebar}
      $themeLight={themeLight}
    >
      <S.SideBarLogo>
        <S.SideBarBg $themeLight={themeLight} />
      </S.SideBarLogo>
      {renderSideBar}
    </S.SideBarWrapper>
  );
}

export default SideBar;
