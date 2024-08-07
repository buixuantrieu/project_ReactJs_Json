import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import * as S from "./styles";

function UserLayout() {
  return (
    <S.UserLayoutWrapper>
      <Header />
      <S.UserLayoutContent>
        <Outlet />
      </S.UserLayoutContent>
      <Footer />
    </S.UserLayoutWrapper>
  );
}
export default UserLayout;
