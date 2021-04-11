import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import PaginationItem from './PaginationItem';
import Icon from '../Icon';

export type PaginationProps = {
  url: string,
  totalCount?: number,
  currentPage?: number,
  countPerPage?: number,
  numberOfPagination?: number
};

export default function Pagination({ url, totalCount = 0, currentPage = 1, countPerPage = 10, numberOfPagination = 10 }: PaginationProps) {
  const firstPageNumber: number = 1;
  const prevPageNumber: number = Math.floor(currentPage / numberOfPagination) - 1 < 0 ? 1 : (Math.floor(currentPage / numberOfPagination) - 1)  * 10 + 1;
  const startPageNumber: number = currentPage % numberOfPagination === 0 ? (Math.floor(currentPage / numberOfPagination) - 1) * 10 + 1 : Math.floor(currentPage / numberOfPagination) * 10 + 1;
  const endPageNumber: number = startPageNumber + numberOfPagination - 1 > Math.floor(totalCount / countPerPage) ? Math.floor(totalCount / countPerPage) : startPageNumber + numberOfPagination - 1;
  const nextPageNumber: number = startPageNumber + numberOfPagination > Math.floor(totalCount / countPerPage) ? Math.floor(totalCount / countPerPage) : startPageNumber + numberOfPagination
  const lastPageNumber: number = Math.floor(totalCount / countPerPage);
  const pageNumberItems: Array<number> = [];

  for (let page = startPageNumber; page <= endPageNumber; page++) { pageNumberItems.push(page); };

  const handleMoveScrollPageTop = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A")  window.scrollTo(0, 0);
  }

  return (
    pageNumberItems.length
    ? <div css={PaginationStyle}>
      <ul>
        <li onClick={handleMoveScrollPageTop}><Link to={`${url}?page=${firstPageNumber}`}><Icon name="first" style={paginationItemIconStyle} /></Link></li>
        <li onClick={handleMoveScrollPageTop}><Link to={`${url}?page=${prevPageNumber}`}><Icon name="prev" style={paginationItemIconStyle} /></Link></li>
        {
          pageNumberItems.map((item, index) => <PaginationItem key={index} url={url} paginationNumber={item} isActive={item === currentPage} onHandleMoveScrollPageTop={handleMoveScrollPageTop} />)
        }
        <li onClick={handleMoveScrollPageTop}><Link to={`${url}?page=${nextPageNumber}`}><Icon name="next" style={paginationItemIconStyle} /></Link></li>
        <li onClick={handleMoveScrollPageTop}><Link to={`${url}?page=${lastPageNumber}`}><Icon name="last" style={paginationItemIconStyle} /></Link></li>
      </ul>
    </div>
    : null
  );
};

const paginationItemIconStyle = {
  "width": "1.5rem",
  "height": "1.5rem"
}

const PaginationStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;

    li {
      display: inline-block;
      padding: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      float: left;
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
      border-left: 1px solid #aaa;

      
      &:first-of-type {
        border-top-left-radius: 0.5em;
        border-bottom-left-radius: 0.5rem;  
      }

      &:last-of-type {
        border-right: 1px solid #aaa;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;  
      }

      a {
        text-decoration: none;
        color: #000;
      }

      &.active {
        background: #005CB2;
        a {
          color: #fff;
          font-weight: bold;
        }
      }

      &:hover {
        cursor: pointer;
        a {
          font-weight: bold;
        }
      }
    }
  }
`;