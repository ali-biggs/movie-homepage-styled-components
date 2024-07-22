import React, { useState } from "react";
import styled from "styled-components";
import * as colors from "../../colors";
import Discover from "../../pages/discover";

type ErrorModalProps = {
  errors: string[];
  isOpen: boolean;
  onClose: () => void;
};

export default function ErrorModal({
  errors,
  isOpen,
  onClose,
}: Readonly<ErrorModalProps>) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper>
        <Title>Errors</Title>
        {errors.map((error, index) => {
          return (
            <div key={index}>
              <Message>{error}</Message>
            </div>
          );
        })}

        <CloseButton onClick={onClose} role="close-button">Close</CloseButton>
      </ModalWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 300px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  color: #d32f2f;
`;

const Message = styled.p`
  margin: 0 0 20px 0;
  color: ${colors.fontColor};
`;

const CloseButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b71c1c;
  }
`;
