/* eslint-disable react-hooks/exhaustive-deps */
import { Form, ConfigProvider, Button, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { forgotPasswordRequest } from "../../redux/slicers/auth.slice";
import { sendMailRequest } from "../../redux/slicers/send-mail.slice";

import * as S from "./styles";

function ForgotPassword() {
  const [forgotForm] = Form.useForm();
  const dispatch = useDispatch();
  const { forgotPasswordData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (forgotPasswordData.error) {
      forgotForm.setFields([
        {
          name: "email",
          errors: [forgotPasswordData.error],
        },
      ]);
    }
  }, [forgotPasswordData.error]);

  const handleSendMail = (value) => {
    dispatch(
      forgotPasswordRequest({
        data: {
          email: value.email,
        },
        callback: (uid) => {
          dispatch(
            sendMailRequest({
              data: {
                email: value.email,
                html: `<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <title>Đặt lại mật khẩu</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 20px;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                }
                                h1 {
                                    color: #333333;
                                }
                                p {
                                    color: #555555;
                                }
                                .button {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    font-size: 16px;
                                    color: #ffffff;
                                    background-color: #ffd486;
                                    text-decoration: none;
                                    border-radius: 4px;
                                }
                                .button:hover {
                                    background-color: #ffe9bf;
                                }
                                footer {
                                    margin-top: 20px;
                                    font-size: 14px;
                                    color: #777777;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Đặt lại mật khẩu</h1>
                                <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                                <p>Để đặt lại mật khẩu, vui lòng nhấp vào liên kết bên dưới:</p>
                                <a href="http://localhost:3000/forgot-password/${uid}" class="button">Thay đổi mật khẩu</a>
                                <footer>
                                    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể bỏ qua email này.</p>
                                    <p>Cảm ơn bạn!</p>
                                </footer>
                            </div>
                        </body>
                        </html>`,
              },
            })
          );
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
      <S.ForgotWrapper>
        <S.ForgotContainer>
          <Form form={forgotForm} layout="vertical" onFinish={(value) => handleSendMail(value)}>
            <S.ForgotTitle>Forgot Password</S.ForgotTitle>
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
            <Button htmlType="submit" style={{ width: "100%", fontWeight: 500 }} type="primary">
              Login
            </Button>
          </Form>
        </S.ForgotContainer>
        <S.ForgotBackground />
      </S.ForgotWrapper>
    </ConfigProvider>
  );
}
export default ForgotPassword;
