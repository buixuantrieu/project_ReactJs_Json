import React from "react";
import {
  Container,
  HeroSection,
  HeroText,
  ShopButton,
  HeroImage,
  CollectionSection,
  SectionTitle,
  CollectionList,
  CollectionItem,
  CollectionImage,
  CollectionName,
} from "./styles";
import { Col, Row } from "antd";

const HomePage = () => {
  return (
    <Container>
      <HeroSection>
        <HeroText>
          <h1>Exquisite Diamond Jewelry</h1>
          <p>Discover the beauty of luxury with our exclusive collection</p>
          <ShopButton>Shop Now</ShopButton>
        </HeroText>
        <HeroImage src="assets/update-image/1721293108280-DayChuyen-Type.jpg" alt="Diamond Jewelry" />
      </HeroSection>

      <CollectionSection>
        <SectionTitle>Our Collection</SectionTitle>
        <CollectionList>
          <CollectionItem>
            <CollectionImage
              src="https://trangsuc1.mauthemewp.com/wp-content/uploads/2022/09/sp3.jpg"
              alt="Diamond Ring"
            />
            <CollectionName>Diamond Rings</CollectionName>
          </CollectionItem>
          <CollectionItem>
            <CollectionImage
              src="https://trangsuc1.mauthemewp.com/wp-content/uploads/2022/09/sp1.jpg"
              alt="Diamond Necklace"
            />
            <CollectionName>Diamond Necklaces</CollectionName>
          </CollectionItem>
          <CollectionItem>
            <CollectionImage
              src="https://trangsuc1.mauthemewp.com/wp-content/uploads/2022/09/sp2.jpg"
              alt="Diamond Earrings"
            />
            <CollectionName>Diamond Earrings</CollectionName>
          </CollectionItem>
        </CollectionList>
      </CollectionSection>
      <Row>
        <Col span={24}>
          <img
            style={{ width: "100%" }}
            src="https://trangsuc1.mauthemewp.com/wp-content/uploads/2022/09/banner2-1-1-scaled.jpg"
            alt=""
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
