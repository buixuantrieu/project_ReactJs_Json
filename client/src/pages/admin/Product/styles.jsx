import styled, { css } from "styled-components";

export const CategoryWrapper = styled.div``;
export const CategoryTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;
export const OperationContainer = styled.div`
  display: flex;
  gap: 8px;
`;
export const PopupCreateCategory = styled.div`
  position: absolute;
  width: 100%;
  height: max-content;
  top: 0;
  left: 0;
  background-color: white;
  display: ${(props) => (props.$showPopup ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-left: 1px solid black;
`;
export const FormCreateCategory = styled.div`
  background-color: white;
  border-radius: 8px;
  width: max-content;
  padding: 0px 20px;
  height: max-content;
`;
export const ExitPopupAdd = styled.div`
  display: flex;
  justify-content: end;
  color: black !important;
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  background-image: ${(props) => `url(/assets/update-image/${props.$image})`};
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
export const PopupUpdateCategory = styled.div`
  position: absolute;
  width: 100%;
  height: max-content;
  top: 0;
  left: 0;
  background-color: white;
  display: ${(props) => (props.$showPopupUpdate ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-left: 1px solid black;
`;
export const FormUpdateCategory = styled.div`
  background-color: white;
  border-radius: 8px;
  width: max-content;
  padding: 32px 24px;
  height: max-content;
  box-shadow: 0 0 10px gray;
`;
export const ExitPopupUpdate = styled.div`
  display: flex;
  justify-content: end;
  color: black !important;
`;
export const StatisticalWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;
export const StatisticalItem = styled.div`
  width: 150px;
  height: 100px;
  border-radius: 6px;
  background-color: #0e172a;
  color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  ${(prop) =>
    !prop.$themLight &&
    css`
      background-color: white;
      color: black;
    `}
`;
export const StatisticalItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
export const StatisticalItemNumber = styled.div``;
export const PopupShowDeletedWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #f0f5ffed;
  ${(prop) =>
    !prop.$showDeleted &&
    css`
      display: none;
    `}
`;
export const PopupShowDeleted = styled.div`
  width: 400px;
  height: 500px;
  overflow-y: auto;
`;
export const ExitDeleted = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 8px;
  color: black;
`;
export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 200px;
`;
