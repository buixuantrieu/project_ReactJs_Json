import { Row, Col, Form, Input, ConfigProvider, Select, Card, Space, Radio, Button, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";

import { getCityListRequest, getDistrictListRequest, getWardListRequest } from "../../../redux/slicers/location.slice";
import { orderProductRequest } from "../../../redux/slicers/order.slice";

import * as S from "./style";

function Checkout() {
  const navigate = useNavigate();
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const { cityList, districtList, wardList } = useSelector((state) => state.location);
  const { userInfo } = useSelector((state) => state.auth);
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  useEffect(() => {
    dispatch(getCityListRequest());
  }, []);
  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.setFieldsValue({
        fullName: userInfo.data.fullName,
        email: userInfo.data.email,
        phone: userInfo.data.phoneNumber,
        address: userInfo.data.address,
      });
    }
  }, [userInfo.data]);

  const totalPrice = useMemo(() => cartList.reduce((total, item) => total + item.price * item.quantity, 0), [cartList]);
  const tableColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, item) => `${(item.price * item.quantity).toLocaleString()}$`,
    },
  ];
  const renderCityOptions = useMemo(() => {
    return cityList.data.map((city) => (
      <Select.Option key={city.code} value={city.code}>
        {city.name}
      </Select.Option>
    ));
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((district) => (
      <Select.Option key={district.code} value={district.code}>
        {district.name}
      </Select.Option>
    ));
  }, [districtList.data]);

  const renderWardOptions = useMemo(() => {
    return wardList.data.map((ward) => (
      <Select.Option key={ward.code} value={ward.code}>
        {ward.name}
      </Select.Option>
    ));
  }, [wardList.data]);

  const handleSubmitCheckout = (values) => {
    const cityData = cityList.data.find((city) => city.code === values.cityCode);
    const districtData = districtList.data.find((district) => district.code === values.districtCode);
    const wardData = wardList.data.find((ward) => ward.code === values.wardCode);
    dispatch(
      orderProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          status: "pending",
          totalPrice: totalPrice,
          cityName: cityData.name,
          districtName: districtData.name,
          wardName: wardData.name,
          cartList: cartList,
        },
        callback: () => navigate(ROUTES.USER.CART),
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
      <S.CheckoutWrapper>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <S.OrderInfoWrapper>
              <S.CheckoutTitle>Order information</S.CheckoutTitle>
              <Form layout="vertical" form={checkoutForm} onFinish={handleSubmitCheckout}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item name="fullName" label="Full Name :" rules={[{ required: true, message: "Required!" }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email :" rules={[{ required: true, message: "Required!" }]}>
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="phone" label="Phone :" rules={[{ required: true, message: "Required!" }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="address" label="Address:" rules={[{ required: true, message: "Required!" }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="City" name="cityCode" rules={[{ required: true, message: "Required!" }]}>
                      <Select
                        onChange={(value) => {
                          dispatch(getDistrictListRequest({ cityCode: value }));
                          checkoutForm.setFieldsValue({
                            districtCode: undefined,
                            wardCode: undefined,
                          });
                        }}
                        allowClear
                      >
                        {renderCityOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="District" name="districtCode" rules={[{ required: true, message: "Required!" }]}>
                      <Select
                        onChange={(value) => {
                          dispatch(getWardListRequest({ districtCode: value }));
                          checkoutForm.setFieldsValue({
                            wardCode: undefined,
                          });
                        }}
                        disabled={!checkoutForm.getFieldValue("cityCode")}
                        allowClear
                      >
                        {renderDistrictOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Ward" name="wardCode" rules={[{ required: true, message: "Required!" }]}>
                      <Select disabled={!checkoutForm.getFieldValue("districtCode")} allowClear>
                        {renderWardOptions}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Card size="small" title="Billing Information" style={{ marginBottom: 24 }}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Form.Item
                            label="Payment method"
                            name="paymentMethod"
                            rules={[{ required: true, message: "Required!" }]}
                          >
                            <Radio.Group defaultValue={"cod"}>
                              <Space direction="vertical">
                                <Radio value="cod">COD</Radio>
                                <Radio value="atm">ATM</Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Button onClick={() => navigate(ROUTES.USER.CART)}>Return</Button>
                  <Button type="primary" htmlType="submit">
                    Pay
                  </Button>
                </Row>
              </Form>
            </S.OrderInfoWrapper>
          </Col>
          <Col span={8}>
            <S.CartItemWrapper>
              <Card size="small" title="Cart" style={{ marginBottom: 24 }}>
                <Table size="small" columns={tableColumn} dataSource={cartList} rowKey="id" pagination={false} />
                <h4 style={{ marginTop: 16, textAlign: "right" }}>Total amount</h4>
                <p style={{ textAlign: "right" }}>{totalPrice.toLocaleString()}$</p>
              </Card>
            </S.CartItemWrapper>
          </Col>
        </Row>
      </S.CheckoutWrapper>
    </ConfigProvider>
  );
}
export default Checkout;
