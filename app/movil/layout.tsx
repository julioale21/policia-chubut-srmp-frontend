import { Stack } from "@mui/material";
import { ResponsiveDrawer } from "../common/components/drawers/reponsive_drawer/ResponsiveDrawer";

interface MovilesLayoutProps {
  children: React.ReactNode;
}

export default function MovilesLayout({ children }: MovilesLayoutProps) {
  return (
    <section>
      <ResponsiveDrawer drawerTitle="Policia del Chubut">
        <Stack mt={6}></Stack>
        {children}
      </ResponsiveDrawer>
    </section>
  );
}
