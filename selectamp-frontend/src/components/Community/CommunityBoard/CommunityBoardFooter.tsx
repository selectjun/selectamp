import { css } from '@emotion/react';
import Pagination from '../../Pagination';

export type CommunityBoardFooterProps = {
  totalCount: number | undefined,
  currentPage: number | undefined,
  countPerPage: number | undefined
};

export default function CommunityBoardFooter({ totalCount, currentPage, countPerPage }: CommunityBoardFooterProps) {
  return (
    <div css={communityBoardFooterStyle}>
      <Pagination
        url={"/community"}
        totalCount={totalCount}
        currentPage={currentPage}
        countPerPage={countPerPage} />
    </div>
  );
  
};

const communityBoardFooterStyle = css`
  margin-top: 1.5rem;
  position: relative;
`;