import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const ProfileWrapper = styled.div`
  padding: 30px 60px;
`;
export const ProfileContainer = styled.div`
  display: flex;
  gap: 30px;
`;
export const SidebarWrapper = styled.div`
  background-color: white;
  width: 350px;
`;
export const ContentWrapper = styled.div`
  padding: 16px;
  background-color: white;
  flex: 1;
`;
export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  border-radius: 50%;
  position: relative;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
`;
export const IconUpdateAvatar = styled.label`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 24px;
  color: black;
  filter: drop-shadow(0 0 10px white);
`;
export const UserName = styled.div`
  text-align: center;
  font-weight: 500;
  margin: 12px 0;
  font-size: 16px;
`;
export const EmailSidebar = styled.div`
  text-align: center;
  color: gray;
  margin-bottom: 24px;
  font-size: 14px;
`;
export const SidebarElement = styled(Link)`
  padding: 16px 8px;
  border-bottom: 1px solid #80808047;
  display: block;
  font-weight: 500;
  color: black;
  text-decoration: none;
  position: relative;
  font-size: 16px;
  ${(prop) =>
    prop.$active &&
    css`
      background-color: #ffd486;
      color: white;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 4px;
        height: 100%;
        background: #dba628;
      }
    `}
  &:hover {
    background-color: #ffd486;
    color: white;
  }
`;
