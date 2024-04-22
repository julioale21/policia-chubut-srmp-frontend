import { Stack } from "@mui/material";
import MenuAppBar from "../common/components/appbar/AppBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function EgressLayout({ children }: LayoutProps) {
  return (
    <section>
      <MenuAppBar />
      <Stack mt={3}></Stack>
      {children}
    </section>
  );
}
