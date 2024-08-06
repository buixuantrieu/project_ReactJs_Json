import { useEffect } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { ROUTES } from "../../../constants/routes";

import { getOrderListRequest, updateOrderProductRequest } from "../../../redux/slicers/order.slice";
import { Link, generatePath } from "react-router-dom";

const OrderHistories = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderListRequest({ userId: userInfo.data.id }));
  }, []);

  const tableColumns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Quantity",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderDetails.length}`,
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()}$`,
    },
    {
      title: "Order date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Delivery address",
      dataIndex: "address",
      key: "address",
      render: (_, item) => `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => `${item.status}`,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, item) => {
        return item.status === "Pending" ? (
          <Button
            onClick={() =>
              dispatch(
                updateOrderProductRequest({ data: { id: item.id, userId: userInfo.data.id, message: "Canceled" } })
              )
            }
            danger
          >
            Canceled
          </Button>
        ) : (
          <Button disabled>Canceled</Button>
        );
      },
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <>
            {console.log(record)}
            <table>
              <tr style={{ fontWeight: "bold" }}>
                <td>Product Name</td>
                <td>Price</td>
                <td>Image</td>
                <td>Quantity</td>
                <td>Total</td>
                {record.status === "Success" && <td></td>}
              </tr>
              {record.orderDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    <img style={{ width: "70px" }} src={`/assets/update-image/${item.image}`} alt="" />
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                  {record.status === "Success" && (
                    <td>
                      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.productId })}>Review</Link>
                    </td>
                  )}
                </tr>
              ))}
            </table>
          </>
        ),
      }}
    />
  );
};

export default OrderHistories;
