import { css } from '@emotion/react';

export type CommunityBoardHeadProps = {};

export default function CommunityBoardHead({}: CommunityBoardHeadProps) {
  return (
    <thead css={communityBoardHeadStyle}>
      <tr>
        <th>No.</th>
        <th>분류</th>
        <th>제목</th>
        <th>등록자</th>
        <th>생성일시</th>
        <th>조회수</th>
      </tr>
    </thead>
  );
};

const communityBoardHeadStyle = css`
  &, tr, th {
    border-bottom: 1px solid #999;
  }

  tr > th {
    padding: 1rem 1rem;
  }
`;