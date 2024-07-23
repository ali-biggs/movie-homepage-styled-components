import React, { useState } from "react";
import styled from "styled-components";
import * as colors from "../../colors";

type CheckBoxProps = {
  label: string;
  id: number | string;
};

export default function CheckBox({ label, id }: Readonly<CheckBoxProps>) {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <CheckboxCont>
      <Input
        value={`${id}`}
        checked={checked}
        onChange={handleCheckboxChange}
        aria-checked={checked}
      />
      <LabelText htmlFor={`${id}`} onClick={handleCheckboxChange}>
        {label}
      </LabelText>
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
  width: 24px;
  height: 24px;
  position: relative;
  appearance: none;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${colors.primaryColor};
    border: 1px solid;
    border-color:${colors.primaryColor};
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 2%;
    left: 25%;
    width: 10px;
    height: 16px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const LabelText = styled.label`
  font-weight: 300;
  cursor: pointer;
`;
