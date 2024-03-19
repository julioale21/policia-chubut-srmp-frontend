import { Stack, Typography } from "@mui/material";

interface CardTechnicalItemProps {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
  textColor?: string;
}

const CardTechnicalItem: React.FC<CardTechnicalItemProps> = ({
  icon,
  title,
  value,
  textColor,
}) => {
  return (
    <Stack direction="row" gap={2}>
      {icon}
      <Typography color={textColor} fontWeight="bold" display="inline">
        {title}:
      </Typography>
      <Typography
        display="initial"
        component="span"
        fontWeight="light"
        fontStyle="italic"
      >
        {value}
      </Typography>
    </Stack>
  );
};

export { CardTechnicalItem };
