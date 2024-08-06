import styled, { css } from "styled-components";
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  align-items: center;
  background-color: #1e293b;

  ${(props) =>
    props.$themeLight &&
    css`
      background-color: white;
    `}
`;
export const ToggleSidebar = styled.span`
  font-size: 34px;
  color: white;
  ${(props) =>
    props.$themeLight &&
    css`
      color: #0e172a;
    `}
`;
export const DarkModeWrapper = styled.div`
  width: 70px;
  height: 30px;
  border-radius: 18px;
  background-color: #d9d9d9;

  position: relative;
  ${(props) =>
    props.$themeLight &&
    css`
      background-color: #495363;
    `}
`;
export const DarkModeIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  color: #0e172a;
  right: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  ${(props) =>
    props.$themeLight &&
    css`
      background-color: #0e172a;
      color: white;
      right: 3px;
    `}
`;
export const DarkModeContent = styled.div`
  position: absolute;
  text-align: center;
  right: 12px;
  top: 50%;
  transition: all 0.3s;
  transform: translateY(-50%);
  font-size: 8px;
  font-weight: bold;
  cursor: default;

  ${(props) =>
    props.$themeLight &&
    css`
      right: 35px;
      color: white;
    `}
`;
