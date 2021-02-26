import { useEffect } from 'react';
import { useHistory } from 'react-router';
import AppLayout from '../../AppLayout';
import Header from '../../Header';
import Side from '../../Side';

export type PageTempleteProps = {
  children: React.ReactNode
};

export default function PageTemplete({ children }: PageTempleteProps) {
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem("xAuthToken")) {
      history.push("/login");
    }
  }, []);

  return (
    sessionStorage.getItem("xAuthToken")
    ? <AppLayout>
      <AppLayout.Header><Header /></AppLayout.Header>
      <AppLayout.Side><Side /></AppLayout.Side>
      <AppLayout.Main>{children}</AppLayout.Main>
    </AppLayout>
    : null
  );
};