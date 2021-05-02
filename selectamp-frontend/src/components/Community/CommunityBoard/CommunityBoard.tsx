import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CommunityBoardColGroup from './CommunityBoardColGroup';
import CommunityBoardHead from './CommunityBoardHead';
import CommunityBoardBody from './CommunityBoardBody';
import CommunityBoardFooter from './CommunityBoardFooter';
import Loding from '../../Loding';
import { API } from '../../axios';

export type CommunityBoardProps = {
  page?: number
};

export default function CommunityBoard({ page = 1 }: CommunityBoardProps) {
  const history = useHistory();
  const [totalCount, setTotlCount] = useState<number>(0);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [communities, setCommunities] = useState<Array<any>>([]);

  useEffect(() => {
    const url = `/api/community/?page=${page}`;
    API.get(url).then(response => {
      setTotlCount(response.data.totalCount);
      setCountPerPage(response.data.countPerPage);
      setCommunities(response.data.communities);
    });
  }, [page]);
  
  return (
    communities.length
    ? <article css={communityBoardStyle}>
      <section>
        <h2 className="page-title">커뮤니티</h2>
        <div className="button-group">
          <a type="button" className="button blue"onClick={() => { history.push("/community/write")}}>새 글쓰기</a>
        </div>
        <hr />

        <table>
          <CommunityBoardColGroup />
          <CommunityBoardHead />
          <CommunityBoardBody
            communities={communities}
            totalCount={totalCount}
            currentPage={page}
            countPerPage={countPerPage} />
        </table>

        <CommunityBoardFooter
          totalCount={totalCount}
          currentPage={page}
          countPerPage={countPerPage} />
      </section>
    </article>
    : <article css={communityBoardStyle}><Loding style={{ marginTop: "12rem" }} /></article>
  );
};

const communityBoardStyle = css`
  section {
    width: 60rem;
    margin: 0 auto;
    padding-top: 2rem;
    position: relative;

    .page-title {
      padding-left: 1.25rem;
    }

    .button-group {
      position: absolute;
      top: 4rem;
      right: 0.5rem;

      .button {
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: 0.25rem;
    
        &.blue {
          color: #ffffff;
          background: #005CB2;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }

    table {
      width: 100%;
      margin-top: 1.5rem;
      
      &, thead, tbody, tr, th, td {
        border-collapse: collapse;
      }
    }
  }
`;