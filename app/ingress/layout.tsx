import { Stack } from "@mui/material";
import { ResponsiveDrawer } from "../common/components/drawers/reponsive_drawer/ResponsiveDrawer";

interface IngressLayoutProps {
  children: React.ReactNode;
}

export default function IngressLayout({ children }: IngressLayoutProps) {
  return (
    <section>
      <ResponsiveDrawer drawerTitle="Policia del Chubut">
        <Stack mt={6}></Stack>
        {children}
      </ResponsiveDrawer>
    </section>
  );
}
