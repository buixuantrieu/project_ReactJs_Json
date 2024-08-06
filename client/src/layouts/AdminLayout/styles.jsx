import styled, { css } from "styled-components";

export const AdminWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

export const AdminContainer = styled.div`
  flex: 1;
  margin-left: 250px;
  transition: all 0.3s;
  background-color: ${(props) => (props.$themeLight ? "#f0f0f0" : "#0e172a")};
  ${(prop) =>
    prop.$isShowAdminSidebar &&
    css`
      margin-left: 0px;
    `}
`;
export const AdminContent = styled.div`
  color: ${(props) => (props.$themeLight ? "black" : "white")};
  padding: 16px;
  position: relative;
`;
