/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Breadcrumb, Space, InputNumber, ConfigProvider, Button, Form, Rate, Input, notification } from "antd";
import { Link } from "react-router-dom";
import { v4 as uid } from "uuid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";

import { getProductDetailRequest } from "../../../redux/slicers/product.slice";
import { reviewProductRequest, getReviewListRequest } from "../../../redux/slicers/review.slice";
import { addCartRequest, getCartRequest } from "../../../redux/slicers/cart.slice";
import { addFavoriteRequest, unFavoriteRequest, getFavoriteRequest } from "../../../redux/slicers/favorite.slice";

import { ROUTES } from "../../../constants/routes";
import * as S from "./style";
import { b64DecodeUnicode } from "../../../ultils/file";

function ProductDetail() {
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const [quantity, setQuantity] = useState(1);
  const [desContent, setDesContent] = useState("");
  const [showContent, setShowContent] = useState(true);
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);
  const { reviewList } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: id }));
    dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
    dispatch(getReviewListRequest({ productId: id }));
  }, []);

  useEffect(() => {
    if (productDetail && productDetail.des) {
      const decodedDes = b64DecodeUnicode(productDetail.des);
      setDesContent(decodedDes);
    }
  }, [productDetail]);

  const isFavorite = useMemo(
    () =>
      favoriteList.data.filter((item) => {
        return item.userId === userInfo.data.id && item.productId === id;
      }),
    [favoriteList.data, userInfo.data.id, id]
  );
  const handleAddToCart = () => {
    const id_cart = uid();
    if (userInfo.data.id) {
      dispatch(
        addCartRequest({
          data: {
            id: id_cart,
            userId: userInfo.data.id,
            productId: id,
            quantity: quantity,
          },
          callback: () => dispatch(getCartRequest({ data: { useId: userInfo.data.id } })),
        })
      );
    } else {
      notification.warning({ message: "You need to log in to use this feature!" });
    }
  };
  const handleToggleFavorite = () => {
    if (isFavorite?.length !== 0) {
      dispatch(
        unFavoriteRequest({
          id: isFavorite[0].id,
          callback: () => {
            dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
          },
        })
      );
    } else {
      dispatch(
        addFavoriteRequest({
          data: {
            productId: id,
            userId: userInfo.data.id,
          },
          callback: () => {
            dispatch(getFavoriteRequest({ userId: userInfo.data.id }));
          },
        })
      );
    }
  };
  const handleComment = (values) => {
    dispatch(
      reviewProductRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: id,
        },
      })
    );
  };

  const renderFormReview = useMemo(() => {
    if (userInfo.data.id) {
      const isReviewed = reviewList.data.some((item) => item.userId === userInfo.data.id);
      if (isReviewed) {
        return <S.ShowStatusReview>You have already rated this product!</S.ShowStatusReview>;
      } else {
        return (
          <S.FormRateProductContainer>
            <Form layout="vertical" onFinish={handleComment}>
              <Form.Item
                label="Rate star"
                name="rate"
                rules={[
                  { required: true, message: "Rate required" },
                  {
                    min: 1,
                    type: "number",
                    message: "Rate required",
                  },
                ]}
              >
                <Rate style={{ color: "#ffd666" }} />
              </Form.Item>
              <Form.Item label="Comment" name="comment" rules={[{ required: true, message: "Comment required" }]}>
                <Input.TextArea />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </S.FormRateProductContainer>
        );
      }
    }
    return <S.ShowStatusReview>You are not logged in!</S.ShowStatusReview>;
  }, [userInfo.data.id, reviewList.data]);

  const renderReviewList = useMemo(
    () =>
      reviewList.data.map((item, index) => {
        return (
          <S.BoxReview key={index}>
            <S.ReviewAvatarName>
              {item.user.avatar != null ? (
                <S.ReviewAvatar style={{ backgroundImage: `url(${item.user.avatar})` }}></S.ReviewAvatar>
              ) : (
                <S.ReviewAvatar>{item.user.email.substring(0, 1).toUpperCase()}</S.ReviewAvatar>
              )}

              <S.ReviewNameDes>
                {item.user.fullName !== "" ? (
                  <S.ReviewName>{item.user.fullName}</S.ReviewName>
                ) : (
                  <S.ReviewName>{item.user.email}</S.ReviewName>
                )}
                <Rate value={item.rate} disabled style={{ display: "block", fontSize: 10, color: "#ffd666" }} />
                <S.ReviewDes>{dayjs(item.createdAt).fromNow()}</S.ReviewDes>
              </S.ReviewNameDes>
            </S.ReviewAvatarName>
            <S.ReviewContent>{item.comment}</S.ReviewContent>
          </S.BoxReview>
        );
      }),
    [reviewList.data]
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dba628",
          borderRadius: 4,
        },
      }}
    >
      <S.ProductDetailWrapper>
        <S.ProductDetailContainer>
          <S.ImageProductDetailContainer>
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
                    <Link to={ROUTES.USER.PRODUCT_LIST}>
                      <Space>
                        <span>Products</span>
                      </Space>
                    </Link>
                  ),
                },
                {
                  title: (
                    <Space>
                      <span>{productDetail.name}</span>
                    </Space>
                  ),
                },
              ]}
              style={{ marginBottom: 8 }}
            />
            <S.ImageProduct>
              <img src={`/assets/update-image/${productDetail.image}`} alt="" />
              <S.FavoriteProduct onClick={handleToggleFavorite}>
                {isFavorite?.length !== 0 ? <MdOutlineFavorite style={{ color: "red" }} /> : <MdFavoriteBorder />}
              </S.FavoriteProduct>
            </S.ImageProduct>
            <S.TitleRate>Reviews</S.TitleRate>
            {renderFormReview}
            <S.BoxRenderReview>{renderReviewList}</S.BoxRenderReview>
          </S.ImageProductDetailContainer>
          <S.ContentProductDetailContainer>
            <S.TitleProductDetail>{productDetail.name}</S.TitleProductDetail>
            <S.TitleDesProductDetail>
              * Product prices vary depending on the actual weight of the product. Please call 0901927763 for support
            </S.TitleDesProductDetail>
            <S.QuantityContainer>
              <span>Quantity: </span>
              <InputNumber
                style={{ width: 60 }}
                min={1}
                max={99}
                value={quantity}
                onChange={(value) => setQuantity(value)}
              />
            </S.QuantityContainer>
            <S.PriceProductDetail>
              <span>Price: </span>
              <div>
                {(productDetail.price * quantity).toLocaleString()}
                <span> $</span>
              </div>
            </S.PriceProductDetail>
            <S.ButtonAddToCart>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            </S.ButtonAddToCart>
            <S.DescriptionProductDetail $showMore={showContent}>
              {parse(desContent)}
              <S.ShowMore onClick={() => setShowContent(!showContent)}>
                {showContent ? "Show more" : "Collapse"}
              </S.ShowMore>
            </S.DescriptionProductDetail>
          </S.ContentProductDetailContainer>
        </S.ProductDetailContainer>
      </S.ProductDetailWrapper>
    </ConfigProvider>
  );
}
export default ProductDetail;
