import styled from "styled-components";

export const ActiveBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: white;
  top: 0;
  left: 0;
  &::after {
    content: "";
    position: absolute;
    top: 23rem;
    left: 0;
    right: 0;
    height: 100vh;
    background-color: #ffd486;
    transform: skew(0, 10deg);
  }
  &::before {
    content: "";
    position: absolute;
    top: 23rem;
    left: 0;
    right: 0;
    height: 100vh;
    background-color: #ffd486;
    transform: skew(0, -10deg);
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ShowMessageSuccess = styled.div`
  padding: 24px 32px;
  position: relative;
  z-index: 10;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-radius: 8px;
  width: 300px;
`;
export const MessageTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
`;
export const ContentMessage = styled.div`
  color: gray;
  font-size: 12px;
  text-align: center;
`;
export const ButtonActive = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;
