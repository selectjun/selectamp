import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

export type CommunityType = {
  id: number,
  communityKindsCodeName: string,
  title: string,
  userId: string,
  createAt: Date,
  viewCount: number
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
      <td>{community.communityKindsCodeName}</td>
      <td><Link to={`/community/${community.id}`}>{community.title}</Link></td>
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
  }
`;