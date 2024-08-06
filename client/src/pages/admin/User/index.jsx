import { Table, Button } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserRequest, updateStatusUserRequest } from "../../../redux/slicers/auth.slice";
import { render } from "@testing-library/react";

function UserManagement() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserRequest());
  }, []);
  const dataColumns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => `${email}`,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName) => `${fullName}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => `${status}`,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, item) =>
        item.status === "active" ? (
          <Button
            danger
            onClick={() =>
              dispatch(
                updateStatusUserRequest({
                  data: {
                    id: item.id,
                    status: "lock",
                  },
                })
              )
            }
          >
            Lock
          </Button>
        ) : item.status === "lock" ? (
          <Button
            type="primary"
            onClick={() =>
              dispatch(
                updateStatusUserRequest({
                  data: {
                    id: item.id,
                    status: "active",
                  },
                })
              )
            }
          >
            Unlock
          </Button>
        ) : (
          ""
        ),
    },
  ];
  return <Table columns={dataColumns} dataSource={userList.data} />;
}
export default UserManagement;
