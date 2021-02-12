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
  margin: 4.5rem auto 0;

  .page-title {
    padding-left: 1.25rem;
  }
`;