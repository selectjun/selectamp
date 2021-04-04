import { css } from '@emotion/react';
import CommunityBoardBodyItem from './CommunityBoardBodyItem';

export type CommunityBoardBodyProps = {
  communities?: Array<any>,
  totalCount?: number,
  currentPage?: number,
  countPerPage?: number
};

export default function CommunityBoardBody({ communities, totalCount = 0, currentPage = 1, countPerPage = 20 }: CommunityBoardBodyProps) {
  return (
    <tbody css={communityBoardBodyStyle}>
      {
        communities
        ? communities.map((item, index) => {
          return (
            <CommunityBoardBodyItem
              key={index}
              index={index}
              community={item}
              totalCount={totalCount}
              currentPage={currentPage}
              countPerPage={countPerPage} />
          );
        })
        : <tr className="none"><td colSpan={7}>Data is null.</td></tr>
      }
    </tbody>
  );
};

const communityBoardBodyStyle = css`
  tr {
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: 1px solid #999;
    }
    &:hover {
      background: #eee;
    }
  }

  .none {
    td {
      padding: 1rem;
      text-align: center;
    }
  }
`;
