import { css } from '@emotion/react';

export type AppLayoutProps = {
  children: React.ReactNode
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div css={appLayoutStyle}>{children}</div>
};

export type HeaderProps = {
  children: React.ReactNode
};

function Header({ children }: HeaderProps) {
  return <header css={headerStyle}>{children}</header>
};

export type SideProps = {
  children: React.ReactNode
};

function Side({ children }: SideProps) {
  return <aside css={sideStyle}>{children}</aside>
};

export type MainProps = {
  children: React.ReactNode
};

function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>
};

AppLayout.Header = Header;
AppLayout.Side = Side;
AppLayout.Main = Main;

const appLayoutStyle = css`
  width: 100%;
  height: 100%;
`;

const headerStyle = css`
  width: 100%;
  height: 4.5rem;
  background: #005CB2;
  position: fixed;
  top: 0;
  left: 0;
`;

const sideStyle = css`
  width: 15rem;
  height: calc(100% - 4.5rem);
  position: fixed;
  left: 0;
  top: 4.5rem;
`;

const mainStyle = css`
  width: calc(100% - 15rem);
  margin-top: 4.5rem;
  margin-left: 15rem;
`;