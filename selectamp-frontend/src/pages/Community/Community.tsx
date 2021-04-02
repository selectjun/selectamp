import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API } from '../../components/axios';
import PageTemplete from '../../components/Base/PageTemplete';
import CommunityBoard from '../../components/Community/CommunityBoard';
import CommunityBoardColgroup from '../../components/Community/CommunityBoardColgroup';
import CommunityBoardHead from '../../components/Community/CommunityBoardHead';
import CommunityBoardBody from '../../components/Community/CommunityBoardBody';
import { ConfigType, PageModeType } from '../../store/modules/config';
import { useHistory } from 'react-router-dom';

export type CommunityPageProps = {
  page: number,
  config: ConfigType | null,
  onSetCommunityPageMode: (mode: PageModeType) => void
};

export default function Community({ page = 1, config, onSetCommunityPageMode }: CommunityPageProps) {
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
    <PageTemplete>
      <section css={communityStyle}>
        <h2 className="page-title">Community</h2>
        <div className="button-group">
          <a type="button" className="button blue"onClick={() => { history.push("/community/write")}}>Write</a>
        </div>
        <hr />

        <CommunityBoard
          totalCount={totalCount}
          currentPage={page}
          countPerPage={countPerPage}>
          <CommunityBoardColgroup />
          <CommunityBoardHead />
          <CommunityBoardBody
            communities={communities}
            totalCount={totalCount}
            currentPage={page}
            countPerPage={countPerPage} />
        </CommunityBoard>
      </section>
    </PageTemplete>
  );
};

const communityStyle = css`
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

`;