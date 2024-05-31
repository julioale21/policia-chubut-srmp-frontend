import { Stack } from "@mui/material";
import { ResponsiveDrawer } from "../common/components/drawers/reponsive_drawer/ResponsiveDrawer";

interface SparePartOrderLayoutProps {
  children: React.ReactNode;
}

export default function SparePartOrderLayout({
  children,
}: SparePartOrderLayoutProps) {
  return (
    <section>
      <ResponsiveDrawer drawerTitle="Policia del Chubut">
        <Stack mt={6}></Stack>
        {children}
      </ResponsiveDrawer>
    </section>
  );
}
