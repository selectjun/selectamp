import { css } from '@emotion/react';
import PageTemplete from '../../components/Base/PageTemplete';

export type DashboardProps = {};

export default function Dashboard({}: DashboardProps) {
  return (
    <PageTemplete>
      <section css={dashboardStyle}>
        <h2 className="page-title">Dashboard</h2>
        <hr />
      </section>
    </PageTemplete>
  );
};

const dashboardStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;