import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: white;
  color: black;
  padding: 40px 0;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterLinks = styled.div`
  margin-bottom: 20px;
`;

export const FooterLink = styled.a`
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: #b37feb;
  }
`;

export const FooterText = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.6;
`;

export const FooterCopyright = styled.div`
  font-size: 14px;
  color: #888;
`;
