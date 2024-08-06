import styled from "styled-components";
import { Link } from "react-router-dom";
export const HeaderTitleIntro = styled.div`
  background-color: #ffd486;
  padding: 4px 0;
  .slick-track {
    height: max-content !important;
  }
  .ant-carousel .slick-dots-bottom {
    display: none !important;
  }
`;
export const HeaderContentIntro = styled.div`
  text-align: center;
  color: red;
  font-weight: 600;
  font-size: 12px;
`;
export const HeaderDesIntro = styled.div`
  text-align: center;
  font-weight: 300;
  font-size: 12px;
`;
export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 18px;
  padding-bottom: 4px;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  z-index: 100;
  background-color: white;
`;
export const HeaderNavLeft = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
`;
export const HeaderLogo = styled.div`
  width: 150px;
`;
export const HeaderNavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const HeaderNavElement = styled(Link)`
  color: #8c8c8c;
  text-decoration: none;
  font-size: 17px;
  transition: 0.3s;
  &:hover {
    color: black;
  }
`;
export const CartUserContainer = styled.div`
  display: flex;
  gap: 16px;
  color: #8c8c8c;
  font-size: 22px;
  align-items: center;
`;
export const CartUserIcons = styled(Link)`
  color: #8c8c8c;
  &:hover {
    color: black;
  }
`;
export const HeaderSearch = styled.div`
  display: flex;
  gap: 12px;
`;
export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 16px;
`;
export const UserName = styled.div`
  font-size: 12px;
`;
