import React from "react";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";

import PoliciaLogo from "../public/assets/policia.svg";
import { SignInButton } from "./home/components";

export default async function Home() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Typography component="h1" className="text-6xl text-red-500">
        Policia del Chubut
      </Typography>
      <Typography fontSize={20} fontWeight={500}>
        Sistema de registro de moviles Policiales
      </Typography>
      <Typography fontSize={16} fontWeight={400}>
        Area transportes
      </Typography>
      <Image src={PoliciaLogo} alt="Policia del Chubut" />

      <Stack mt={3}>
        <SignInButton />
      </Stack>
    </Stack>
  );
}
