import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  color: #fff;
  padding: 6px 1em;
  font-size: ${({size}) => (size ? size + "px" : "18px")};
  font-weight: 600;
  border-radius: 20px;
  background-color: #0d6efd;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  margin-left: ${({marginLeft}) => (marginLeft ? marginLeft + "px" : "175px")};;

  &:hover {
    background-color: #0c5ace;
  }

  &:focus {
    outline: none;
  }
`;

export function Button(props) {
    const {size, marginLeft} = props;

    return (
        <ButtonWrapper size={size} marginLeft={marginLeft} className={props.className}>
            {props.children}
        </ButtonWrapper>
    );
}