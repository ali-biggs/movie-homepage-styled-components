import React from "react";
import styled from "styled-components";

export const applyLastLineFade = (text: string) => {
  const words = text.split(" ");
  let lines = [];
  let currentLine = "";

  // Create a temporary div to measure text
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = "300px";
  document.body.appendChild(tempDiv);

  const doesLineFit = (line: any) => {
    tempDiv.innerHTML = line;
    return tempDiv.offsetWidth <= 300;
  };

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (doesLineFit(testLine)) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  document.body.removeChild(tempDiv);

  if (lines.length > 1) {
    const lastLine = lines.pop();
    return (
      <>
        {lines.join(" ")} <LastLineFade>{lastLine}</LastLineFade>
      </>
    );
  }
  return <LastLineFade>{text}</LastLineFade>;
};

const LastLineFade = styled.span`
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
