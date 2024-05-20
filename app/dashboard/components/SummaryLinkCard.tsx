import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

interface SummaryLinkCardProps {
  href: string;
  title: string;
  value: number;
  icon?: React.ReactElement;
}

const SummaryLinkCard: React.FC<SummaryLinkCardProps> = ({
  href,
  title,
  value,
  icon,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.5 },
    }));
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setDisplayValue(current);
      if (current >= value) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [value, controls]);

  return (
    <Link href={href} legacyBehavior>
      <a style={{ textDecoration: "none", color: "inherit" }}>
        <Card sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <motion.div custom={0} animate={controls}>
              <Typography variant="h5">
                {displayValue.toLocaleString()}
              </Typography>
            </motion.div>
          </CardContent>
          {icon}
        </Card>
      </a>
    </Link>
  );
};

export { SummaryLinkCard };
