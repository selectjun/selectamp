import { css } from '@emotion/react';
import PageTemplete from '../../components/Base/PageTemplete';

export type GuideProps = {};

export default function Guide({}: GuideProps) {
  return (
    <PageTemplete>
      <section css={guideStyle}>
        <h2 className="page-title">Guide</h2>
        <hr />
      </section>
    </PageTemplete>
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