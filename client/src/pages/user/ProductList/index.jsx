/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, generatePath, Link } from "react-router-dom";
import { Breadcrumb, Checkbox, Row, Col, ConfigProvider, Select, Slider, Button, Space, notification } from "antd";
import qs from "qs";
import { v4 as uuid } from "uuid";

import { FaSortAlphaUp } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { PiDiamondsFourThin } from "react-icons/pi";
import { MdCurrencyExchange } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import { getTypeRequest } from "../../../redux/slicers/type.slice";
import { getCategoryRequest } from "../../../redux/slicers/category.slice";
import { getProductRequest } from "../../../redux/slicers/product.slice";
import { getFavoriteRequest, unFavoriteRequest, addFavoriteRequest } from "../../../redux/slicers/favorite.slice";
import { addCartRequest, getCartRequest } from "../../../redux/slicers/cart.slice";

import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import * as S from "./styles";

function ProductList() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [rangeValue, setRangeValue] = useState([0, 1999]);

  const { typeList } = useSelector((state) => state.type);
  const { categoryList } = useSelector((state) => state.category);
  const { productList } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    return {
      categoryId: params.categoryId || [],
      typeId: params.typeId || [],
      priceOrder: params.priceOrder,
      keywords: params.keywords || "",
      gte: parseInt(rangeValue[0]),
      lte: parseInt(rangeValue[1]),
      page: 1,
      limit: PRODUCT_LIMIT,
    };
  }, [search, rangeValue]);
  useEffect(() => {
    dispatch(getTypeRequest({ keywords: null }));
    dispatch(getCategoryRequest({ keywords: null }));
    dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
  }, []);
  useEffect(() => {
    dispatch(getProductRequest({ ...searchParams, page: 1, limit: PRODUCT_LIMIT }));
  }, []);
  const handleFilter = (key, value) => {
    const newFilterParams = { ...searchParams, [key]: value };
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`);
    dispatch(getProductRequest({ ...newFilterParams }));
  };

  const handleShowMore = () => {
    dispatch(
      getProductRequest({
        ...searchParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };
  const onChange = (value) => {
    setRangeValue(value);
    const newFilterParams = { ...searchParams, gte: parseInt(value[0]), lte: parseInt(value[1]) };
    navigate(`${ROUTES.USER.PRODUCT_LIST}?${qs.stringify(newFilterParams)}`);
    dispatch(getProductRequest({ ...newFilterParams }));
  };

  const handleReset = () => {
    setRangeValue([0, 1999]);
    navigate(ROUTES.USER.PRODUCT_LIST);
    dispatch(
      getProductRequest({
        categoryId: [],
        typeId: [],
        priceOrder: null,
        keywords: "",
        gte: parseInt(0),
        lte: parseInt(1999),
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  };
  const handleAddCart = (productId) => {
    if (userInfo.data.id) {
      const id_cart = uuid();
      dispatch(
        addCartRequest({
          data: { id: id_cart, userId: userInfo.data.id, productId: productId, quantity: 1 },
          callback: () => dispatch(getCartRequest({ data: { userId: userInfo.data.id } })),
        })
      );
    } else {
      notification.warning({ message: "You need to log in to perform this function!" });
    }
  };

  const renderCategory = useMemo(
    () =>
      categoryList.data.map((item, index) => {
        return {
          label: item.name,
          value: item.id,
          desc: item.name,
        };
      }),
    [categoryList.data]
  );
  const renderType = useMemo(
    () =>
      typeList.data.map((item, index) => {
        return (
          <Col key={index} span={12} style={{ minHeight: 44 }}>
            <Checkbox value={item.id}>{item.name}</Checkbox>
          </Col>
        );
      }),
    [typeList.data]
  );
  const renderProductList = useMemo(
    () =>
      productList.data.map((item, index) => {
        const isFavorite = favoriteList.data.some((fav) => fav.productId === item.id);
        const IndexFavorite = favoriteList.data.filter((items) => items.productId === item.id);
        return (
          <Col key={index} span={6}>
            <S.BoxProduct>
              <S.BoxProductImageContainer>
                <S.ProductCategory>{item.category.name}</S.ProductCategory>
                <S.BoxImageProduct src={`/assets/update-image/${item.image}`} />
                <S.ButtonAddCart onClick={() => handleAddCart(item.id)}>Add to Cart</S.ButtonAddCart>
                <S.ButtonFavoriteDetail>
                  <S.ButtonFavorite
                    $isFavorite={isFavorite}
                    onClick={() => {
                      userInfo.data.id
                        ? isFavorite
                          ? dispatch(
                              unFavoriteRequest({
                                id: IndexFavorite[0].id,
                                callback: () => {
                                  dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
                                },
                              })
                            )
                          : dispatch(
                              addFavoriteRequest({
                                data: { productId: item.id, userId: userInfo.data.id },
                                callback: () => {
                                  dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
                                },
                              })
                            )
                        : notification.warning({ message: "You need to log in to perform this function!" });
                    }}
                  >
                    <MdFavorite />
                  </S.ButtonFavorite>
                  <S.ButtonDetail>
                    <CiSearch />
                  </S.ButtonDetail>
                </S.ButtonFavoriteDetail>
              </S.BoxProductImageContainer>
              <S.BoxProductType>{item.type.name}</S.BoxProductType>
              <S.BoxProductName to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
                {item.name}
              </S.BoxProductName>
              <S.BoxProductPrice>{item.price}.$</S.BoxProductPrice>
            </S.BoxProduct>
          </Col>
        );
      }),
    [productList.data, favoriteList.data, userInfo.data.id]
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dba628",
        },
      }}
    >
      <S.ProductListWrapper>
        <S.ProductListBanner src="/assets/image/BannerNhanKimCuong.jpg" />

        <S.ProductListContainer>
          <S.SidebarFilterContainer>
            <S.SidebarTitle>Filter</S.SidebarTitle>
            <S.LabelFilter>
              <TbCategory /> Category :
            </S.LabelFilter>
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Select Category"
              value={searchParams.categoryId}
              onChange={(value) => handleFilter("categoryId", value)}
              options={renderCategory}
            />
            <S.LabelFilter>
              <PiDiamondsFourThin /> Type :
            </S.LabelFilter>
            <Checkbox.Group value={searchParams.typeId} onChange={(value) => handleFilter("typeId", value)}>
              <Row>{renderType}</Row>
            </Checkbox.Group>
            <S.LabelFilter>
              <FaSortAlphaUp /> Sort :
            </S.LabelFilter>
            <Select
              onChange={(value) => handleFilter("priceOrder", value)}
              value={searchParams.priceOrder}
              placeholder="Sort by"
              allowClear
              style={{ width: "100%" }}
            >
              <Select.Option value="asc">Ascending</Select.Option>
              <Select.Option value="desc">Decrease</Select.Option>
            </Select>
            <S.LabelFilter>
              <MdCurrencyExchange /> Price range :
            </S.LabelFilter>
            <Row>
              <Col span={24}>
                <Slider range min={0} max={1999} value={rangeValue} onChange={onChange} />
              </Col>
            </Row>
            {rangeValue[0]}$ - {rangeValue[1]}$
            <S.SidebarButton>
              <Button onClick={handleReset}>Reset</Button>
            </S.SidebarButton>
          </S.SidebarFilterContainer>

          <S.ShowProductWrapper>
            <S.SearchWrapper>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <Link to={ROUTES.USER.HOME}>
                        <Space>
                          <span>Home</span>
                        </Space>
                      </Link>
                    ),
                  },
                  {
                    title: (
                      <Space>
                        <span>Products</span>
                      </Space>
                    ),
                  },
                ]}
                style={{ marginBottom: 8 }}
              />
              <S.HeaderInput
                type="search"
                placeholder="Enter keywords!"
                onChange={(e) => handleFilter("keywords", e.target.value)}
              />
            </S.SearchWrapper>
            <Row gutter={[24, 24]}>{renderProductList}</Row>
            <S.ButtonShowMoreWrapper>
              {productList.data.length < productList.meta.total ? (
                <Button onClick={() => handleShowMore()}>Show More</Button>
              ) : (
                productList.data.length > PRODUCT_LIMIT && (
                  <Button
                    onClick={() =>
                      dispatch(
                        getProductRequest({
                          ...searchParams,
                          page: 1,
                          limit: PRODUCT_LIMIT,
                          more: false,
                        })
                      )
                    }
                  >
                    Collapse
                  </Button>
                )
              )}
            </S.ButtonShowMoreWrapper>
          </S.ShowProductWrapper>
        </S.ProductListContainer>
      </S.ProductListWrapper>
    </ConfigProvider>
  );
}
export default ProductList;
