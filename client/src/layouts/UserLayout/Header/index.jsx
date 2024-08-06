import { useEffect } from "react";
import { Carousel, Badge, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaShoppingCart, FaRegUser } from "react-icons/fa";
import { ImProfile, ImHistory } from "react-icons/im";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";
import { CiLogout, CiLogin } from "react-icons/ci";

import { getCartRequest } from "../../../redux/slicers/cart.slice";
import { logoutRequest } from "../../../redux/slicers/auth.slice";
import { ROUTES } from "../../../constants/routes";
import * as S from "./styles";

function Header() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(
        getCartRequest({
          data: {
            userId: userInfo.data.id,
          },
        })
      );
    }
  }, [dispatch, userInfo.data]);

  const items = userInfo.data.id
    ? [
        {
          key: "1",
          label: <Link to={ROUTES.USER.PROFILE}>Profile</Link>,
          icon: <ImProfile />,
        },
        {
          key: "2",
          label: "Change Password",
          icon: <TbPasswordFingerprint />,
        },
        {
          key: "3",
          label: "Purchase history",
          icon: <ImHistory />,
        },
        {
          key: "4",
          label: "Favorite product",
          icon: <GrFavorite />,
        },
        {
          key: "5",
          label: "Log out",
          icon: <CiLogout />,
          onClick: () => {
            dispatch(logoutRequest());
            dispatch(
              getCartRequest({
                data: {
                  userId: 0,
                },
              })
            );
          },
        },
      ]
    : [
        {
          key: "7",
          label: <Link to={ROUTES.LOGIN}>Log in</Link>,
          icon: <CiLogin />,
        },
      ];

  return (
    <>
      <S.HeaderTitleIntro>
        <Carousel autoplay autoplaySpeed={3000}>
          <div>
            <S.HeaderContentIntro>Free delivery nationwide</S.HeaderContentIntro>
            <S.HeaderDesIntro>for every order</S.HeaderDesIntro>
          </div>
          <div>
            <S.HeaderContentIntro>Exclusive sponsorship of 100% installment conversion fee</S.HeaderContentIntro>
            <S.HeaderDesIntro>when buying diamonds and jewelry</S.HeaderDesIntro>
          </div>
          <div>
            <S.HeaderContentIntro>Free cleaning of branded bags</S.HeaderContentIntro>
            <S.HeaderDesIntro>at Spring Tide Da Nang</S.HeaderDesIntro>
          </div>
          <div>
            <S.HeaderContentIntro>Check Entrupy is the same price of 23$</S.HeaderContentIntro>
            <S.HeaderDesIntro>at Spring Tide Da Nang</S.HeaderDesIntro>
          </div>
        </Carousel>
      </S.HeaderTitleIntro>
      <S.HeaderContainer>
        <S.HeaderNavLeft>
          <S.HeaderNavElement to={ROUTES.USER.HOME}>Home</S.HeaderNavElement>
          <S.HeaderNavElement to={ROUTES.USER.PRODUCT_LIST}>Diamond Jewelry</S.HeaderNavElement>
          <S.HeaderNavElement>Collection</S.HeaderNavElement>
        </S.HeaderNavLeft>
        <S.HeaderLogo>
          <img style={{ width: "100%" }} src="/assets/image/Logo-Diamond-SpringTide.png" alt="Logo" />
        </S.HeaderLogo>
        <S.HeaderNavRight>
          <S.HeaderNavElement>Blog Jewelry</S.HeaderNavElement>
          <S.HeaderNavElement>Contact</S.HeaderNavElement>
          <S.CartUserContainer>
            <Badge count={cartList.data.length} showZero>
              <S.CartUserIcons to={ROUTES.USER.CART}>
                <FaShoppingCart style={{ fontSize: 24 }} />
              </S.CartUserIcons>
            </Badge>
            <S.UserName>{userInfo.data.fullName}</S.UserName>
            <S.CartUserIcons>
              <Dropdown
                menu={{
                  items: items,
                }}
                allow
              >
                {userInfo.data.id ? (
                  userInfo.data.avatar !== null ? (
                    <S.Avatar style={{ backgroundImage: `url(${userInfo.data.avatar})` }}></S.Avatar>
                  ) : (
                    <S.Avatar style={{ background: "#ffd486" }}>
                      {userInfo.data.email.substring(0, 1).toUpperCase()}
                    </S.Avatar>
                  )
                ) : (
                  <FaRegUser />
                )}
              </Dropdown>
            </S.CartUserIcons>
          </S.CartUserContainer>
        </S.HeaderNavRight>
      </S.HeaderContainer>
    </>
  );
}
export default Header;
