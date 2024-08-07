import styled from "styled-components";

export const DashBoardWrapper = styled.div``;
export const DashBoardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`;
export const DashboardItem = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  gap: 28px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
`;
export const ItemTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;
export const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const ItemIcon = styled.span`
  font-size: 24px;
`;
export const ItemContent = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
