import { css } from '@emotion/react';
import CommunityBoardFooter from './CommunityBoardFooter';

export type CommunityBoardProps = {
  totalCount: number | undefined,
  currentPage: number | undefined,
  countPerPage: number | undefined,
  children: React.ReactNode
};

export default function CommunityBoard({ totalCount, currentPage, countPerPage, children }: CommunityBoardProps) {
  return (
    <article>
      <table css={communityBoardStyle}>{children}</table>
      <CommunityBoardFooter
        totalCount={totalCount}
        currentPage={currentPage}
        countPerPage={countPerPage} />
    </article>
  );
};

const communityBoardStyle = css`
  width: 100%;
  margin-top: 1.5rem;
  
  &, thead, tbody, tr, th, td {
    border-collapse: collapse;
  }
`;