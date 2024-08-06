/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, InputNumber, Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import * as S from "./styles";

import { getCartRequest, updateCartRequest, deleteCartRequest } from "../../../redux/slicers/cart.slice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartSelect, setCartSelect] = useState([]);
  const { cartList } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      getCartRequest({
        data: {
          userId: userInfo.data.id,
        },
      })
    );
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Delete",
      dataIndex: "delete",
    },
  ];

  const handleChangeQuantity = (id, value) => {
    dispatch(
      updateCartRequest({
        id: id,
        quantity: value,
        callback: () =>
          dispatch(
            getCartRequest({
              data: {
                userId: userInfo.data.id,
              },
            })
          ),
      })
    );
  };
  const handleDeleteCart = (id) => {
    dispatch(
      deleteCartRequest({
        id: id,
        callback: () =>
          dispatch(
            getCartRequest({
              data: {
                userId: userInfo.data.id,
              },
            })
          ),
      })
    );
  };
  const data = useMemo(
    () =>
      cartList.data.map((item, index) => {
        return {
          key: index,
          name: item.product.name,
          image: <img src={`/assets/update-image/${item.product.image}`} width={50} alt="" />,
          quantity: (
            <InputNumber
              min={1}
              max={99}
              style={{ width: 60 }}
              value={item.quantity}
              onChange={(value) => handleChangeQuantity(item.id, value)}
            />
          ),
          total: <p>{item.quantity * item.product.price}</p>,
          delete: (
            <Button onClick={() => handleDeleteCart(item.id)} danger>
              Delete
            </Button>
          ),
          id: item.id,
          productId: item.productId,
          quantityProduct: item.quantity,
          imageProduct: item.product.image,
          price: item.product.price,
          productName: item.product.name,
        };
      }),
    [cartList.data]
  );
  const handleCheckout = () => {
    localStorage.setItem("cartList", JSON.stringify(cartSelect));
    navigate(ROUTES.USER.CHECKOUT);
  };

  const rowSelection = {
    onChange: async (_, selectedRows) => {
      const cartId = selectedRows.map((element) => {
        return {
          id: element.id,
          productId: element.productId,
          quantity: element.quantityProduct,
          image: element.imageProduct,
          price: element.price,
          name: element.productName,
        };
      });
      setCartSelect(cartId);
    },
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
      <S.CartWrapper>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </S.CartWrapper>
      <Button onClick={() => handleCheckout()}>checkout</Button>
    </ConfigProvider>
  );
}
export default Cart;
