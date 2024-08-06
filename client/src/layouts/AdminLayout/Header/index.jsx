import { useSelector, useDispatch } from "react-redux";

import { toggleAdminSidebar } from "../../../redux/slicers/common.slice";
import { setTheme } from "../../../redux/slicers/common.slice";
import * as S from "./styles";

import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { RiMenuUnfold2Fill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";

function Header() {
  const dispatch = useDispatch();
  const { isShowAdminSidebar, themeLight } = useSelector((state) => state.common);
  const toggleSidebar = () => {
    dispatch(toggleAdminSidebar(!isShowAdminSidebar));
  };
  const toggleThemeLight = () => {
    dispatch(setTheme(!themeLight));
  };
  return (
    <S.HeaderWrapper $themeLight={themeLight}>
      <S.ToggleSidebar onClick={toggleSidebar} $themeLight={themeLight}>
        {isShowAdminSidebar ? <RiMenuUnfold2Fill /> : <RiMenuUnfoldFill />}
      </S.ToggleSidebar>
      <S.DarkModeWrapper $themeLight={themeLight}>
        <S.DarkModeIcon onClick={toggleThemeLight} $themeLight={themeLight}>
          {themeLight ? <CiLight /> : <MdDarkMode />}
        </S.DarkModeIcon>
        <S.DarkModeContent $themeLight={themeLight}>
          {themeLight ? (
            <>
              <span>Light</span> <br />
              <span>Mode</span>
            </>
          ) : (
            <>
              <span>Dark</span> <br />
              <span>Mode</span>
            </>
          )}
        </S.DarkModeContent>
      </S.DarkModeWrapper>
    </S.HeaderWrapper>
  );
}

export default Header;
