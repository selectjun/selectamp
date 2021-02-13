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
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;