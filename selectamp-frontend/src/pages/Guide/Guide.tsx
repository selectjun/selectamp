import { css } from '@emotion/react';

export type GuideProps = {};

export default function Guide({}: GuideProps) {
  return (
    <section css={guideStyle}>
      <h2 className="page-title">Guide</h2>
      <hr />
    </section>
  );
};

const guideStyle = css`
  width: 60rem;
  margin: 4.5rem auto 0;

  .page-title {
    padding-left: 1.25rem;
  }
`;