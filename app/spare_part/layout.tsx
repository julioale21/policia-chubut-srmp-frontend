import { Stack } from "@mui/material";
import { ResponsiveDrawer } from "../common/components/drawers/reponsive_drawer/ResponsiveDrawer";

interface SparePartLayoutProps {
  children: React.ReactNode;
}

export default function SparePartLayout({ children }: SparePartLayoutProps) {
  return (
    <section>
      <ResponsiveDrawer drawerTitle="Policia del Chubut">
        <Stack mt={6}></Stack>
        {children}
      </ResponsiveDrawer>
    </section>
  );
}
