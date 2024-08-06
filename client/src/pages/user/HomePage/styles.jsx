import styled, { css } from "styled-components";

export const ProductTitleContainer = styled.div`
  text-align: center;
`;
export const ProductTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #dba628;
`;
export const ProductDes = styled.img`
  width: 100px;
`;
export const ProductSnapWrapper = styled.div`
  padding: 40px 120px;
`;
export const ProductSnapContainer = styled.div`
  display: flex;
  gap: 50px;
  width: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  scroll-snap-stop: always;
`;
export const ProductSnapItem = styled.div`
  scroll-snap-align: start;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: 17px;
  padding: 5px;
  ${(prop) =>
    prop.$active &&
    css`
      color: #fa8c16;
    `}
`;
export const ProductSnapImage = styled.div`
  border: 1px solid #dba628;
  width: 150px;
  height: 150px;
  background-position: center;
  background-size: 100%;
  transition: all 0.3s linear;
  cursor: pointer;
  &:hover {
    background-size: 120%;
  }
  ${(prop) =>
    prop.$active &&
    css`
      border: 1px solid #fa8c16;
      background-size: 120%;
      transform: translate(5px, -5px);
      box-shadow: -5px 5px 10px #fde6af;
    `}
`;
export const ProductSnapTypeName = styled.div``;
