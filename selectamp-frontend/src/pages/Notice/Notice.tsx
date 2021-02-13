import { css } from '@emotion/react';

export type NoticeProps = {};

export default function Notice({}: NoticeProps) {
  return (
    <section css={noticeStyle}>
      <h2 className="page-title">Notice</h2>
      <hr />
    </section>
  );
};

const noticeStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;