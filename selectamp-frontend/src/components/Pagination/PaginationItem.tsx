import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

export type PaginationItemProps = {
  url: string,
  paginationNumber: number,
  isActive: boolean,
  onHandleMoveScrollPageTop: (e: React.MouseEvent<HTMLElement>) => void
};

export default function PaginationItem({ url, paginationNumber, isActive, onHandleMoveScrollPageTop }: PaginationItemProps) {
  return (
    <li className={isActive ? "active" : ""} css={paginationItemStyle} onClick={onHandleMoveScrollPageTop}>
      <Link to={`${url}?page=${paginationNumber}`}>{paginationNumber}</Link>
    </li>
  );
};

const paginationItemStyle = css`
  a {
  }
`;