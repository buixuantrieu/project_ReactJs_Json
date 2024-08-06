/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Space, notification } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { PROFILE_MENU } from "./constants";
import { FaCamera } from "react-icons/fa";
import { convertImageToBase64 } from "../../ultils/file";
import { changeAvatarRequest } from "../../redux/slicers/auth.slice";

import * as S from "./styles";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!userInfo.data.id) {
      navigate(ROUTES.USER.HOME);
    }
  }, [userInfo.data.id]);

  const profileLabel = useMemo(() => {
    return PROFILE_MENU.find((item) => item.path === pathname)?.label;
  }, [pathname]);
  const renderElementSidebar = useMemo(
    () =>
      PROFILE_MENU.map((item, index) => {
        return (
          <S.SidebarElement key={index} to={item.path} $active={item.path === pathname}>
            {item.label}
          </S.SidebarElement>
        );
      }),
    [PROFILE_MENU, pathname]
  );

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      return notification.error({ message: "File không đúng định dạng" });
    }
    const imgBase64 = await convertImageToBase64(file);
    await dispatch(
      changeAvatarRequest({
        id: userInfo.data.id,
        data: {
          avatar: imgBase64,
        },
      })
    );
  };
  return (
    <S.ProfileWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <span>Home</span>
                </Space>
              </Link>
            ),
          },
          {
            title: (
              <Link to={ROUTES.USER.PROFILE}>
                <span>Profile</span>
              </Link>
            ),
          },
          {
            title: profileLabel,
          },
        ]}
        style={{ marginBottom: 8 }}
      />

      <S.ProfileContainer>
        <S.SidebarWrapper>
          <S.AvatarWrapper>
            {userInfo.data.avatar !== null ? (
              <S.AvatarContainer style={{ backgroundImage: `url(${userInfo.data.avatar})` }}>
                <input
                  type="file"
                  id="update-avatar"
                  hidden
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => handleUpdateAvatar(e)}
                />
                <S.IconUpdateAvatar htmlFor="update-avatar">
                  <FaCamera />
                </S.IconUpdateAvatar>
              </S.AvatarContainer>
            ) : (
              <S.AvatarContainer style={{ background: "#ffd486" }}>
                <input
                  type="file"
                  id="update-avatar"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={(e) => handleUpdateAvatar(e)}
                />
                {userInfo.data.email.substring(0, 1).toUpperCase()}
                <S.IconUpdateAvatar htmlFor="update-avatar">
                  <FaCamera />
                </S.IconUpdateAvatar>
              </S.AvatarContainer>
            )}
          </S.AvatarWrapper>
          <S.UserName>{userInfo.data.fullName}</S.UserName>
          <S.EmailSidebar>{userInfo.data.email}</S.EmailSidebar>
          {renderElementSidebar}
        </S.SidebarWrapper>
        <S.ContentWrapper>
          <Outlet />
        </S.ContentWrapper>
      </S.ProfileContainer>
    </S.ProfileWrapper>
  );
}

export default Profile;
