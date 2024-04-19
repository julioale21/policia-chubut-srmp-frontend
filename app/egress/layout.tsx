import { Stack } from "@mui/material";
import MenuAppBar from "../common/components/appbar/AppBar";

interface EgressLayoutProps {
  children: React.ReactNode;
}

export default function EgressLayout({ children }: EgressLayoutProps) {
  return (
    <section>
      <MenuAppBar />
      <Stack mt={3}></Stack>
      {children}
    </section>
  );
}
