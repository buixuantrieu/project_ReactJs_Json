import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const SideBarWrapper = styled.div`
  position: fixed;
  width: 250px;
  background-color: ${(props) => (props.$themeLight ? "white" : "#1e293b")};
  height: 100vh;
  top: 0;
  left: 0;
  transition: all 0.3s;
  border-right: 1px solid #0e172a;
  ${(prop) =>
    prop.$isShowAdminSidebar &&
    css`
      left: -251px;
    `}
`;
export const SideBarLogo = styled.div`
  padding: 12px 4px;
  & > img {
    width: 120px;
  }
`;
export const SideBarBg = styled.div`
  background-image: ${(props) =>
    props.$themeLight
      ? "url('../assets/image/Logo-Diamond-SpringTide.png')"
      : "url('../assets/image/Logo-Diamond-SpringTide-Dark.png')"};
  background-size: cover;
  background-position: center;
  width: 120px;
  height: 60px;
`;
export const SideBarElement = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  font-size: 17px;
  color: ${(props) => (props.$themeLight ? "black" : "white")};
  text-decoration: none;
  transition: all 0.1s;
  &:hover {
    background-color: ${(props) => (props.$themeLight ? "#1e293b" : "white")};
    color: ${(props) => (props.$themeLight ? "white" : "black")};
  }
  ${(props) =>
    props.$active &&
    css`
      background-color: ${(props) => (props.$themeLight ? "#1e293b" : "white")};
      color: ${(props) => (props.$themeLight ? "white" : "black")};
      &::before {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        background-color: ${(props) => (props.$themeLight ? "gray" : "black")};
        height: 100%;
        width: 4px;
      }
    `};
`;
