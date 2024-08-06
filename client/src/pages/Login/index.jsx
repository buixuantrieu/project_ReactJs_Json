/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, ConfigProvider, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


import { loginRequest } from "../../redux/slicers/auth.slice";

import { ROUTES } from "../../constants/routes";
import * as S from "./styles";

function Login() {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);
  const handleLogin = (value) => {
    dispatch(
      loginRequest({
        data: {
          email: value.email,
          password: value.password,
        },
        callback: (role) => navigate(role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME),
      })
    );
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dba628",
          borderRadius: 4,
        },
      }}
    >
      <S.LoginWrapper>
        <S.LoginContainer>
          <Form form={loginForm} layout="vertical" onFinish={(value) => handleLogin(value)}>
            <S.LoginTitle>Login</S.LoginTitle>
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Email required!",
                },
                {
                  type: "email",
                  message: "Email invalidate!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password required!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <S.ForgotPassContainer>
              <S.ForgotItem to={ROUTES.REGISTER}>Register</S.ForgotItem>
              <S.ForgotItem to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</S.ForgotItem>
            </S.ForgotPassContainer>
            <Button htmlType="submit" style={{ width: "100%", fontWeight: 500 }} type="primary">
              Login
            </Button>
          </Form>
        </S.LoginContainer>
        <S.LoginBackground />
      </S.LoginWrapper>
    </ConfigProvider>
  );
}
export default Login;
