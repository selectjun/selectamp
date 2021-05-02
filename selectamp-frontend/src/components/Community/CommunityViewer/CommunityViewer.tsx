import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import CommunityHeader from '../CommunityHeader';
import CommunityInfo from '../CommunityInfo';
import CommunityContents from '../CommunityContents';
import CommunityComments from '../CommunityComments';
import { API } from '../../axios';

export type CommunityKindscode = {
  name: string,
  description: string
};

export type CommunityType = {
  id: number,
  communityKindsCode: CommunityKindscode,
  title: string,
  contents: string,
  isOpen: boolean,
  isTemp: boolean,
  userId: string,
  createAt: Date,
  updateAt: Date,
  viewCount: number
  commentCount: number
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
      <CommunityHeader title={community.title} subTitle="목록" url={"/community"} />
      <hr />
      <CommunityInfo community={community} />
      <CommunityContents contents={community.contents} />
      <CommunityComments id={id} />
    </section>
    : null
  );
};

const communityViewStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;
`;