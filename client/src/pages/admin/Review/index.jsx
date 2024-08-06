import { useSelector, useDispatch } from "react-redux";

import { getReviewListRequest, deleteReviewProductRequest } from "../../../redux/slicers/review.slice";
import { useEffect } from "react";
import { Table, Rate, Button } from "antd";
import dayjs from "dayjs";

function ReviewManagement() {
  const dispatch = useDispatch();
  const { reviewList } = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getReviewListRequest({ productId: "" }));
  }, []);
  const tableColumns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "user",
      render: (user) => `${user.email}`,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => `${comment}`,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (rate) => <Rate value={rate} disabled />,
    },
    {
      title: "CreateAte",
      dataIndex: "createAt",
      key: "createAt",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, item) => (
        <Button onClick={() => dispatch(deleteReviewProductRequest({ id: item.id }))} danger>
          Delete
        </Button>
      ),
    },
  ];
  return <Table columns={tableColumns} dataSource={reviewList.data} />;
}
export default ReviewManagement;
