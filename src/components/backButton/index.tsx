import React from "react";
import styled from "styled-components";

type BackButtonProps = {
  onClick: () => void;
};

export default function BackButton({ onClick }: Readonly<BackButtonProps>) {
  return (
    <ButtonContainer onClick={onClick} aria-label="Close menu">
      <Chevron />
      <Chevron />
      <Chevron />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  background: none;
  border: none;
  padding: 0px;
  cursor: pointer;
  width: 30px;
  height: 24px;
  display: flex;
  align-items: center;
`;

const Chevron = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 12px solid #fff;
  margin-bottom: 4px;
  transform: rotate(90deg);
`;
