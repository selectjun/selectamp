export type AppLayoutProps = {
  children: React.ReactNode
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>
};

export type HeaderProps = {
  children: React.ReactNode
};

function Header({ children }: HeaderProps) {
  return <header>{children}</header>
};

export type SideProps = {
  children: React.ReactNode
};

function Side({ children }: SideProps) {
  return <aside>{children}</aside>
};

export type MainProps = {
  children: React.ReactNode
};

function Main({ children }: MainProps) {
  return <main>{children}</main>
};

AppLayout.Header = Header;
AppLayout.Side = Side;
AppLayout.Main = Main;