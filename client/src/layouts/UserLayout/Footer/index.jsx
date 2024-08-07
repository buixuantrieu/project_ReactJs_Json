import React from "react";
import { FooterContainer, FooterContent, FooterLinks, FooterLink, FooterText, FooterCopyright } from "./styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterLinks>
        <FooterText>
          Discover our exquisite collection of diamond jewelry, crafted to perfection for your most precious moments.
        </FooterText>
        <FooterCopyright>&copy; {new Date().getFullYear()} Diamond Jewelry. All rights reserved.</FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
