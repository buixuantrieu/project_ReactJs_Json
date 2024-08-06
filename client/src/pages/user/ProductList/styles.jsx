import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
export const ProductListWrapper = styled.div`
  background-color: #f5f5f5;
`;
export const ProductListBanner = styled.img`
  width: 100%;
`;
export const ProductListContainer = styled.div`
  padding: 30px 60px;
  display: flex;
  gap: 20px;
`;
export const SidebarFilterContainer = styled.div`
  width: 300px;
  background-color: white;
  padding: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const ShowProductWrapper = styled.div`
  flex: 1;
  background-color: white;
  padding: 24px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const SidebarTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
export const LabelFilter = styled.div`
  font-weight: 500;
  color: #dba628;
  margin: 12px 0;
`;
export const SidebarButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;
export const BoxProduct = styled.div``;
export const BoxImageProduct = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  object-fit: cover;
`;

export const BoxProductName = styled(Link)`
  text-align: center;
  font-size: 16px;
  color: black;
  display: block;
  &:hover {
    color: #dba628;
  }
`;
export const BoxProductType = styled.div`
  text-align: center;
  color: gray;
  font-size: 12px;
  margin: 6px 0;
`;
export const BoxProductPrice = styled.div`
  text-align: center;
  color: #dba628;
  font-weight: bold;
  font-size: 16px;
  margin-top: 6px;
`;
export const BoxProductImageContainer = styled.div`
  position: relative;
  &:hover > span {
    width: max-content;
    height: max-content;
    padding: 6px 12px;
  }
`;
export const ButtonAddCart = styled.span`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #dba52862;
  color: white;
  transition: all 0.3s;
  padding: 6px 12px;
  border-radius: 4px;
  width: 0px;
  height: 0px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #dba628;
  }
`;
export const ButtonFavoriteDetail = styled.span`
  position: absolute;
  right: 0px;
  top: 0px;
  transition: all 0.3s;
  width: 0;
  height: 0;
  overflow: hidden;
`;
export const ButtonFavorite = styled.div`
  background-color: white;
  color: gray;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(prop) =>
    prop.$isFavorite &&
    css`
      color: white;
      background-color: #cf1322;
    `}
`;
export const ButtonDetail = styled.div`
  margin-top: 8px;
  background-color: white;
  color: gray;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    color: white;
    background-color: #dba628;
  }
`;
export const ProductCategory = styled.div`
  position: absolute;
  top: 6px;
  left: 4px;
  transition: all 0.3s;
  font-size: 10px;
  color: gray;
`;
export const ButtonShowMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
export const HeaderInput = styled.input`
  outline: none;
  width: 200px;
  padding: 6px 12px;
  transition: all 1s ease-in;
  border: 1px solid #dba628;
  border-radius: 3px;
  height: 30px;
`;
export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
