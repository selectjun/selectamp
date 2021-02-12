import { css } from '@emotion/react';

export type PamphletProps = {};

export default function Pamphlet({}: PamphletProps) {
  return (
    <section css={pamphletStyle}>
      <h2 className="page-title">Pamphlet</h2>
      <hr />
    </section>
  );
};

const pamphletStyle = css`
  width: 60rem;
  margin: 4.5rem auto 0;

  .page-title {
    padding-left: 1.25rem;
  }
`;