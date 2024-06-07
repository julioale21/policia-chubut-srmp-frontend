// import React from "react";
// import { Card, CardContent, Typography, Grid, Box, Paper } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import WebIcon from "@mui/icons-material/Web";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import NoteIcon from "@mui/icons-material/Note";
// import { Provider } from "../types";

// const formatUrl = (url: string) => {
//   if (!url) {
//     return "";
//   }
//   if (!/^https?:\/\//i.test(url)) {
//     return `https://${url}`;
//   }
//   return url;
// };

// const ProviderCard: React.FC<{ provider: Provider }> = ({ provider }) => {
//   return (
//     <Card elevation={3} sx={{ borderRadius: 2 }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" mb={1}>
//           {provider.name}
//         </Typography>
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container spacing={1.5}>
//             <Grid item xs={12} sm={6} display="flex" alignItems="center">
//               <PersonIcon color="primary" />
//               <Typography sx={{ ml: 1 }}>{provider.contact_name}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} display="flex" alignItems="center">
//               <PhoneIcon color="primary" />
//               <Typography sx={{ ml: 1 }}>{provider.phone_number}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} display="flex" alignItems="center">
//               <EmailIcon color="primary" />
//               <Typography sx={{ ml: 1 }}>{provider.email}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} display="flex" alignItems="center">
//               <WebIcon color="primary" />
//               <a
//                 href={formatUrl(provider.website)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   marginLeft: 8,
//                   textDecoration: "none",
//                   color: "inherit",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 Website: {formatUrl(provider.website)}
//               </a>
//             </Grid>
//             <Grid item xs={12} display="flex" alignItems="center">
//               <HomeIcon color="primary" />
//               <Typography sx={{ ml: 1 }}>
//                 {provider.address}, {provider.city}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} display="flex" alignItems="center">
//               <NoteIcon color="primary" />
//               <Typography sx={{ ml: 1 }}>{provider.notes}</Typography>
//             </Grid>
//           </Grid>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export { ProviderCard };

import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Stack,
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
  return (
    <Card className="w-full max-w-xl" sx={{ borderRadius: 3 }}>
      <CardHeader
        sx={{ bgcolor: "primary.main", color: "white", borderRadius: 3 }}
        title={
          <Typography variant="h6" fontWeight="bold">
            Provider Information
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          {[
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
          ].map((item) => (
            <Grid item xs={12} sm={6} key={item.label} gap={2}>
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "primary.light" }}>{item.icon}</Avatar>
                <Stack>
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
      </CardContent>
    </Card>
  );
};

export { ProviderCard };
