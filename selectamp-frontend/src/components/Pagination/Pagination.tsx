import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import PaginationItem from './PaginationItem';

export type PaginationProps = {
  url: string,
  totalCount: number,
  currentPage: number,
  countPerPage: number,
  numberOfPagination?: number
};

export default function Pagination({ url, totalCount, currentPage, countPerPage, numberOfPagination = 10 }: PaginationProps) {
  const firstPageNumber: number = 1;
  const prevPageNumber: number = Math.floor(currentPage / numberOfPagination) - 1 < 0 ? 1 : (Math.floor(currentPage / numberOfPagination) - 1)  * 10 + 1;
  const startPageNumber: number = currentPage % numberOfPagination === 0 ? (Math.floor(currentPage / numberOfPagination) - 1) * 10 + 1 : Math.floor(currentPage / numberOfPagination) * 10 + 1;
  const endPageNumber: number = startPageNumber + numberOfPagination - 1 > Math.floor(totalCount / countPerPage) ? Math.floor(totalCount / countPerPage) : startPageNumber + numberOfPagination - 1;
  const nextPageNumber: number = startPageNumber + numberOfPagination > Math.floor(totalCount / countPerPage) ? Math.floor(totalCount / countPerPage) : startPageNumber + numberOfPagination
  const lastPageNumber: number = Math.floor(totalCount / countPerPage);
  const pageNumberItems: Array<number> = [];

  console.log(endPageNumber);
  for (let page = startPageNumber; page <= endPageNumber; page++) { pageNumberItems.push(page); };

  return (
    pageNumberItems.length
    ? <div css={PaginationStyle}>
      <ul>
        <li><Link to={`${url}?page=${firstPageNumber}`}>&lt;&lt;</Link></li>
        <li><Link to={`${url}?page=${prevPageNumber}`}>&lt;</Link></li>
        {
          pageNumberItems.map((item, index) => <PaginationItem key={index} url={url} paginationNumber={item} isActive={item === currentPage} />)
        }
        <li><Link to={`${url}?page=${nextPageNumber}`}>&gt;</Link></li>
        <li><Link to={`${url}?page=${lastPageNumber}`}>&gt;&gt;</Link></li>
      </ul>
    </div>
    : null
  );
};

const PaginationStyle = css`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;

    li {
      display: inline-block;
      padding: 0.5rem;

      &.active a {
        color: red;
      }
    }
  }
`;