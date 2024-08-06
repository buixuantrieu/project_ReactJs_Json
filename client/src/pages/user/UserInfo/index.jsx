/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "./styles";
import { Row, Col, Input, Form, ConfigProvider, DatePicker, Button } from "antd";

import { updateUserInfoRequest } from "../../../redux/slicers/auth.slice";

import dayjs from "dayjs";

function UserInfo() {
  const dispatch = useDispatch();
  const [formInfo] = Form.useForm();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo.data.id) {
      formInfo.setFieldsValue({
        fullName: userInfo.data.fullName,
        email: userInfo.data.email,
        phoneNumber: userInfo.data.phoneNumber,
        address: userInfo.data.address,
        birthday: userInfo.data.birthday ? dayjs(userInfo.data.birthday) : undefined,
      });
    }
  }, [userInfo.data.id]);
  const handleUpdateInfo = (values) => {
    dispatch(
      updateUserInfoRequest({
        id: userInfo.data.id,
        data: {
          ...values,
          birthday: dayjs(values.birthday).valueOf(),
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
      <S.UserInfoWrapper>
        <S.UserInfoTitle>User Info</S.UserInfoTitle>
        <Form onFinish={handleUpdateInfo} layout="vertical" form={formInfo}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Full Name:"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Full Name required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email:" name="email">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address:"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Address required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone:"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Phone number required!",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Phone number must be 10 to 11 digits and numeric only!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Birthday:"
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Birthday required!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </S.UserInfoWrapper>
    </ConfigProvider>
  );
}
export default UserInfo;
