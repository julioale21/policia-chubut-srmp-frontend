import MenuAppBar from "../components/appbar/AppBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <section>
      <MenuAppBar />
      {children}
    </section>
  );
}
