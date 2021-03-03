import { Link } from 'react-router-dom';

export type PaginationItemProps = {
  url: string,
  paginationNumber: number,
  isActive: boolean
};

export default function PaginationItem({ url, paginationNumber, isActive }: PaginationItemProps) {
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={`${url}?page=${paginationNumber}`}>{paginationNumber}</Link>
    </li>
  );
};