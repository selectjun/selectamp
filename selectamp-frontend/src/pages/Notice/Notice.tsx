import { css } from '@emotion/react';
import PageTemplete from '../../components/Base/PageTemplete';

export type NoticeProps = {};

export default function Notice({}: NoticeProps) {
  return (
    <PageTemplete>
      <section css={noticeStyle}>
        <h2 className="page-title">Notice</h2>
        <hr />
      </section>
    </PageTemplete>
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