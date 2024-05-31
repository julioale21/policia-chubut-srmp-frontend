import { Stack } from "@mui/material";
import { ResponsiveDrawer } from "../common/components/drawers/reponsive_drawer/ResponsiveDrawer";

interface ProviderLayoutProps {
  children: React.ReactNode;
}

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  return (
    <section>
      <ResponsiveDrawer drawerTitle="Policia del Chubut">
        <Stack mt={6}></Stack>
        {children}
      </ResponsiveDrawer>
    </section>
  );
}
