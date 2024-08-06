/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "./style";
import { Form, Input, Button, ConfigProvider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { changePasswordRequest } from "../../../redux/slicers/auth.slice";

function ChangePassword() {
  const [changePasswordForm] = Form.useForm();
  const { userInfo, changePasswordData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changePasswordData.error) {
      changePasswordForm.setFields([
        {
          name: "password",
          errors: ["Incorrect password!"],
        },
      ]);
    }
  }, [changePasswordData.error]);
  const handleChangePassword = (values) => {
    dispatch(
      changePasswordRequest({
        id: userInfo.data.id,
        data: {
          email: userInfo.data.email,
          password: values.password,
          newPassword: values.newPassword,
        },
        callback: () => changePasswordForm.resetFields(),
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
      <S.ChangePasswordWrapper>
        <S.ChangePasswordTitle>Change Password</S.ChangePasswordTitle>
        <Form
          form={changePasswordForm}
          name="changePasswordForm"
          layout="vertical"
          onFinish={(values) => handleChangePassword(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Old password:"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter old password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New password:"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter new password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm new password:"
            name="confirmNewPassword"
            rules={[
              {
                required: true,
                message: "Please confirm new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={changePasswordData.load}>
            Change Password
          </Button>
        </Form>
      </S.ChangePasswordWrapper>
    </ConfigProvider>
  );
}
export default ChangePassword;
