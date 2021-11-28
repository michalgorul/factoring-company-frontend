import React from "react";
import styled from "styled-components";

import LogoImg from "../../images/logos/Factoring Company-logos_white.png";

const BrandLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.div`
  width: ${({size}) => (size ? size + "px" : "3em")};
  height: ${({size}) => (size ? size + "px" : "3em")};

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoTitle = styled.h2`
  font-size: ${({size}) => (size ? size + "px" : "42px")};
  color: ${({color}) => (color ? color : "#fff")};
  font-weight: 700;
  margin: 0 0 0 12px;
`;


export function BrandLogo(props) {
    const {logoSize, textSize, color} = props;

    return (
        <BrandLogoContainer>
            <LogoImage size={logoSize}>
                <img src={LogoImg} alt="Factoring logo"/>
            </LogoImage>
            <LogoTitle size={textSize} color={color}>
                Factoring Company
            </LogoTitle>
        </BrandLogoContainer>
    );
}