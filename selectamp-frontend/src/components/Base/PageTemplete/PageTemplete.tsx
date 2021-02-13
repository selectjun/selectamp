import AppLayout from '../../AppLayout';
import Header from '../../Header';
import Side from '../../Side';

export type PageTempleteProps = {
  children: React.ReactNode
};

export default function PageTemplete({ children }: PageTempleteProps) {
  return (
    <AppLayout>
      <AppLayout.Header><Header /></AppLayout.Header>
      <AppLayout.Side><Side /></AppLayout.Side>
      <AppLayout.Main>{children}</AppLayout.Main>
    </AppLayout>
  );
};