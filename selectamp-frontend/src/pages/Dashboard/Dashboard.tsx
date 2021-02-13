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
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;