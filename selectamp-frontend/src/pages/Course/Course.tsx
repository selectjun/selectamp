import { css } from '@emotion/react';

export type CourseProps = {};

export default function Course({}: CourseProps) {
  return (
    <section css={courseStyle}>
      <h2 className="page-title">Course</h2>
      <hr />
    </section>
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