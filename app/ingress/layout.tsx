import { Stack } from "@mui/material";
import MenuAppBar from "../common/components/appbar/AppBar";

interface IngressLayoutProps {
  children: React.ReactNode;
}

export default function IngressLayout({ children }: IngressLayoutProps) {
  return (
    <section>
      <MenuAppBar />
      <Stack mt={3}></Stack>
      {children}
    </section>
  );
}
