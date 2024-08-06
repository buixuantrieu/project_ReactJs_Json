/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteRequest, unFavoriteRequest } from "../../../redux/slicers/favorite.slice";
import { useEffect, useMemo } from "react";
import { Button } from "antd";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

import { Table } from "antd";

function Favorite() {
  const dispatch = useDispatch();

  const { favoriteList } = useSelector((state) => state.favorite);
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
  }, []);
  const data = useMemo(
    () =>
      favoriteList.data.map((item, index) => {
        return {
          key: index,
          image: <img src={`/assets/update-image/${item.product.image}`} style={{ width: 50 }} alt="" />,
          name: item.product.name,
          detail: <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.productId })}>Detail</Link>,
          delete: (
            <Button
              onClick={() => {
                dispatch(
                  unFavoriteRequest({
                    id: item.id,
                    callback: () => dispatch(getFavoriteRequest({ userId: userInfo.data.id })),
                  })
                );
              }}
              danger
            >
              Un Favorite
            </Button>
          ),
        };
      }),
    [favoriteList.data]
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "detail",
    },
    {
      title: "",
      dataIndex: "delete",
    },
  ];
  return (
    <S.FavoriteWrapper>
      <S.FavoriteTitle>Favorite Products</S.FavoriteTitle>
      <Table columns={columns} dataSource={data} size="middle" />
    </S.FavoriteWrapper>
  );
}
export default Favorite;
