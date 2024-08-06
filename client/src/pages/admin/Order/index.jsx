import { useEffect, useState } from "react";
import { Button, message, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getOrderListRequest,
  updateOrderProductRequest,
  deleteOrderProductRequest,
} from "../../../redux/slicers/order.slice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);

  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    dispatch(getOrderListRequest({ userId: "" }));
  }, []);

  const handleStatusChange = (value, recordId) => {
    setSelectedStatuses({
      ...selectedStatuses,
      [recordId]: value,
    });
  };

  const handleUpdate = (recordId) => {
    const selectedStatus = selectedStatuses[recordId];
    if (selectedStatus) {
      dispatch(updateOrderProductRequest({ data: { id: recordId, message: selectedStatus } }));
    } else {
      console.log("Loiix");
    }
  };
  const handleDelete = (recordId) => {
    dispatch(deleteOrderProductRequest({ data: { id: recordId } }));
  };

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
      render: (status, record) => {
        return status === "Canceled" ? (
          "Canceled"
        ) : status === "Success" ? (
          "Success"
        ) : (
          <Select defaultValue={status} onChange={(value) => handleStatusChange(value, record.id)}>
            <Select.Option
              value="Pending"
              disabled={status === "Success" || status === "Are delivering" || status === "Order confirm"}
            >
              Pending
            </Select.Option>
            <Select.Option value="Order confirm" disabled={status === "Are delivering" || status === "Success"}>
              Order confirm
            </Select.Option>
            <Select.Option value="Are delivering" disabled={status === "Success"}>
              Are delivering
            </Select.Option>
            <Select.Option value="Success" disabled={status === "Success"}>
              Success
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return record.status === "Canceled" ? (
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        ) : (
          record.status !== "Success" && <Button onClick={() => handleUpdate(record.id)}>Update</Button>
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
            <table>
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <td>Product Name</td>
                  <td>Price</td>
                  <td>Image</td>
                  <td>Quantity</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {record.orderDetails.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                      <img style={{ width: "70px" }} src={`/assets/update-image/${item.image}`} alt="" />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ),
      }}
    />
  );
};

export default OrderManagement;
