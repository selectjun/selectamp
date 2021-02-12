import { css } from '@emotion/react';

export type LocationProps = {};

export default function Location({}: LocationProps) {
  return (
    <section css={locationStyle}>
      <h2 className="page-title">Location</h2>
      <hr />
    </section>
  );
};

const locationStyle = css`
  width: 60rem;
  margin: 4.5rem auto 0;

  .page-title {
    padding-left: 1.25rem;
  }
`;