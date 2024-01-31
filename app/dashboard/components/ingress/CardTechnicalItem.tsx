import { Stack, Typography } from "@mui/material";

interface CardTechnicalItemProps {
  icon?: React.ReactNode;
  title?: string;
  value?: string;
}

const CardTechnicalItem: React.FC<CardTechnicalItemProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <Stack direction="row" gap={2}>
      {icon}
      <Typography fontWeight="bold" display="inline">
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
