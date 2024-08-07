import React, { useEffect, useMemo } from "react";
import { Line, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { orderRevenueRequest } from "../../redux/slicers/order.slice";
import { getTypeRequest } from "../../redux/slicers/type.slice";
import { getProductRequest } from "../../redux/slicers/product.slice";
import { getUserRequest } from "../../redux/slicers/auth.slice";
import dayjs from "dayjs";
import * as S from "./styles";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale,
  ArcElement
);

function Dashboard() {
  const dispatch = useDispatch();
  const { orderRevenue } = useSelector((state) => state.order);
  const { typeList } = useSelector((state) => state.type);
  const { productList } = useSelector((state) => state.product);
  const { userList } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(orderRevenueRequest());
    dispatch(getTypeRequest({ keywords: null }));
    dispatch(
      getProductRequest({
        categoryId: [],
        typeId: [],
        keywords: null,
      })
    );
    dispatch(getUserRequest({ userId: "" }));
  }, []);

  const monthlyRevenue = orderRevenue.data.reduce((acc, order) => {
    const orderDate = dayjs(order.createdAt);
    if (orderDate.year() === 2024) {
      const month = orderDate.month();
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += order.totalPrice;
    }
    return acc;
  }, {});

  const revenueByMonth = Array.from({ length: 12 }, (_, i) => monthlyRevenue[i] || 0);
  const totalPrice = useMemo(
    () => orderRevenue.data.reduce((total, item) => total + item.totalPrice, 0),
    [orderRevenue.data]
  );
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total",
        data: revenueByMonth,
        fill: false,
        backgroundColor: "#b37feb",
        borderColor: "#efdbff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue 2024",
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInOutQuad",
        from: 1,
        to: 0.4,
        loop: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labelType = useMemo(() => typeList.data.map((item) => item.name), [typeList.data]);
  const dataType = useMemo(() => typeList.data.map((item) => item.products.length), [typeList.data]);
  const colors = useMemo(() => typeList.data.map((item) => getRandomColor()), [typeList.data]);

  const datas = {
    labels: labelType,
    datasets: [
      {
        label: "Quantity Category",
        data: dataType,
        backgroundColor: colors,
      },
    ],
  };

  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " product";
          },
        },
      },
    },
  };

  return (
    <S.DashBoardWrapper>
      <S.DashBoardTitle>Dashboard</S.DashBoardTitle>
      <Row gutter={[16, 16]} style={{ marginBottom: 36 }}>
        <Col span={6}>
          <S.DashboardItem>
            <S.ItemTitle>Revenue</S.ItemTitle>
            <S.ItemWrapper>
              <S.ItemIcon>
                <FaMoneyCheckAlt />
              </S.ItemIcon>
              <S.ItemContent>{totalPrice.toLocaleString()} $</S.ItemContent>
            </S.ItemWrapper>
          </S.DashboardItem>
        </Col>
        <Col span={6}>
          <S.DashboardItem>
            <S.ItemTitle>Order success</S.ItemTitle>
            <S.ItemWrapper>
              <S.ItemIcon>
                <TbTruckDelivery />
              </S.ItemIcon>
              <S.ItemContent>{orderRevenue.data.length}</S.ItemContent>
            </S.ItemWrapper>
          </S.DashboardItem>
        </Col>
        <Col span={6}>
          <S.DashboardItem>
            <S.ItemTitle>Product</S.ItemTitle>
            <S.ItemWrapper>
              <S.ItemIcon>
                <AiFillProduct />
              </S.ItemIcon>
              <S.ItemContent>{productList.data.length}</S.ItemContent>
            </S.ItemWrapper>
          </S.DashboardItem>
        </Col>
        <Col span={6}>
          <S.DashboardItem>
            <S.ItemTitle>Account</S.ItemTitle>
            <S.ItemWrapper>
              <S.ItemIcon>
                <MdSupervisorAccount />
              </S.ItemIcon>
              <S.ItemContent>{userList.data.length}</S.ItemContent>
            </S.ItemWrapper>
          </S.DashboardItem>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={7}></Col>
        <Col span={10}>
          <PolarArea data={datas} options={option} />
        </Col>
        <Col span={7}></Col>
        <Col span={24}>
          <Line data={data} options={options} />
        </Col>
      </Row>
    </S.DashBoardWrapper>
  );
}

export default Dashboard;
