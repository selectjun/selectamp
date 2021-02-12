import { css } from '@emotion/react';

export type DashboardProps = {};

export default function Dashboard({}: DashboardProps) {
  return (
    <section css={dashboardStyle}>
      <h2 className="page-title">Dashboard</h2>
      <hr />
    </section>
  );
};

const dashboardStyle = css`
  width: 60rem;
  margin: 4.5rem auto 0;

  .page-title {
    padding-left: 1.25rem;
  }
`;