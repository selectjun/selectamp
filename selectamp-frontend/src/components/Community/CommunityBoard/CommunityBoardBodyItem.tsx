import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

export type CommunityKindsCode = {
  name: string,
  description: string
};

export type CommunityType = {
  id: number,
  communityKindsCode: CommunityKindsCode,
  title: string,
  userId: string,
  createAt: Date,
  viewCount: number,
  commentCount: number
};

export type CommunityBoardBodyItemProps = {
  index: number,
  community: CommunityType,
  totalCount?: number,
  currentPage?: number,
  countPerPage?: number
};

export default function CommunityBoardBodyItem({ index, community, totalCount = 0, currentPage = 1, countPerPage = 10 }: CommunityBoardBodyItemProps) {
  return (
    <tr css={communityBoardBodyItemStyle}>
      <td>{(totalCount - (countPerPage * (currentPage - 1))) - index}</td>
      <td>{community.communityKindsCode.description}</td>
      <td>
        <Link to={`/community/${community.id}`}>{community.title}</Link>
        { community.commentCount ? <span className="comment-count">({community.commentCount})</span> : null }
      </td>
      <td>{community.userId}</td>
      <td>{dateFormat(new Date(community.createAt), "yyyy-mm-dd HH:MM:ss")}</td>
      <td>{community.viewCount}</td>
    </tr>
  );
};

const communityBoardBodyItemStyle = css`
  td {
    padding: 1rem;
    text-align: center;

    span.comment-count {
      margin-left: 0.5rem;
      font-size: 0.925rem;
    }
  }
`;