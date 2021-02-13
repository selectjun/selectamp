import { css } from '@emotion/react';
import PageTemplete from '../../components/Base/PageTemplete';

export type CourseProps = {};

export default function Course({}: CourseProps) {
  return (
    <PageTemplete>
      <section css={courseStyle}>
        <h2 className="page-title">Course</h2>
        <hr />
      </section>
    </PageTemplete>
  );
};

const courseStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;