/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, ConfigProvider, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uid } from "uuid";
import { useEffect } from "react";

import { registerRequest } from "../../redux/slicers/auth.slice";
import { sendMailRequest } from "../../redux/slicers/send-mail.slice";

import * as S from "./styles";
import { ROUTES } from "../../constants/routes";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerForm] = Form.useForm();

  const { registerData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.error],
        },
      ]);
    }
  }, [registerData.error]);

  const handleSubmitRegister = (values) => {
    const uuid = uid();
    dispatch(
      registerRequest({
        data: {
          fullName: null,
          email: values.email,
          password: values.password,
          role: "user",
          birthday: null,
          phoneNumber: null,
          avatar: null,
          status: "UnActivated",
          uid: uuid,
        },
        callback: (uid) => {
          setTimeout(
            () =>
              dispatch(
                sendMailRequest({
                  data: {
                    email: values.email,
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="UTF-8">
                    <title>Xác Nhận Tài Khoản</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                    <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <div style="background-color: #ffd486; padding: 20px; color: #ffffff; text-align: center;">
                        <h1>Xác Nhận Tài Khoản</h1>
                        </div>
                        <div style="padding: 20px;">
                        <p>Chào bạn,</p>
                        <p>Chúng tôi đã nhận được yêu cầu đăng ký tài khoản từ bạn. Vui lòng nhấp vào liên kết bên dưới để xác nhận tài khoản của bạn:</p>
                        <a href="http://localhost:3000/active/${uid}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #ffd486; text-decoration: none; border-radius: 5px;">Xác Nhận Tài Khoản</a>
                        <p>Nếu bạn không yêu cầu điều này, bạn có thể bỏ qua email này.</p>
                        </div>
                        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888888;">
                        <p>© 2024 Your Company. All rights reserved.</p>
                        </div>
                    </div>
                    </body>
                    </html>`,
                  },
                })
              ),
            3000
          );
          navigate(ROUTES.LOGIN);
        },
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
      <S.RegisterWrapper>
        <S.RegisterContainer>
          <Form layout="vertical" onFinish={handleSubmitRegister} form={registerForm}>
            <S.RegisterTitle>Register</S.RegisterTitle>
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
                {
                  pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
                  message: "Mật khẩu yếu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password:"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu là bắt buộc",
                },
                (params) => ({
                  validator(_, value) {
                    if (!value || params.getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <S.ForgotPassContainer>
              <S.ForgotItem to={ROUTES.LOGIN}>Login</S.ForgotItem>
            </S.ForgotPassContainer>
            <Button htmlType="submit" style={{ width: "100%", fontWeight: 500 }} type="primary">
              Register
            </Button>
          </Form>
        </S.RegisterContainer>
        <S.RegisterBackground />
      </S.RegisterWrapper>
    </ConfigProvider>
  );
}
export default Register;
