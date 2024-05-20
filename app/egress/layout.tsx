import { ResponsiveDrawer } from "../common/components/drawers/reponsive_drawer/ResponsiveDrawer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function EgressLayout({ children }: DashboardLayoutProps) {
  return (
    <section>
      <ResponsiveDrawer drawerTitle="Policia del Chubut">
        {children}
      </ResponsiveDrawer>
    </section>
  );
}
