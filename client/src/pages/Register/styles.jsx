import styled from "styled-components";
import { Link } from "react-router-dom";

export const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;
export const RegisterContainer = styled.div`
  width: 350px;
  background-color: white;
  position: relative;
  z-index: 10;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 8px;
  padding: 40px 48px;
  display: flex;
  flex-flow: column;
  justify-content: center;
`;
export const RegisterBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
`;
export const RegisterTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
`;
export const ForgotPassContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`;
export const ForgotItem = styled(Link)`
  width: max-content;
  color: gray;
  font-size: 12px;
`;
