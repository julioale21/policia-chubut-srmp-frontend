import React from "react";
import { Card, CardContent, Typography, Grid, Box, Paper } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WebIcon from "@mui/icons-material/Web";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NoteIcon from "@mui/icons-material/Note";
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
  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {provider.name}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <PersonIcon color="primary" />
              <Typography sx={{ ml: 1 }}>{provider.contact_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <PhoneIcon color="primary" />
              <Typography sx={{ ml: 1 }}>{provider.phone_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <EmailIcon color="primary" />
              <Typography sx={{ ml: 1 }}>{provider.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <WebIcon color="primary" />
              <a
                href={formatUrl(provider.website)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 8,
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Website: {formatUrl(provider.website)}
              </a>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <HomeIcon color="primary" />
              <Typography sx={{ ml: 1 }}>
                {provider.address}, {provider.city}
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <NoteIcon color="primary" />
              <Typography sx={{ ml: 1 }}>{provider.notes}</Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export { ProviderCard };
