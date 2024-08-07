import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background-color: #f1f1f1;
`;

export const HeroText = styled.div`
  max-width: 50%;
  h1 {
    font-size: 48px;
    color: #333;
  }
  p {
    font-size: 18px;
    color: #555;
  }
`;

export const ShopButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #555;
  }
`;

export const HeroImage = styled.img`
  width: 40%;
  border-radius: 10px;
`;

export const CollectionSection = styled.section`
  padding: 50px 0;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  color: #333;
  margin-bottom: 40px;
`;

export const CollectionList = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const CollectionItem = styled.div`
  width: 30%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CollectionImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const CollectionName = styled.h3`
  margin-top: 20px;
  font-size: 24px;
  color: #333;
`;
