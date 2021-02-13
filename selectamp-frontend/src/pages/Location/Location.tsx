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
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;