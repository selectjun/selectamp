import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CommunityHeader from '../CommunityHeader';
import CommunityInfo from '../CommunityInfo';
import CommunityContents from '../CommunityContents';
import CommunityComments from '../CommunityComments';
import { API } from '../../axios';

export type CommunityType = {
  id: number,
  communityKindsCodeName: string,
  title: string,
  contents: string,
  isOpen: boolean,
  isTemp: boolean,
  userId: string,
  createAt: Date,
  updateAt: Date,
  viewCount: number
};

export type CommunityViewerProps = {
  id: string
};

export default function CommunityViewer({ id }: CommunityViewerProps) {
  const history = useHistory();
  const [community, setCommunity] = useState<CommunityType>();

  useEffect(() => {
    // 커뮤니티 데이터 조회
    const getCommunityUrl: string = `/api/community/${id}/`;
    API.get(getCommunityUrl).then(response => {
      setCommunity(response.data.community);
    }).catch(error => {
      history.push("/community");
    });

    // 조회수 증가
    const getCommunityViewCountIncreaseUrl: string = `/api/community/${id}/viewCount/`;
    API.put(getCommunityViewCountIncreaseUrl);
  }, []);

  return (
    community
    ? <section css={communityViewStyle}>
      <CommunityHeader title={community.title} url={"/community"} />
      <hr />
      <CommunityInfo community={community} />
      <CommunityContents contents={community.contents} />
      <CommunityComments />
    </section>
    : null
  );
};

const communityViewStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;
  
  .contents-header {
    height: 6rem;
    &> div {
      float: left;

      &:first-of-type {
        cursor: pointer;
        svg {
          width: 2rem;
          height: 2rem;
        }
      }

      &:last-of-type {
        padding-left: 1.25rem;

        .prev-page-title {
          height: 2rem;
          line-height: 2rem;
          font-weight: bold;
        }

        .page-title {
          margin: 0.725rem 0 0;
        }
      }
    }

    &:after {
      content: " ";
      display: block;
      clear: both;
    }
  }

  hr {
  }

  .post-info {
    padding: 2rem 1rem 0;

    &> div {
      margin-left: 1rem;
    }

    .post-info-top {
      .post-info-top-left {
        float: left;
        display: inline-block;

        span:not(:last-child):after {
          content: " · ";
          font-weight: bold;
        }
  
        .community-kinds-code-name {
          color: #005CB2;
          font-weight: bold;
        }
      }

      .post-info-top-right {
        float: right;
        display: inline-block;
      }
    }

    .post-info-bottom {
      padding-top: 1rem;
      height: 2.5rem;
      clear: both;

      &> * {
        display: inline-block; 
        float: left;
      }

      &> span:not(:last-child) {
        margin-right: 1rem;
      }
      
      svg {
        width: 1.725rem;
        height: 1.725rem;
      }

      span {
        height: 1.5rem;
        line-height: 1.725rem;

        &:before {
          display: inline-block;
          width: 0.225rem;
          content: " ";
        }
      }
    }

    &:after {
      display: block;
      content: " ";
      width: 100%;
      border-bottom: 1px solid #ccc;
    }
  }

  .post-contents {
    margin: 2rem 1rem 0;
    padding: 0 1rem 1rem;
    border-bottom: 1px solid #ccc;
  }
`;