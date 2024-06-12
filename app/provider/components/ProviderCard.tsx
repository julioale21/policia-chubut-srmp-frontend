"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";

import {
  Person,
  Phone,
  Email,
  LocationOn,
  StickyNote2,
  Link,
} from "@mui/icons-material";

import { Provider } from "../types";

const formatUrl = (url: string) => {
  if (!url) {
    return "";
  }
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const ProviderCard: React.FC<{ provider: Provider }> = ({ provider }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");

  const informationItems = [
    { icon: <Person />, label: "Nombre", value: provider.name },
    {
      icon: <Person />,
      label: "Nombre contacto",
      value: provider.contact_name,
    },
    {
      icon: <Phone />,
      label: "Número de teléfono",
      value: provider.phone_number,
    },
    { icon: <Email />, label: "Email", value: provider.email },
    {
      icon: <LocationOn />,
      label: "Dirección",
      value: provider.address,
    },
    {
      icon: <StickyNote2 />,
      label: "Notas",
      value: provider.notes,
    },
    {
      icon: <Link />,
      label: "Website",
      value: formatUrl(provider.website),
    },
    { icon: <LocationOn />, label: "Ciudad", value: provider.city },
  ];

  const chunkSize = isDesktop ? 4 : informationItems.length;
  const informationChunks = Array.from(
    { length: Math.ceil(informationItems.length / chunkSize) },
    (_, i) => informationItems.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <Card
      className="w-full max-w-xxl"
      sx={{ borderRadius: 3, marginBottom: 2 }}
    >
      <CardHeader
        sx={{ bgcolor: "primary.main", color: "white", borderRadius: 3 }}
        title={
          <Typography variant="h6" fontWeight="bold">
            {provider.name}
          </Typography>
        }
      />
      <CardContent>
        {informationChunks.map((chunk, chunkIndex) => (
          <Grid container spacing={1} key={chunkIndex}>
            {chunk.map((item) => (
              <Grid
                item
                xs={12}
                sm={isDesktop ? 3 : 12}
                key={item.label}
                gap={3}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "primary.light" }}>{item.icon}</Avatar>
                  <Stack mt={2}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export { ProviderCard };
