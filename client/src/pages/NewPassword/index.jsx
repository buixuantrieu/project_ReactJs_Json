import { Form, ConfigProvider, Button, Input } from "antd";

import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { newPasswordRequest } from "../../redux/slicers/auth.slice";

import { ROUTES } from "../../constants/routes";
import * as S from "./styles";

function NewPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid } = useParams();

  const handleSendMail = (value) => {
    dispatch(
      newPasswordRequest({
        data: {
          uid: uid,
          newPassword: value.password,
        },
        callback: () => {
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
      <S.ForgotWrapper>
        <S.ForgotContainer>
          <Form layout="vertical" onFinish={(value) => handleSendMail(value)}>
            <S.ForgotTitle>Update Password</S.ForgotTitle>
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
            <Button htmlType="submit" style={{ width: "100%", fontWeight: 500 }} type="primary">
              Update
            </Button>
          </Form>
        </S.ForgotContainer>
        <S.ForgotBackground />
      </S.ForgotWrapper>
    </ConfigProvider>
  );
}
export default NewPassword;
