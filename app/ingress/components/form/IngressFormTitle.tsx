import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface IngressFormTitleProps {
  component?: React.ElementType;
  fontWeight?: TypographyProps["fontWeight"];
  size?: TypographyProps["fontSize"];
  color?: TypographyProps["color"];
  textAlign?: TypographyProps["textAlign"];
  text: string;
}

const IngressFormTitle: React.FC<IngressFormTitleProps> = ({
  component = "h3",
  fontWeight = "bold",
  size = [24, 48],
  color = "primary",
  textAlign = "center",
  text,
}) => {
  return (
    <Typography
      textAlign={textAlign}
      color={color}
      component={component}
      fontWeight={fontWeight}
      mx={textAlign === "center" ? "auto" : undefined}
      fontSize={size}
    >
      {text}
    </Typography>
  );
};

export { IngressFormTitle };
