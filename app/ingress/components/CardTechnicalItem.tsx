import { Stack, Typography } from "@mui/material";

interface CardTechnicalItemProps {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
  textColor?: string;
  titleSize?: string | number;
  fontSize?: string | number;
}

const CardTechnicalItem: React.FC<CardTechnicalItemProps> = ({
  icon,
  title,
  value,
  textColor,
  titleSize = 18,
  fontSize = 16,
}) => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      {icon}
      <Typography
        color={textColor}
        fontWeight="bold"
        display="inline"
        fontSize={titleSize}
      >
        {title}:
      </Typography>
      <Typography
        display="initial"
        component="span"
        fontWeight="light"
        fontStyle="italic"
        fontSize={fontSize}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export { CardTechnicalItem };
