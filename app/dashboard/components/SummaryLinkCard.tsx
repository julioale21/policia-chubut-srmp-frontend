import React, { ReactElement } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface SummaryLinkCardProps {
  href: string;
  title: string;
  value: number;
  icon?: ReactElement;
}

const SummaryLinkCard: React.FC<SummaryLinkCardProps> = ({
  href,
  title,
  value,
  icon,
}) => {
  return (
    <Link href={href} legacyBehavior>
      <a style={{ textDecoration: "none", color: "inherit" }}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </CardContent>
          {icon &&
            React.cloneElement(icon, {
              sx: { fontSize: 40, color: "action.active", mr: 2 },
            })}
        </Card>
      </a>
    </Link>
  );
};

export { SummaryLinkCard };
