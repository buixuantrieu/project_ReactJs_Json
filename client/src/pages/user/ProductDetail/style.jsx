import styled, { css } from "styled-components";

export const ProductDetailWrapper = styled.div`
  padding: 30px 60px;
  background-color: #f5f5f5;
`;
export const ProductDetailContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 24px;
`;
export const ImageProductDetailContainer = styled.div`
  background-color: white;
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  padding: 16px;
`;
export const ImageProduct = styled.div`
  & > img {
    width: 100%;
  }
  position: relative;
  &:hover span {
    opacity: 1;
  }
`;
export const ContentProductDetailContainer = styled.div`
  width: 700px;
  background-color: white;
  padding: 16px;
`;
export const TitleProductDetail = styled.div`
  font-size: 24px;
  font-weight: 500;
`;
export const TitleDesProductDetail = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: gray;
  margin-top: 16px;
  margin-bottom: 16px;
`;
export const DescriptionProductDetail = styled.div`
  text-align: justify;
  max-height: 500px;
  overflow: hidden;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #ffffff5e, #ffffff);
  }
  transition: all 1s;
  ${(prop) =>
    !prop.$showMore &&
    css`
      max-height: max-content;
      height: max-content;

      &::after {
        display: none;
      }
      padding-bottom: 30px;
    `}
`;
export const QuantityContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
  & > span {
    font-size: 14px;
    color: gray;
  }
`;
export const PriceProductDetail = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  & > div > span {
    font-style: italic;
  }
  & > div {
    color: #dba628;
    font-weight: bold;
  }
  & > span {
    font-size: 14px;
    color: gray;
  }
`;
export const ButtonAddToCart = styled.div`
  margin-top: 16px;
`;
export const FavoriteProduct = styled.span`
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0;
  transition: all 0.3s;
`;
export const FormRateProductContainer = styled.div`
  background-color: #f5f5f5;
  padding: 8px 16px;
  margin-top: 12px;
`;
export const BoxRenderReview = styled.div``;
export const BoxReview = styled.div`
  border-bottom: 1px solid #8080804e;
  padding: 16px;
`;
export const ReviewAvatarName = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;
`;
export const ReviewAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #ffd87c;
`;
export const ReviewNameDes = styled.div``;
export const ReviewName = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 2px;
`;
export const ReviewDes = styled.div`
  font-size: 10px;
  color: gray;
  margin-top: 2px;
`;
export const ReviewContent = styled.div`
  margin-top: 12px;
  font-size: 13px;
  margin-left: 53px;
`;
export const TitleRate = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: #dba628;
  margin-top: 16px;
`;
export const ShowStatusReview = styled.div`
  margin: 16px 0;
  color: #930303;
  font-size: 18px;
`;
export const ShowMore = styled.span`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-weight: 500;
  color: #dba628;
  cursor: pointer;
`;
