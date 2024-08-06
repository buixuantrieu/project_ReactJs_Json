/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, ConfigProvider } from "antd";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { ROUTES } from "../../constants/routes";
import * as S from "./styles";

import { activeRequest } from "../../redux/slicers/auth.slice";

function ActiveEmail() {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(activeRequest({ uid: uid }));
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dba628",
          borderRadius: 4,
        },
      }}
    >
      <S.ActiveBackground>
        <S.ShowMessageSuccess>
          <S.MessageTitle>Active account success!</S.MessageTitle>
          <S.ContentMessage>
            Congratulations, you have successfully activated your account. Now you can log in!
          </S.ContentMessage>
          <S.ButtonActive style={{ fontSize: 42, color: "#95de64" }}>
            <IoMdCheckmarkCircleOutline />
          </S.ButtonActive>
          <S.ButtonActive>
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
          </S.ButtonActive>
        </S.ShowMessageSuccess>
      </S.ActiveBackground>
    </ConfigProvider>
  );
}
export default ActiveEmail;
