import React, { useState } from "react";
import styled from "styled-components";

type CheckBoxProps = {
  label: string;
  id: number | string;
};

export default function CheckBox({ label, id }: CheckBoxProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <CheckboxCont>
      <Input
        value={id}
        checked={checked}
        onChange={handleCheckboxChange}
        aria-checked={checked}
      />
      <LabelText htmlFor={`${label}`}>{label}</LabelText>
    </CheckboxCont>
  );
}

const CheckboxCont = styled.span`
  position: relative;
  align-items: center;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  width: 15px;
  height: 15px;
  position: relative;
  appearance: none;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #fff;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 4px;
    width: 4px;
    height: 8px;
    border: solid black;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
  }
`;

const LabelText = styled.label`
  font-weight: 300;
`;
