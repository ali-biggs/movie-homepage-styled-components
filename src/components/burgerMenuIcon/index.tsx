import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";

type BurgerMenuIconProps = {
  onClick: () => void;
  isOpen: boolean;
};

export default function BurgerMenuIcon({onClick, isOpen}: BurgerMenuIconProps) {
  return (
    <BurgerMenu onClick={onClick} aria-label="Menu" aria-expanded={isOpen}>
      <BurgerLine />
      <BurgerLine />
      <BurgerLine />
    </BurgerMenu>
  );
}

const BurgerMenu = styled.button`
  background: none;
  border: none;
  padding: 0px;
  width: 30px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

`;

const BurgerLine = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${colors.fontColor};
  border-radius: 2px;
`;
